import User from '../models/User.js';
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

    const user = await User.findOneAndUpdate(
      { username },
      {
        username,
        online: true,
        lastSeen: null
      },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );

    return response.json(user);
  } catch (error) {
    return next(error);
  }
}

export async function getOnlineUsers(_request, response, next) {
  try {
    const users = await User.find({ online: true })
      .sort({ username: 1 })
      .select('username online lastSeen socketId');

    return response.json(users);
  } catch (error) {
    return next(error);
  }
}