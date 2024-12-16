import chatModel from '../models/chatSchema.js'
import userModel from '../models/userSchema.js'
import requestModel from '../models/request.js'
import { emitEvent } from '../utills/index.js'
import { getOtherMember } from '../utills/feature.js'
import { NEW_REQUEST, REFETCH_CHATS } from '../constants/event.js'
const searchHandler = async (req, res) => {
  try {
    const { name = '' } = req.query
    const myChats = await chatModel.find({
      groupChat: false,
      members: req.user,
    })
    const allUserFromMyChat = myChats.flatMap((chat) => chat.members)
    const allUserExpectMeAndFriend = await userModel.find({
      _id: { $nin: allUserFromMyChat },
      name: { $regex: name, $options: 'i' },
    })

    const allUsers = allUserExpectMeAndFriend?.map(({ _id, name, avatar }) => ({
      name,
      avatar: avatar.url,
      _id,
    }))
    return res.json({
      status: true,
      allUsers,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
      status: false,
    })
  }
}
const getMyProfile = async (req, res) => {
  try {
    const data = await userModel.findById(req.user)
    if (!data) {
      return res.status(404).json({
        message: 'profile is not found',
      })
    }
    return res.json({
      message: 'user data is successfully load',
      data,
      status: true,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    })
  }
}

const snedFriendRequest = async (req, res) => {
  try {
    const { userId } = req.body
    const request = await requestModel.findOne({
      $or: [
        { sender: req.user, receiver: userId },
        { sender: userId, receiver: req.user },
      ],
    })
    if (request) {
      return res.status(400).json({
        message: 'this request is already send',
        status: false,
      })
    }
    await requestModel.create({
      sender: req.user,
      receiver: userId,
    })

    emitEvent(req, NEW_REQUEST, [userId])

    return res.status(200).json({
      message: 'send friend is send',
      status: true,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
      status: false,
    })
  }
}

const acceptFriendRequest = async (req, res) => {
  try {
    const { requestId, accept } = req.body
    const request = await requestModel
      .findById(requestId)
      .populate('sender', 'name')
      .populate('receiver', 'name')
    if (!request) {
      return res.status(400).json({
        message: 'Request is found',
        status: false,
      })
    }
    if (request?.receiver._id.toString() !== req.user.toString()) {
      return res.status(403).json({
        message: 'you are not authorized to access this request',
        status: false,
      })
    }
    if (!accept) {
      await request.deleteOne()

      return res.status(204).json({
        message: 'request is rejected',
        status: true,
      })
    }

    const members = [request.sender._id, request.receiver._id]
    const result = await Promise.all([
      chatModel.create({
        members,
        name: `${request.sender.name}-${request.receiver.name}`,
      }),
      request.deleteOne(),
    ])
    emitEvent(req, REFETCH_CHATS, members)
    return res.status(200).json({
      message: 'friend request is accept',
      status: true,
      sender: request.sender._id,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
      status: false,
    })
  }
}

const getMyNotification = async (req, res) => {
  try {
    const request = await requestModel
      .find({ receiver: req.user })
      .populate('sender', 'name avatar')

    const allRequests = request.map(({ _id, sender }) => ({
      _id,
      sender: {
        _id: sender?._id,
        name: sender?.name,
        avatar: sender?.avatar.url,
      },
    }))
    return res.status(200).json({
      status: true,
      allRequests,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
      status: false,
    })
  }
}

const getMyFriends = async (req, res) => {
  try {
    const chatId = req.params.chatId
    const chats = await chatModel
      .find({
        members: req.user,
        groupChat: false,
      })
      .populate('members', 'name avatar')

    const friends = chats.map(({ members }) => {
      const otherUser = getOtherMember(members, req.user)
      return {
        _id: otherUser?._id,
        name: otherUser?.name,
        avatar: otherUser?.avatar.url,
      }
    })

    if (chatId) {
      const chat = await chatModel.findById(chatId)

      const availableFriends = friends.filter(
        (friend) => !chat.members.includes(friend._id)
      )

      return res.status(200).json({
        success: true,
        friends: availableFriends,
      })
    } else {
      return res.status(200).json({
        success: true,
        friends,
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
      status: false,
    })
  }
}
export {
  searchHandler,
  getMyProfile,
  snedFriendRequest,
  acceptFriendRequest,
  getMyNotification,
  getMyFriends,
}
