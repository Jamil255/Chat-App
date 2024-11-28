import express from 'express'
import isAuthenticated from '../middleware/auth.js'
import {
  newGroupChat,
  getMyChats,
  getMyGroup,
  addMember,
  removeMember,
  leaveGroup,
} from '../controllers/chat.js'
const app = express()

app.use(isAuthenticated)
app.post('/new', newGroupChat)
app.get('/my', getMyChats)
app.get('/mygroup', getMyGroup)
app.put('/addmember', addMember)
app.put('/removemember', removeMember)
app.delete('/delete/:id', leaveGroup)

export default app
