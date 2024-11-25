import express from 'express';
import { getMyProfileHandlder, loginController, signupController } from '../controllers/authController.js';
import upload from '../middleware/multer.js';
import isAuthenticated from '../middleware/auth.js';
const userRoutes = express.Router();
userRoutes.post("/login",loginController)
userRoutes.post("/signup",upload.single("avatar"),signupController)
userRoutes.get("/me",isAuthenticated,getMyProfileHandlder)


export default userRoutes

