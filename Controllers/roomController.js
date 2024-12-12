import Room from '../models/Room.js';
import mongoose from 'mongoose';


// Get all rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching rooms' });
  }
};

// Create a new room
export const createRoom = async (req, res) => {
  const { name } = req.body;

  try {
    const existingRoom = await Room.findOne({ name });
    if (existingRoom) {
      return res.status(400).json({ error: 'Room name already exists' });
    }

    const newRoom = new Room({ name });
    await newRoom.save();
    res.status(201).json({ message: 'Room created successfully', room: newRoom });
  } catch (error) {
    res.status(500).json({ error: 'Server error while creating room' });
  }
};

// Delete a room



export const deleteRoom = async (req, res) => {
    let { roomId } = req.params;
  
    // Trim and validate the roomId
    roomId = roomId.trim();
    console.log('DELETE request received for roomId:', roomId);
  
    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      console.error('Invalid Room ID:', roomId);
      return res.status(400).json({ error: 'Invalid Room ID' });
    }
  
    try {
      const room = await Room.findById(roomId);
      if (!room) {
        console.log('Room not found');
        return res.status(404).json({ error: 'Room not found' });
      }
  
      // Correctly delete the room
      await Room.findByIdAndDelete(roomId);
      res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
      console.error('Error while deleting room:', error.message);
      res.status(500).json({ error: 'Server error while deleting room' });
    }
  };