import jwt from 'jsonwebtoken'
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({
        message: 'unAuthorized acess please login first ',
        status: false,
      })
    }
    const decodeData = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decodeData._id

    next()
  } catch (error) {
    res.json({
      message: error.message,
      status: false,
    })
  }
}

export default isAuthenticated
