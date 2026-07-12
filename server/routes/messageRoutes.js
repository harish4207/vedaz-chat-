import { Router } from 'express';
import { createMessage, getMessages } from '../controllers/messageController.js';

const router = Router();

router.route('/').get(getMessages).post(createMessage);

export default router;