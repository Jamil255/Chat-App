import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import connectDb from './config/db.js'
import userRoutes from './routes/user.js'
import { cloudinaryConfig } from './config/CloudinaryConfig.js'
import cookieParser from 'cookie-parser'
import chatRoutes from './routes/chat.js'
import adminRoutes from './routes/admin.js'
import { Server } from 'socket.io'
import { corsOption } from './constants/index.js'
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from './constants/event.js'
import { v4 as uuid } from 'uuid'
import { getSocket } from './utills/index.js'
import messageModel from './models/messageSchema.js'
import { socketAuthenticator } from './middleware/auth.js'
const userSocketId = new Map()
const app = express()
const PORT = process.env.PORT
const server = createServer(app)
const io = new Server(server, {
  cors: corsOption,
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
connectDb()
app.use(cors(corsOption))

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/chat', chatRoutes)
app.use('/api/v1/admin', adminRoutes)

cloudinaryConfig()
io.use((socket, next) => {
    cookieParser()(socket.request, socket.request.res, async (err) => {
      if (err) {
        return next(new Error('Cookie parsing failed'));
      }
      await socketAuthenticator(err, socket, next);
    });
  });

io.on('connection', (socket) => {
  console.log('user connected', socket.id)
  const user = socket.user
  userSocketId.set(user._id.toString(), socket.id)
  socket.on(NEW_MESSAGE, async ({ chatId, message, members }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      member: [],
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    }
    const messageForDB = {
      content: message,
      chat: chatId,
      sender: user._id,
    }
    const memberSocketId = getSocket(members)
    io.to(memberSocketId).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    })
    io.to(memberSocketId).emit(NEW_MESSAGE_ALERT, {
      chatId,
    })
    try {
      await messageModel.create(messageForDB)
    } catch (error) {
      throw new Error(error)
    }
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
    userSocketId.delete(user._id.toString())
  })
})


server.listen(PORT, () => {
  console.log(`port is running on ${PORT}`)
})

export { userSocketId }
