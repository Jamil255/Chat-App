import express from 'express'
import {
  getMyProfileHandlder,
  loginController,
  logoutHandler,
  searchHandler,
  signupController,
} from '../controllers/authController.js'
import upload from '../middleware/multer.js'
import isAuthenticated from '../middleware/auth.js'
const userRoutes = express.Router()
userRoutes.post('/login', loginController)
userRoutes.post('/signup', upload.single('avatar'), signupController)


// after login this route is acess 

userRoutes.use(isAuthenticated)
userRoutes.get('/me', getMyProfileHandlder)
userRoutes.get('/logout', logoutHandler)
userRoutes.get("/search", searchHandler)

export default userRoutes
