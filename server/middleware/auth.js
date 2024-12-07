import jwt from 'jsonwebtoken'

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

export default isAuthenticated
