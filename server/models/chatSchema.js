import mongoose, { Types } from 'mongoose'

const chatSchcema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    groupChat: {
      type: Boolean,
      default: false,
    },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    members: [
      {
        type: Types.ObjectId,
        ref: 'users',
      },
    ],
  },
  {
    timestamps: true,
  }
)

const chatModel = mongoose.model('chat', chatSchcema)
export default chatModel
