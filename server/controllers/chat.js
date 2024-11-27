import { ALERT, REFETCH_CHATS } from '../constants/event.js'
import chatModel from '../models/chatSchema.js'
import { emitEvent } from '../utills/index.js'
import { getOtherMember } from '../utills/feature.js'
const newGroupChat = async (req, res) => {
  try {
    const { name, members } = req.body
    if (!name || !members) {
      return res.status(400).json({
        message: 'all fleid is required',
        status: false,
      })
    }
    if (members.length < 2) {
      return res.status(400).json({
        message: 'at least 2 group member',
        status: false,
      })
    }
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
      avatar: members?.slice(0, 3).map(({avatar}) => avatar.url),
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
export { newGroupChat, getMyChats, getMyGroup }
