import express from 'express'
import isAuthenticated from '../middleware/auth.js'
import {
  newGroupChat,
  getMyChats,
  getMyGroup,
  addMember,
  removeMember,
  leaveGroup,
  sendAttachment,
  getChatDetails,
    renameGroup,
    deleteChat,
    getMessage
} from '../controllers/chat.js'
import upload from '../middleware/multer.js'
const app = express()

app.use(isAuthenticated)
app.post('/new', newGroupChat)
app.get('/my', getMyChats)
app.get('/mygroup', getMyGroup)
app.put('/addmember', addMember)
app.put('/removemember', removeMember)
app.delete('/delete/:id', leaveGroup)
app.post('/message', upload.array('files', 5), sendAttachment)
app.get("/message/:id",getMessage)

app.route('/:id').get(getChatDetails).put(renameGroup).delete(deleteChat)

export default app
