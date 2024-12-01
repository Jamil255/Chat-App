import mongoose, { Types } from 'mongoose'

const requestSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'rejected', 'accepted'],
      require: true,
    },
    sender: {
      type: Types.ObjectId,
      ref: 'users',
      required: true,
    },
    receiver: {
      type: Types.ObjectId,
      ref: 'users',
      require: true,
    },
  },
  { timestamps: true }
)

const requestModel = mongoose.model('Request', requestSchema)
export default requestModel
