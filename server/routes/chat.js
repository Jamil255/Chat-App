import express from 'express';
import isAuthenticated from '../middleware/auth.js';
import {newGroupChat,getMyChats,getMyGroup}from"../controllers/chat.js"
const app = express()

app.use(isAuthenticated)
app.post("/new",newGroupChat)
app.get("/my",getMyChats)
app.get("/mygroup",getMyGroup)

export default app