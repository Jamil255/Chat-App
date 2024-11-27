import express from 'express'
import connectDb from './config/db.js'
import userRoutes from './routes/user.js'
import { cloudinaryConfig } from './config/CloudinaryConfig.js'
import cookieParser from 'cookie-parser'
import chatRoutes from './routes/chat.js'
const app = express()
const PORT = process.env.PORT
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
connectDb()

app.use('/api', userRoutes)
app.use('/chat', chatRoutes)

cloudinaryConfig()
app.listen(PORT, () => {
  console.log(`port is running on ${PORT}`)
})
