import mongoose, { Types } from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    attachments: [
      {
        publicId: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    sender: {
      type: Types.ObjectId,
      ref: 'users',
      required: true,
    },
    chat: {
      type: Types.ObjectId,
      ref: 'chat',
      required: true,
    },
  },
  { timestamps: true }
)

const messageModel = mongoose.model('Message', messageSchema)
export default messageModel
