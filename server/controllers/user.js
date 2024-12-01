import chatModel from"../models/chatSchema.js"
import userModel from"../models/userSchema.js"
import requestModel from"../models/request.js"
import{emitEvent}from"../utills/index.js"
import{NEW_REQUEST}from"../constants/event.js"
const searchHandler = async(req, res) => {
  try {
    const{name=""}=req.query
    const myChats=await chatModel.find({groupChat:false,members:req.user})
    const allUserFromMyChat= myChats.flatMap((chat)=>chat.members)
const allUserExpectMeAndFriend= await userModel.find({
    _id:{$nin:allUserFromMyChat},
    name:{$regex:name,$options:"i"}
})

const allUsers= allUserExpectMeAndFriend?.map(({_id,name,avatar})=>({
    name,
    avatar:avatar.url,
    _id
}))
   return res.json({
    status:true,
        message:allUsers
    })
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

  const snedFriendRequest=async(req,res)=>{
    try {
        const{userId}=req.body
        const request=await requestModel.findOne({
            $or:[{sender:req.user,receiver:userId},{sender:userId,receiver:req.user},

            ]
        })
       if(request){
        return res.status(400).json({
            message:"this request is already send",
            status:false
        })
       }
       await requestModel.create({
        sender:req.user,
        receiver:userId
       })

       emitEvent(req, NEW_REQUEST, [userId]); 
    
    return res.status(200).json({
        message:"send friend is send",
        status:true
    })
    } catch (error) {
        
    }
  }
export {searchHandler,getMyProfile,snedFriendRequest}  