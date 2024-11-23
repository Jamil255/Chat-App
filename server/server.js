import express from 'express'
import connectDb from './config/db.js'
const app = express()
const PORT = 3000 || process.env.PORT
connectDb()
app.listen(PORT, () => {
  console.log(`port is running on ${PORT}`)
})
