import jwt from 'jsonwebtoken'
import userModel from '../models/userSchema.js'

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies['token']
    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized access. Please log in first.',
        status: false,
      })
    }

    const decodedData = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decodedData._id

    next() // Proceed to the next middleware
  } catch (error) {
    res.status(401).json({
      message: error.message,
      status: false,
    })
  }
}

const socketAuthenticator = async (error, socket, next) => {
    const socketReq=socket.request.res
  try {
    if (error) {
      return socketReq.status(500).json({
        error,
        status: false,
      })
    }
    const token = socket.request.cookies['token']
    if (!token) {
      return  socketReq.status(401).json({
        message: 'please login to access this route',
        status: false,
      })
    }

    const decodedData = jwt.verify(token, process.env.SECRET_KEY)
    const user = await userModel.findById(decodedData._id)
    if (!user) {
      return socketReq.status(401).json({
        message: 'please login to access this route',
        status: false,
      })
    }
    socket.user = user
    return next()
  } catch (error) {
  console.log(error)
    
}

}

export { isAuthenticated, socketAuthenticator }
