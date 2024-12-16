import express from 'express'
import { isAuthenticated } from '../middleware/auth.js'
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
import { attachmentsMulter } from '../middleware/multer.js'
const app = express()

app.use(isAuthenticated)
app.post('/new/group', newGroupValidator(), validateHandler, newGroupChat)
app.get('/my/chat', getMyChats)
app.get('/my/group', getMyGroup)
app.put('/addmember', addMemberValidator(), validateHandler, addMember)
app.put('/removemember', removeMemberValidator(), validateHandler, removeMember)
app.delete('/delete/:chatId', chatIdValidator(), validateHandler, leaveGroup)
app.post('/message', attachmentsMulter, sendAttachment)
app.get('/message/:chatId', chatIdValidator(), validateHandler, getMessage)

app
  .route('/:chatId')
  .get(chatIdValidator(), validateHandler, getChatDetails)
  .put(renameValidator(), validateHandler, renameGroup)
  .delete(chatIdValidator(), validateHandler, deleteChat)

export default app
