import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';

export function useSocket(event, handler) {
  const { socket } = useSocketContext();

  useEffect(() => {
    socket.on(event, handler);

    return () => {
      socket.off(event, handler);
    };
  }, [event, handler, socket]);

  return socket;
}