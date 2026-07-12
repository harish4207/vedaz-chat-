import { Router } from 'express';
import { getOnlineUsers, loginUser } from '../controllers/userController.js';

const router = Router();

router.post('/login', loginUser);
router.get('/', getOnlineUsers);

export default router;