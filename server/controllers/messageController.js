import Message from '../models/Message.js';
import User from '../models/User.js';
import { failure, success } from '../utils/response.js';

export async function getMessages(_request, response, next) {
  try {
    const messages = await Message.find()
      .sort({ createdAt: 1 })
      .populate('sender', 'username online lastSeen');

    return response.json(messages);
  } catch (error) {
    return next(error);
  }
}

export async function createMessage(request, response, next) {
  try {
    const text = String(request.body.text || '').trim();
    const username = String(request.body.username || request.body.sender || '').trim();

    if (!username) {
      return failure(response, 'Username is required', 400);
    }

    if (!text) {
      return failure(response, 'Message text is required', 400);
    }

    const sender = await User.findOne({ username });

    if (!sender) {
      return failure(response, 'User not found. Please login again.', 404);
    }

    const message = await Message.create({
      sender: sender._id,
      text,
      status: 'sent',
      delivered: sender.online,
      read: false
    });

    const populatedMessage = await message.populate('sender', 'username online lastSeen');

    return response.status(201).json(populatedMessage);
  } catch (error) {
    return next(error);
  }
}