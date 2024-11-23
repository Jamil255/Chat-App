import express from 'express'
import connectDb from './config/db.js'
import userRoutes from './routes/user.js'
const app = express()
const PORT = process.env.PORT
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
connectDb()
app.use('/api', userRoutes)

app.listen(PORT, () => {
  console.log(`port is running on ${PORT}`)
})
