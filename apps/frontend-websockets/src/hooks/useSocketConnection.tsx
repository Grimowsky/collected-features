import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface useSocketConnection {
  url: string;
}

export function useSocketConnection(data: useSocketConnection) {
  const socketRef = useRef<Socket | null>(null);
  const { url } = data;
  useEffect(() => {
    socketRef.current = io(url);

    socketRef.current.on('connect', () => {
      console.log('@@@ connected ws');
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return { socket: socketRef };
}
