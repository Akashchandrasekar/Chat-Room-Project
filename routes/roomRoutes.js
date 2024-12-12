import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { getAllRooms, createRoom, deleteRoom } from '../Controllers/roomController.js';

const router = express.Router();

router.get('/', authenticateToken, getAllRooms);
router.post('/', authenticateToken, createRoom);
router.delete('/:roomId', authenticateToken, deleteRoom);

export default router;
