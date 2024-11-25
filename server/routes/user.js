import express from 'express';
import { loginController, signupController } from '../controllers/authController.js';
import upload from '../middleware/multer.js';
const userRoutes = express.Router();
userRoutes.post("/login",loginController)
userRoutes.post("/signup",upload.single("avatar"),signupController)


export default userRoutes

