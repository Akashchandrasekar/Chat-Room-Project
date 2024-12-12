import express from "express";
import { registerUser, loginUser } from "../Controllers/authControllers.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

export default router;
