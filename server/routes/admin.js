import express from"express"
import{allUser,allChats}from "../controllers/admin.js"
const app=express.Router()

app.get("/users",allUser)
app.get("/chats",allChats)




export default app