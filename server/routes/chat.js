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
  getMessage,
} from '../controllers/chat.js'
import {
  newGroupValidator,
  validateHandler,
  addMemberValidator,
  removeMemberValidator,
  chatIdValidator,
  sendAttachmentsValidator,
  renameValidator,
} from '../utills/validators.js'
const app = express()

app.use(isAuthenticated)
app.post('/new', newGroupValidator(), validateHandler, newGroupChat)
app.get('/my', getMyChats)
app.get('/mygroup', getMyGroup)
app.put('/addmember', addMemberValidator(), validateHandler, addMember)
app.put('/removemember', removeMemberValidator(), validateHandler, removeMember)
app.delete('/delete/:id', chatIdValidator(), validateHandler, leaveGroup)
app.post(
  '/message',
  sendAttachmentsValidator(),
  validateHandler,
  sendAttachment
)
app.get('/message/:id', chatIdValidator(), validateHandler, getMessage)

app
  .route('/:id')
  .get(chatIdValidator(), validateHandler, getChatDetails)
  .put(renameValidator(), validateHandler, renameGroup)
  .delete(chatIdValidator(), validateHandler, deleteChat)

export default app
