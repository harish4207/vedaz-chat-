import User from '../models/User.js';
import { isDatabaseConnected } from '../config/db.js';
import { failure } from '../utils/response.js';

function normalizeUsername(value) {
  return String(value || '').trim();
}

export async function loginUser(request, response, next) {
  try {
    const username = normalizeUsername(request.body.username);

    if (!username) {
      return failure(response, 'Username is required', 400);
    }

    if (!isDatabaseConnected()) {
      return failure(response, 'Database unavailable', 503);
    }

    const existingUser = await User.findOne({ username });

    if (existingUser && existingUser.online) {
      return failure(response, 'Username already in use', 409);
    }

    if (existingUser) {
      existingUser.online = true;
      existingUser.lastSeen = null;
      await existingUser.save();

      return response.json(existingUser);
    }

    const user = await User.create({
      username,
      online: true,
      lastSeen: null
    });

    return response.json(user);
  } catch (error) {
    if (error?.code === 11000) {
      return failure(response, 'Username already in use', 409);
    }

    return next(error);
  }
}

export async function getOnlineUsers(_request, response, next) {
  try {
    if (!isDatabaseConnected()) {
      return failure(response, 'Database unavailable', 503);
    }

    const users = await User.find({ online: true })
      .sort({ username: 1 })
      .select('username online lastSeen socketId');

    return response.json(users);
  } catch (error) {
    return next(error);
  }
}