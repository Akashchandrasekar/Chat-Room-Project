import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    sender: { type: String, required: true },
    room: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', MessageSchema);

export default Message;
