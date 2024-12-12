import Message from '../models/Message.js';

// Get messages for a specific room
export const getMessages = async (req, res) => {
  try {
    const { room } = req.params;  // Extract room name from the URL parameter

    // Query the database for messages in the specified room
    const messages = await Message.find({ room });

    if (!messages || messages.length === 0) {
      // If no messages found, send a 404 response
      return res.status(404).json({ message: 'No messages found for this room' });
    }

    // Return the fetched messages in the response
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error.message);
    res.status(500).json({ error: 'Error fetching messages' });
  }
};

  


export const createMessage = async (req, res) => {
  try {
    const { content, sender, room } = req.body;

    // Ensure all fields are provided
    if (!content || !sender || !room) {
      return res.status(400).json({ error: 'Content, sender, and room are required' });
    }

    // Create new message
    const newMessage = new Message({
      content,
      sender,
      room,
    });

    // Save the message to the database
    await newMessage.save();

    // Send the response
    res.status(201).json({
      message: 'Message created successfully',
      data: newMessage,
    });
  } catch (error) {
    console.error('Error while creating message:', error);
    res.status(500).json({ error: 'Server error while creating message' });
  }
};
