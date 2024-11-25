import { cloudinaryUploader } from '../config/CloudinaryConfig.js'
import userModel from '../models/userSchema.js'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import { cookieOptions } from '../utills/index.js'
import bcrypt from 'bcrypt'

const signupController = async (req, res) => {
  try {
    const { name, userName, password, bio } = req.body
    const filePath = req.file?.path

    // Validate required fields
    if (!name || !userName || !password || !bio || !filePath) {
      return res.status(400).json({
        message: 'All fields are required',
        status: 'error',
      })
    }

    // Upload the file to Cloudinary
    const uploadResult = await cloudinaryUploader.upload(filePath)

    // Delete the local file
    fs.unlink(filePath, function (error) {
      if (error) console.error('Error deleting file:', error.message)
    })

    // Prepare user avatar data
    const avatar = {
      publicId: uploadResult.public_id,
      url: uploadResult.url,
    }

    // Create the user in the database
    const data = await userModel.create({
      name,
      userName,
      password,
      avatar,
      bio,
    })
    const token = await jwt.sign(
      { _id: data?._id, userName: data?.userName },
      process.env.SECRET_KEY
    )
    res.cookie('token', token, cookieOptions).status(201).json({
      message: 'User created successfully',
      data: data,
      status: true,
    })
  } catch (error) {
    console.error('Signup Error:', error.message)
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
    console.log(hashPass)

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
    res.cookie('token', token, cookieOptions).status(201).json({
      message: 'user successfully login',
      data: user,
      status: true,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
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

export { loginController, signupController, getMyProfileHandlder }
