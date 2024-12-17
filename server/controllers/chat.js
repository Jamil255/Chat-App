import {
  ALERT,
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from '../constants/event.js'
import chatModel from '../models/chatSchema.js'
import messageModel from '../models/messageSchema.js'
import userModel from '../models/userSchema.js'
import {
  deleteFileFromCloudinary,
  uploadFilesToCloudinary,
} from '../utills/feature.js'
import { emitEvent } from '../utills/index.js'
const newGroupChat = async (req, res) => {
  try {
    const { name, members } = req.body

    const allMembers = [...members, req.user]
    const data = await chatModel.create({
      name,
      members: allMembers,
      creator: req.user,
      groupChat: true,
    })
    emitEvent(req, ALERT, allMembers, `welcome to ${name}group`)
    emitEvent(req, REFETCH_CHATS, members)
    res.status(201).json({
      message: 'create group successfully',
      data,
      status: true,
    })
  } catch (error) {
    res.status(500).json({ message: error.message, data: [], status: false })
  }
}

const getMyChats = async (req, res) => {
  try {
    // Fetch chats where the user is a member and populate member details
    const chats = await chatModel
      .find({ members: req.user })
      .populate('members', 'name avatar')

    // Transform the chats to the desired structure
    const transformChats = chats.map((chat) => {
      const { _id, name, groupChat, members } = chat

      // Get the other member (for one-on-one chats)
      const otherMember = members.find(
        (member) => member._id.toString() !== req.user.toString()
      )

      return {
        _id,
        groupChat,
        avatar: groupChat
          ? members.slice(0, 3).map((member) => member.avatar?.url || null) // Limit to 3 avatars
          : [otherMember?.avatar?.url || null], // Ensure null safety
        name: groupChat ? name : otherMember?.name || 'Unknown',
        members: members
          .filter((member) => member._id.toString() !== req.user.toString()) // Exclude current user
          .map((member) => member._id),
      }
    })

    // Send the transformed response
    res.status(200).json({
      chats: transformChats,
      status: true,
    })
  } catch (error) {
    // Enhanced error handling
    console.error(`Error fetching chats: ${error.message}`)
    res.status(500).json({
      message: 'Failed to fetch chats. Please try again later.',
      error: error.message,
      stack: error.stack,
      status: false,
    })
  }
}

const getMyGroup = async (req, res) => {
  try {
    const chats = await chatModel
      .find({
        groupChat: true,
        creator: req.user,
      })
      .populate('members', 'name avatar')

    const groups = chats?.map(({ _id, name, members, groupChat }) => ({
      _id,
      name,
      groupChat,
      avatar: members?.slice(0, 3).map(({ avatar }) => avatar.url),
    }))
    res.status(200).json({
      groups,
      status: true,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    })
  }
}
const addMember = async (req, res) => {
  try {
    const { chatId, members } = req.body
    const chat = await chatModel.findById(chatId)
    if (!chat) {
      return res.status(404).json({
        message: 'chat is not found',
        status: false,
      })
    }
    if (!chat.groupChat) {
      return res.status(404).json({
        message: 'this is not group chat ',
        status: false,
      })
    }
    if (chat?.creator?.toString() !== req.user.toString()) {
      return res.status(403).json({
        message: 'you are  not allow to add member',
        status: false,
      })
    }
    const allNewMembersPromise = members?.map((i) =>
      userModel.findById(i, 'name')
    )
    const allNewMembers = await Promise.all(allNewMembersPromise)
    const uniqueMembers = allNewMembers
      .filter((i) => !chat.members.includes(i._id.toString()))
      .map((i) => i._id)
    chat.members.push(...uniqueMembers)
    if (chat?.members?.length > 100) {
      return res.status(400).json({
        message: 'Group limit is reach 100',
        status: false,
      })
    }
    await chat.save()
    const allUsersName = allNewMembers.map((i) => i.name).join(', ')
    emitEvent(
      req,
      ALERT,
      chat?.members,
      `${allUsersName} has been added in the group`
    )

    emitEvent(req, REFETCH_CHATS, chat?.members)

    res.status(200).json({
      status: true,
      message: 'member add is successfully',
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    })
  }
}

const removeMember = async (req, res) => {
  try {
    const { userId, chatId } = req.body
    const [chat, userThatWillBeRemove] = await Promise.all([
      chatModel.findById(chatId),
      userModel.findById(userId, 'name'),
    ])
    if (!chat) {
      return res.status(400).json({
        message: 'chat is not found ',
        status: false,
      })
    }
    if (!chat?.groupChat) {
      return res.status(404).json({
        message: 'this is not group chat ',
        status: false,
      })
    }
    if (chat?.creator?.toString() !== req.user.toString()) {
      return res.status(403).json({
        message: 'you are not allow to leave member',
        status: false,
      })
    }
    if (chat?.members?.length <= 3) {
      return res.status(400).json({
        message: 'Group  are must at least 3 members ',
        status: false,
      })
    }
    const allChatMember = chat?.members?.map((i) => i.toString())

    chat.members = chat.members.filter(
      (member) => member.toString() !== userId.toString()
    )
    await chat.save()
    emitEvent(req, ALERT, chat.members, {
      message: `${userThatWillBeRemove?.name} has been removed from the group`,
      chatId,
    })

    emitEvent(req, REFETCH_CHATS, allChatMember)
    res.status(200).json({
      message: 'group leave sucessfully',
      status: true,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    })
  }
}

const leaveGroup = async (req, res) => {
  try {
    const chatId = req.params.chatId
    const chat = await chatModel.findById(chatId)
    if (!chat) {
      return res.status(400).json({
        message: 'chat is not found',
        status: false,
      })
    }
    if (!chat?.groupChat) {
      return res.status(400).json({
        message: 'this  is not group chat',
        status: false,
      })
    }
    const remainingMembers = chat?.members?.filter(
      (member) => member.toString() !== req.user.toString()
    )
    if (remainingMembers?.length < 3) {
      return res.status(400).json({
        message: 'group are must  at least 3 member',
        status: false,
      })
    }
    if (chat?.creator.toString() == req?.user.toString()) {
      const randomElem = Math.floor(Math.random() * remainingMembers.length)
      const newCreator = remainingMembers[randomElem]
      chat.creator = newCreator
    }
    chat.members = remainingMembers
    const [user] = await Promise.all([
      userModel.findById(req.user, 'name'),
      chat.save(),
    ])
    emitEvent(req, ALERT, chat?.members, {
      chatId,
      message: `User ${user?.name} has left the group`,
    })
    res.status(200).json({
      message: 'Leave the group successfully',
      status: true,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    })
  }
}
const sendAttachment = async (req, res) => {
  try {
    const { chatId } = req.body
    const files = req.files || []

    // Validate file count
    if (files.length < 1) {
      return res.status(400).json({
        message: 'Please upload attachments',
        status: false,
      })
    }
    if (files.length > 5) {
      return res.status(400).json({
        message: "You can't upload more than 5 files",
        status: false,
      })
    }

    // Validate chat and user
    const [chat, me] = await Promise.all([
      chatModel.findById(chatId),
      userModel.findById(req.user, 'name'),
    ])
    if (!chat) {
      return res.status(400).json({
        message: 'Chat not found',
        status: false,
      })
    }
    const attachments = await uploadFilesToCloudinary(files)
    const messageForDB = {
      attachments,
      content: '',
      chat: chatId,
      sender: me._id,
    }

    const messageForRealTime = {
      ...messageForDB,
      sender: {
        _id: me?._id,
        name: me?.name,
      },
    }

    const message = await messageModel.create(messageForDB)

    // Emit real-time events
    emitEvent(req, NEW_MESSAGE, chat?.members, {
      message: messageForRealTime,
      chatId,
    })
    emitEvent(req, NEW_MESSAGE_ALERT, chat?.members, { chatId })

    res.status(200).json({
      message: 'Files uploaded successfully',
      message,
      status: true,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    })
  }
}

const getChatDetails = async (req, res) => {
  try {
    if (req.query.populate === 'true') {
      const chat = await chatModel
        .findById(req.params.chatId)
        .populate('members', 'name avatar')
        .lean()
      if (!chat)
        return res.status(400).json({
          message: 'message is not found',
          status: false,
        })
      chat.members = chat.members.map(({ _id, avatar, name }) => ({
        _id,
        avatar: avatar?.url,
        name,
      }))
      return res.status(200).json({
        status: true,
        chat,
      })
    } else {
      const chat = await chatModel.findById(req.params.chatId)
      if (!chat) {
        return res.status(400).json({
          message: 'chat is not found',
          status: false,
        })
      }
      res.status(200).json({
        chat,
        status: true,
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      stack: error.stack,
      status: false,
    })
  }
}

const renameGroup = async (req, res) => {
  try {
    const chatId = req.params.chatId
    const { name } = req.body
    const chat = await chatModel.findById(chatId)
    if (!chat) {
      return res.status(400).json({
        message: 'this chat is not found',
        status: false,
      })
    }
    if (!chat?.groupChat) {
      return res.status(400).json({
        message: 'this is not chat group found',
        status: false,
      })
    }
    if (chat?.creator.toString() !== req.user.toString()) {
      return res.status(400).json({
        message: 'you are not allow to rename the group',
        status: false,
      })
    }
    chat.name = name
    await chat.save()
    emitEvent(req, REFETCH_CHATS, chat?.members)
    res.status(200).json({
      message: 'group rename successfully',
      status: true,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      stack: error.stack,
      status: false,
    })
  }
}
const deleteChat = async (req, res) => {
  try {
    const chatId = req.params.chatId
    const chat = await chatModel.findById(chatId)
    if (!chat) {
      return res.status(400).json({
        message: 'this chat is not found',
        status: false,
      })
    }
    const members = chat.members
    if (chat?.groupChat) {
      return res.status(403).json({
        message: 'you are not allow to delete the group',
        status: false,
      })
    }
    if (!chat?.groupChat && !members?.includes(req.user.toString())) {
      return res.status(403).json({
        message: 'you are not allowed to delete the chat',
        status: false,
      })
    }

    const sendWithAttachment = await messageModel.find({
      chat: chatId,
      attachments: { $exists: true, $ne: [] },
    })
    const public_ids = []
    sendWithAttachment?.forEach(({ attachments }) =>
      attachments.forEach(({ publicId }) => public_ids.push(publicId))
    )

    await Promise.all([
      deleteFileFromCloudinary(public_ids),
      chat.deleteOne(),
      messageModel.deleteMany({ chat: chatId }),
    ])
    emitEvent(req, ALERT, members)
    res.status(200).json({
      message: 'Chat delete is successfully',
      status: true,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      stack: error.stack,
      status: false,
    })
  }
}

const getMessage = async (req, res) => {
  try {
    const chatId = req.params.chatId
    const { page = 1 } = req.query

    const resultPerPage = 20
    const skip = (page - 1) * resultPerPage

    const chat = await chatModel.findById(chatId)
    if (!chat) {
      return res.status(400).json({
        message: 'chat is not found',
        status: false,
      })
    }

    if (
      !chat.members.some((member) => member.toString() === req.user.toString())
    ) {
      return res.status(403).json({
        message: 'You are not allowed to access this chat',
        status: false,
      })
    }

    const [message, totalMessageCount] = await Promise.all([
      messageModel
        .find({ chat: chatId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(resultPerPage)
        .populate('sender', 'name')
        .lean(),
      messageModel.countDocuments({ chat: chatId }),
    ])

    const totalPage = Math.ceil(totalMessageCount / resultPerPage) || 0
    return res.status(200).json({
      status: true,
      messages: message.reverse(),
      totalPage,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      stack: error.stack,
      status: false,
    })
  }
}

export {
  addMember,
  deleteChat,
  getChatDetails,
  getMessage,
  getMyChats,
  getMyGroup,
  leaveGroup,
  newGroupChat,
  removeMember,
  renameGroup,
  sendAttachment,
}
