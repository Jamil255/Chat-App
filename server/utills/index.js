import jwt from 'jsonwebtoken'
import { userSocketId } from '../server.js'
export const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: 'none',
  httpOnly: true,
  secure: true,
}

export const emitEvent = (req, event, users, data) => {
  const io = req.app.get('io')
  const userSocket = getSocket(users)
  io.to(userSocket).emit(event, data)
}

export const getSocket = (users = []) =>
  users?.map((user) => userSocketId.get(user.toString()))
// export const jwtToken = async (_id, userName) => {
//   const token = await jwt.sign({ _id, userName }, process.env.SECRET_KEY)
//   return token
// }
