import express from 'express'
import {
    getMyProfile,
  searchHandler,

} from '../controllers/user.js'
import {
    loginController,
    signupController,
    logoutHandler

} from '../controllers/authController.js'
import upload from '../middleware/multer.js'
import isAuthenticated from '../middleware/auth.js'
import{registerValidator,validateHandler,loginValidator}from"../utills/validators.js"
const app = express.Router()


app.post('/login',loginValidator(), validateHandler,loginController)
app.post('/signup',upload.single('avatar'),registerValidator() ,validateHandler,signupController)
  


// after login this route is acess 

app.use(isAuthenticated)
app.get('/me', getMyProfile)
app.get('/logout', logoutHandler)
app.get("/search", searchHandler)

export default app
