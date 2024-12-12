import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import connectDB from "./Config/db.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Middleware for JSON parsing and URL encoding
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enabling CORS

// Connect to Database
connectDB();

// Default route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Our API");
});

// API routes
app.use("/api/auth", authRoutes);
app.use('/api/chat/rooms', roomRoutes);

app.use("/api/chat", chatRoutes);

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Update with your frontend URL
    methods: ["GET", "POST"],
  },
});

// Socket.IO events
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Join Room event
  socket.on("joinRoom", ({ username, room }) => {
    socket.join(room); // User joins the room
    io.to(room).emit("message", `${username} has joined the room.`);
  });

  // Send Message event
  socket.on("sendMessage", ({ room, message, username }) => {
    io.to(room).emit("message", { username, message, timestamp: new Date() });
  });

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
