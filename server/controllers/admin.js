import userModel from "../models/userSchema.js"
 import chatModel from "../models/chatSchema.js"
 import messageModel from "../models/messageSchema.js"
const allUser=async (req,res) => {
    try {
        const users=await userModel.find({})
        const transformedData=await Promise.all(
            users?.map(async({_id,name,userName,avatar})=>{
                const[groups,friends]=await Promise.all([
                    chatModel.countDocuments({groupChat:true,members:_id}),
                    chatModel.countDocuments({groupChat:false,members:_id})
                    
                ])

                return {
                    name,
                    userName,
                    avatar:avatar?.url,
                    _id,
                    groups,
                    friends
                }
            })
        )
        
       res.json({
        message:transformedData,
        status:true
       }) 
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            stack: error.stack,
            status: false,
          })
    }
}

const allChats=async(req,res)=>{
    try {
        const chats = await chatModel.find({}).populate("members", "name avatar").populate("creator", "name avatar")
       const transformedData=await Promise.all(
        chats?.map(async({name,avatar,_id,members,creator,groupChat})=>{
            const totalMessages=await messageModel.countDocuments({chat:_id})
            return{
             name,
             _id,
             groupChat,
             avatar: members.slice(0, 3).map((member) => member.avatar.url),
             member:members.map(({_id,name,avatar})=>({
                _id,
                name,
                avatar:avatar.url
             })),
             creator:{
                name:creator?.name ||"None",
                avatar:creator?.avatar.url||""

             }
             ,
             totalMembers:members.length,
             totalMessages
                
            }
        })
       )
       return res.status(200).json({
        transformedData,
        status:true
       })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            stack: error.stack,
            status: false,
          })
    }
}
export{allUser,allChats}