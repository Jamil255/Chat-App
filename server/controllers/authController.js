import { cloudinaryUploader } from '../config/CloudinaryConfig.js'
import userModel from '../models/userSchema.js'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import { cookieOptions } from '../utills/index.js'
import bcrypt from 'bcrypt'
import { uploadFilesToCloudinary } from '../utills/feature.js'

const signupController = async (req, res) => {
  try {
    const { name, userName, password, bio } = req.body
    const file = req.file
    // Upload the file to Cloudinary
    const result = await uploadFilesToCloudinary([file])
console.log(result)
    // Create the user in the database
    const data = await userModel.create({
      name,
      userName,
      password,
      avatar:result[0],
      bio,
    })
    const token = jwt.sign(
      { _id: data?._id, userName: data?.userName },
      process.env.SECRET_KEY
    )
    const { password: _, ...userWithoutPassword } = data.toObject()

    res.cookie('token', token, cookieOptions).status(201).json({
      message: 'User created successfully',
      data: userWithoutPassword,
      status: true,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: 'error',
    })
  }
}

const loginController = async (req, res) => {
  try {
    const { userName, password } = req.body
    if (!userName || !password) {
      return res.status(401).json({
        message: 'all fields required',
        status: 'false',
      })
    }
    const user = await userModel.findOne({ userName })
    if (!user) {
      return res.status(401).json({
        message: 'username and password is incorrect',
        status: 'false',
      })
    }
    const hashPass = await bcrypt.compare(password, user?.password)

    if (!hashPass) {
      return res.status(401).json({
        message: 'username and password is incorrect',
        status: 'false',
      })
    }
    const token = await jwt.sign(
      { _id: user?._id, userName: user?.userName },
      process.env.SECRET_KEY
    )
    const { password: _, ...userWithoutPassword } = user.toObject()
    res.cookie('token', token, cookieOptions).status(201).json({
      message: 'user successfully login',
      data: userWithoutPassword,
      status: true,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
      status: false,
      data: [],
    })
  }
}
const getMyProfileHandlder = async (req, res) => {
  try {
    const data = await userModel.findById(req.user)
    return res.json({
      message: 'user data is successfully load',
      data,
      status: true,
    })
  } catch (error) {
    res.json({
      message: error.message,
      status: false,
    })
  }
}

const logoutHandler = (req, res) => {
  res.cookie('token', '', { ...cookieOptions, maxAge: 0 }).json({
    message: 'logout successfully',
  })
}

export { loginController, signupController, logoutHandler }
