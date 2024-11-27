import jwt from 'jsonwebtoken'
export const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: 'none',
  httpOnly: true,
  secure: true,
}

export const emitEvent = (req, event, users, data) => {
  console.log(event)
}
// export const jwtToken = async (_id, userName) => {
//   const token = await jwt.sign({ _id, userName }, process.env.SECRET_KEY)
//   return token
// }
