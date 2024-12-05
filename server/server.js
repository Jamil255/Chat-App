import express from 'express'
import cors from 'cors'
import connectDb from './config/db.js'
import userRoutes from './routes/user.js'
import { cloudinaryConfig } from './config/CloudinaryConfig.js'
import cookieParser from 'cookie-parser'
import chatRoutes from './routes/chat.js'
import adminRoutes from './routes/admin.js'
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
connectDb()
app.use(
    cors({
      origin: 'http://localhost:5173', // Full URL without trailing slash
      credentials: true, // Allows cookies or credentials to be sent
    })
  );
  
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/chat', chatRoutes)
app.use('/api/v1/admin', adminRoutes)

cloudinaryConfig()
app.listen(PORT, () => {
  console.log(`port is running on ${PORT}`)
})
