import express from"express"
import{allUser,allChats,allMessage,getDashboardStats, adminLogin, adminLogout,adminData}from "../controllers/admin.js"
import { adminLoginValidator, validateHandler } from "../utills/validators.js"
import { isAdmin } from "../middleware/admin.js"
const app=express.Router()

app.post("/verify", adminLoginValidator(), validateHandler, adminLogin)
app.get("/out",adminLogout)

app.use(isAdmin)


app.get("/",adminData)
app.get("/users",allUser)
app.get("/chats",allChats)
app.get("/message",allMessage)
app.get("/stats",getDashboardStats)




export default app