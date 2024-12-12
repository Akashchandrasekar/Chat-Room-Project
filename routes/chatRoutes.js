import express from "express";
import {getMessages,createMessage } from "../Controllers/chatController.js";

const router = express.Router();

router.get("/:room", getMessages);
router.post("/", createMessage);

export default router;
