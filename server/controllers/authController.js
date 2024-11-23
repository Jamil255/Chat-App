import userModel from '../models/userSchema.js'

const signupController = async (req, res) => {
  try {
    const { name, userName, password, } = req.body
   const avatar = {
      publicId: 'jsjjsjjd',
      url: 'jsijwijjd',
    }
    const data = await userModel.create({ name, userName, password, avatar })

    res.status(201).json({
      message: 'User created successfully',
      data: data,
      status: true,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}
const loginController = async (req, res) => {
  try {
    res.send('Welcome')
  } catch (error) {}
}

export { loginController, signupController }
