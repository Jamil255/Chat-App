import express from 'express'
import {
  getMyProfile,
  searchHandler,
  snedFriendRequest,
  acceptFriendRequest,
  getMyNotification,
  getMyFriends,
} from '../controllers/user.js'
import {
  loginController,
  signupController,
  logoutHandler,
} from '../controllers/authController.js'
import { singleAvatar } from '../middleware/multer.js'
import {isAuthenticated} from '../middleware/auth.js'
import {
  registerValidator,
  validateHandler,
  loginValidator,
  sendRequestValidator,
  acceptRequestValidator,
} from '../utills/validators.js'
const app = express.Router()

app.post('/login', loginValidator(), validateHandler, loginController)
app.post(
  '/signup',
  singleAvatar,
  registerValidator(),
  validateHandler,
  signupController
)

// after login this route is acess

app.use(isAuthenticated)
app.get('/me', getMyProfile)
app.get('/logout', logoutHandler)
app.get('/search', searchHandler)
app.put(
  '/sendrequest',
  sendRequestValidator(),
  validateHandler,
  snedFriendRequest
)
app.put(
  '/acceptrequest',
  acceptRequestValidator(),
  validateHandler,
  acceptFriendRequest
)
app.get('/notification', getMyNotification)
app.get('/friend', getMyFriends)

export default app
