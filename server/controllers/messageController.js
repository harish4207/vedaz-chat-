import Message from '../models/Message.js';
import User from '../models/User.js';
import { isDatabaseConnected } from '../config/db.js';
import { failure } from '../utils/response.js';

const MAX_MESSAGE_LENGTH = 1000;

function normalizeText(value) {
  return String(value || '').trim();
}

export async function getMessages(_request, response, next) {
  try {
    if (!isDatabaseConnected()) {
      return failure(response, 'Database unavailable', 503);
    }

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
    const text = normalizeText(request.body.text);
    const username = normalizeText(request.body.username || request.body.sender);

    if (!username) {
      return failure(response, 'Username is required', 400);
    }

    if (!text) {
      return failure(response, 'Message cannot be empty', 400);
    }

    if (text.length > MAX_MESSAGE_LENGTH) {
      return failure(response, 'Message must be 1000 characters or less', 400);
    }

    if (!isDatabaseConnected()) {
      return failure(response, 'Database unavailable', 503);
    }

    const sender = await User.findOne({ username });

    if (!sender) {
      return failure(response, 'User not found', 404);
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