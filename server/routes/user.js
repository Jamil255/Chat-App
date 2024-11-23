import express from 'express';
import { loginController, signupController } from '../controllers/authController.js';
const userRoutes = express.Router();
userRoutes.post("/login",loginController)
userRoutes.post("/signup",signupController)


export default userRoutes

