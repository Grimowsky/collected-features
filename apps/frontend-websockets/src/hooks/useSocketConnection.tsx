import React, { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface useSocketConnection {
  url: string;
}

export function useSocketConnection(data: useSocketConnection) {
  const [likes, setLikes] = React.useState<number>(0);
  const socketRef = useRef<Socket | null>(null);
  const { url } = data;

  useEffect(() => {
    socketRef.current = io(url);

    socketRef.current.on('connect', () => {
      console.log('@@@ connected @@@');
    });

    socketRef?.current?.on('likes-count', (cnt: number) => {
      setLikes(cnt);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [url]);

  return { socketRef, likes };
}
