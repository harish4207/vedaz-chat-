import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatWindow from '../components/ChatWindow';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useSocketContext } from '../context/SocketContext';
import api from '../services/api';
import { useScroll } from '../hooks/useScroll';

export default function Chat() {
  const { user, setUser } = useAuth();
  const { socket, connected } = useSocketContext();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [historyError, setHistoryError] = useState('');
  const [historyReloadCount, setHistoryReloadCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUser, setTypingUser] = useState('');
  const listRef = useRef(null);
  const navigate = useNavigate();
  const typingTimeoutRef = useRef(null);
  const inputRef = useRef(null);

  useScroll(listRef, messages.length);

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [navigate, user]);

  useEffect(() => {
    if (!socket || !user?.username) return;

    const handleReceiveMessage = (incomingMessage) => {
      const normalized = {
        id: incomingMessage._id,
        sender: incomingMessage.sender?.username || 'Unknown',
        text: incomingMessage.text,
        createdAt: incomingMessage.createdAt,
        mine: incomingMessage.sender?.username === user.username,
        status: incomingMessage.status,
        delivered: incomingMessage.delivered,
        read: incomingMessage.read
      };

      setMessages((currentMessages) => {
        if (currentMessages.some((item) => item.id === normalized.id)) {
          return currentMessages;
        }

        return [...currentMessages, normalized];
      });

      if (!normalized.mine) {
        socket.emit('messageRead', { messageId: normalized.id });
      }
    };

    const handleOnlineUsers = (users) => {
      setOnlineUsers(users);
    };

    const handleTyping = ({ username }) => {
      if (username && username !== user.username) {
        setTypingUser(username);
      }
    };

    const handleStopTyping = ({ username }) => {
      if (!username || username === user.username) return;
      setTypingUser((current) => (current === username ? '' : current));
    };

    const handleMessageRead = (updatedMessage) => {
      setMessages((currentMessages) =>
        currentMessages.map((item) =>
          item.id === updatedMessage._id
            ? {
                ...item,
                status: updatedMessage.status,
                delivered: updatedMessage.delivered,
                read: updatedMessage.read
              }
            : item
        )
      );
    };

    const handleConnect = () => {
      socket.emit('join', { username: user.username });
    };

    socket.on('connect', handleConnect);
    socket.on('receiveMessage', handleReceiveMessage);
    socket.on('userOnline', handleOnlineUsers);
    socket.on('typing', handleTyping);
    socket.on('stopTyping', handleStopTyping);
    socket.on('messageRead', handleMessageRead);

    if (socket.connected) {
      socket.emit('join', { username: user.username });
    }

    return () => {
      socket.off('connect', handleConnect);
      socket.off('receiveMessage', handleReceiveMessage);
      socket.off('userOnline', handleOnlineUsers);
      socket.off('typing', handleTyping);
      socket.off('stopTyping', handleStopTyping);
      socket.off('messageRead', handleMessageRead);
    };
  }, [socket, user?.username]);

  useEffect(() => {
    let active = true;

    async function loadHistory() {
      try {
        setLoadingHistory(true);
        setHistoryError('');
        const { data } = await api.get('/messages');

        if (active) {
          const normalized = data.map((item) => ({
            id: item._id,
            sender: item.sender?.username || 'Unknown',
            text: item.text,
            createdAt: item.createdAt,
            mine: item.sender?.username === user?.username,
            status: item.status,
            delivered: item.delivered,
            read: item.read
          }));

          setMessages(normalized);
        }
      } catch (requestError) {
        if (active) {
          setHistoryError(requestError.response?.data?.message || 'Failed to load messages');
        }
      } finally {
        if (active) {
          setLoadingHistory(false);
        }
      }
    }

    if (user) {
      loadHistory();
    }

    return () => {
      active = false;
    };
  }, [historyReloadCount, user]);

  const onlineCount = useMemo(() => onlineUsers.length, [onlineUsers]);

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const handleRetry = () => {
    setHistoryReloadCount((value) => value + 1);
  };

  const handleSend = async (event) => {
    event.preventDefault();

    const text = message.trim();
    if (!text || !user?.username) return;

    try {
      socket.emit('sendMessage', { username: user.username, text }, (result) => {
        if (!result?.ok) {
          setHistoryError(result?.error || 'Failed to send message');
        }
      });
      setMessage('');
      window.setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    } catch (requestError) {
      setHistoryError(requestError.response?.data?.message || 'Failed to send message');
    }
  };

  const handleTyping = (value) => {
    setMessage(value);

    if (!user?.username || !socket.connected) return;

    socket.emit('typing', { username: user.username });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stopTyping', { username: user.username });
    }, 1000);
  };

  return (
    <main className={darkMode ? 'min-h-full bg-slate-950 text-slate-100' : 'min-h-full text-slate-900'}>
      <div className="mx-auto flex min-h-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <Navbar
          username={user?.username}
          connected={connected}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode((value) => !value)}
          onLogout={handleLogout}
          onlineCount={onlineCount}
        />

        <section className="grid flex-1 gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <Sidebar users={onlineUsers} currentUser={user?.username} />

          <ChatWindow
            messages={messages}
            loading={loadingHistory}
            error={historyError}
            typingUser={typingUser}
            message={message}
            setMessage={handleTyping}
            onSend={handleSend}
            onRetry={handleRetry}
            inputRef={inputRef}
            sendDisabled={!message.trim()}
          />
        </section>
      </div>
    </main>
  );
}