import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures room names are unique
    trim: true,
  },
  users: {
    type: [String], // Array of usernames
    default:[],
  },
}, { timestamps: true });

export default mongoose.model('Room', RoomSchema);
