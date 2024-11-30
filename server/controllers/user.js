import chatModel from"../models/chatSchema.js"
import userModel from"../models/userSchema.js"
const searchHandler = async(req, res) => {
   try {
    const { name=""} = req.query
    const myChats= await chatModel.find({groupChat:false,members:req.user})
const allUsersFromMyChat=myChats?flatMap((chat)=>chat.members)
   } catch (error) {
    res.status(500).json({
        message: error.message,
        stack:error.stack,
        status: false,
      })
   }
  }
  const getMyProfile = async (req, res) => {
    try {
      const data = await userModel.findById(req.user)
      if(!data){
        return res.status(404).json({
            message:"profile is not found"
        })
      }
      return res.json({
        message: 'user data is successfully load',
        data,
        status: true,
      })
    } catch (error) {
      res.status(500).json({
        message: error.message,
        status: false,
      })
    }
  }
export {searchHandler,getMyProfile}  