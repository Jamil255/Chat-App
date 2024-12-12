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
    try {
      if (error) {
        return next(new Error('Internal Server Error'));
      }
  
      const token = socket.request.cookies?.token; // Use optional chaining to avoid errors
      if (!token) {
        return next(new Error('Please login to access this route'));
      }
  
      const decodedData = jwt.verify(token, process.env.SECRET_KEY);
      const user = await userModel.findById(decodedData._id);
      if (!user) {
        return next(new Error('User not found, please login to access this route'));
      }
  
      socket.user = user; // Attach user to socket for later use
      next(); // Continue to the next middleware
    } catch (err) {
      console.error(err);
      next(new Error('Authentication failed'));
    }
  };

export { isAuthenticated, socketAuthenticator }
