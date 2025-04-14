import jwt from 'jsonwebtoken'
const isAdmin = (req, res, next) => {
  const tokens = req.cookies["admin-token"]
  if (!tokens)
    return res.status(401).json({
      message: 'unauthorized access. please login first',
      status: false,
    })
  const secretKey = jwt.verify(tokens, process.env.SECRET_KEY)
  const isMatch = secretKey === process.env.ADMIN_SECRET_KEY
  if (!isMatch)
    return res.status(401).json({
      message: 'please login to access this route',
      status: false,
    })

  next()
}
export { isAdmin }
