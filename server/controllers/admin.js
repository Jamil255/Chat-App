import userModel from '../models/userSchema.js'
import chatModel from '../models/chatSchema.js'
import messageModel from '../models/messageSchema.js'
import jwt from 'jsonwebtoken'
import { cookieOptions } from '../utills/index.js'
const adminLogin = async (req, res) => {
  try {
    const { secretKey } = req.body
    const isMatch = secretKey === process.env.ADMIN_SECRET_KEY
    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid secret key',
        status: true,
      })
    }
    const token = jwt.sign(secretKey, process.env.SECRET_KEY)
    return res
      .status(201)
      .cookie('admin-token', token, {
        ...cookieOptions,
        maxAge: 1000 * 60 * 15,
      })
      .json({
        message: 'Welcome Boss',
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

const adminLogout = async (req, res) => {
  return res
    .status(201)
    .cookie('admin-token', '', {
      ...cookieOptions,
      maxAge: 0,
    })
    .json({
      message: 'admin successfully logout',
      status: true,
    })
}
const adminData = (req, res) => {
  return res.status(200).json({
    admin: true,
    status: true,
  })
}
const allUser = async (req, res) => {
  try {
    const users = await userModel.find({})
    const transformedData = await Promise.all(
      users?.map(async ({ _id, name, userName, avatar }) => {
        const [groups, friends] = await Promise.all([
          chatModel.countDocuments({ groupChat: true, members: _id }),
          chatModel.countDocuments({ groupChat: false, members: _id }),
        ])

        return {
          name,
          userName,
          avatar: avatar?.url,
          _id,
          groups,
          friends,
        }
      })
    )

    res.json({
      message: transformedData,
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

const allChats = async (req, res) => {
  try {
    const chats = await chatModel
      .find({})
      .populate('members', 'name avatar')
      .populate('creator', 'name avatar')
    const transformedData = await Promise.all(
      chats?.map(async ({ name, avatar, _id, members, creator, groupChat }) => {
        const totalMessages = await messageModel.countDocuments({ chat: _id })
        return {
          name,
          _id,
          groupChat,
          avatar: members.slice(0, 3).map((member) => member.avatar.url),
          member: members.map(({ _id, name, avatar }) => ({
            _id,
            name,
            avatar: avatar.url,
          })),
          creator: {
            name: creator?.name || 'None',
            avatar: creator?.avatar.url || '',
          },
          totalMembers: members.length,
          totalMessages,
        }
      })
    )
    return res.status(200).json({
      transformedData,
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

const allMessage = async (req, res) => {
  try {
    const message = await messageModel
      .find({})
      .populate('sender', 'name avatar')
      .populate('chat', 'groupChat')
    const transformedData = message.map(
      ({ _id, sender, attachments, content, createdAt, chat }) => ({
        _id,
        content,
        attachments,
        createdAt,
        chat: chat._id,
        sender: {
          name: sender.name,
          _id: sender.name,
          avatar: sender.avatar.url,
        },
        groupChat: chat.groupChat,
      })
    )
    return res.status(200).json({
      transformedData,
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

const getDashboardStats = async (req, res) => {
  try {
    const [groupCount, userCount, messageCount, totalChatsCount] =
      await Promise.all([
        chatModel.countDocuments({ groupChat: true }),
        userModel.countDocuments(),
        chatModel.countDocuments(),
        messageModel.countDocuments(),
      ])
    const today = new Date()
    const last7Day = new Date()
    last7Day.setDate(last7Day.getDate() - 7)
    const last7DayMessage = await messageModel
      .find({
        createdAt: {
          $gte: last7Day,
          $lte: today,
        },
      })
      .select('createdAt')
    const messages = new Array(7).fill(0)
    const dayInMilisecond = 1000 * 60 * 60 * 24
    last7DayMessage.forEach((message) => {
      const indexApporach =
        (today.getTime() - message.createdAt.getTime()) / dayInMilisecond
      const index = Math.floor(indexApporach)
      messages[6 - index]++
    })
    return res.status(200).json({
      groupCount,
      userCount,
      totalChatsCount,
      messageCount,
      messageChart: messages,
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
  allUser,
  allChats,
  allMessage,
  getDashboardStats,
  adminLogin,
  adminLogout,
  adminData,
}
