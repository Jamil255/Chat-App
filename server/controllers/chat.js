import { ALERT, REFETCH_CHATS } from '../constants/event.js'
import chatModel from '../models/chatSchema.js'
import { emitEvent } from '../utills/index.js'
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

export { newGroupChat }
