import Message from '../models/Message.js';
import User from '../models/User.js';

async function setUserOnlineStatus(username, socketId, online) {
  if (!username) return null;

  return User.findOneAndUpdate(
    { username },
    {
      socketId: online ? socketId : null,
      online,
      lastSeen: online ? null : new Date()
    },
    { new: true }
  );
}

async function broadcastOnlineUsers(io) {
  const users = await User.find({ online: true })
    .sort({ username: 1 })
    .select('username online lastSeen socketId');

  io.emit('userOnline', users);
}

export function registerSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log('User Connected', socket.id);
    socket.emit('server:ready', { ok: true, socketId: socket.id });

    socket.on('join', async ({ username }) => {
      const user = await setUserOnlineStatus(username, socket.id, true);
      socket.data.username = user?.username || username;
      socket.join('pulsechat');
      await broadcastOnlineUsers(io);
    });

    socket.on('sendMessage', async (payload, callback) => {
      try {
        const text = String(payload?.text || '').trim();
        const username = String(payload?.username || socket.data.username || '').trim();

        if (!username || !text) {
          const error = new Error('Username and text are required');
          if (callback) callback({ ok: false, error: error.message });
          return;
        }

        const sender = await User.findOne({ username });

        if (!sender) {
          const error = new Error('User not found');
          if (callback) callback({ ok: false, error: error.message });
          return;
        }

        const message = await Message.create({
          sender: sender._id,
          text,
          status: sender.online ? 'delivered' : 'sent',
          delivered: sender.online,
          read: false
        });

        const populatedMessage = await message.populate('sender', 'username online lastSeen');

        io.emit('receiveMessage', populatedMessage);
        io.emit('messageDelivered', populatedMessage);

        if (callback) callback({ ok: true, message: populatedMessage });
      } catch (error) {
        if (callback) callback({ ok: false, error: error.message });
      }
    });

    socket.on('messageRead', async ({ messageId }) => {
      if (!messageId) return;

      const updatedMessage = await Message.findByIdAndUpdate(
        messageId,
        { read: true, delivered: true, status: 'read' },
        { new: true }
      ).populate('sender', 'username online lastSeen');

      if (updatedMessage) {
        io.emit('messageRead', updatedMessage);
      }
    });

    socket.on('typing', ({ username }) => {
      socket.to('pulsechat').emit('typing', { username });
    });

    socket.on('stopTyping', ({ username }) => {
      socket.to('pulsechat').emit('stopTyping', { username });
    });

    socket.on('disconnect', async () => {
      const username = socket.data.username;
      await setUserOnlineStatus(username, socket.id, false);
      await broadcastOnlineUsers(io);
      console.log('User Disconnected', socket.id);
    });
  });
}