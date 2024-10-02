import React, { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface useSocketConnection {
  url: string;
}

interface WsData {
  likesCnt: number;
  lastAction: 'Like' | 'Dislike' | null;
}

interface WsResponse {
  lastAction: 'Like' | 'Dislike' | null;
}

export function useSocketConnection(
  config: useSocketConnection,
  userId: string | undefined,
) {
  const [data, setData] = React.useState<WsData>({
    likesCnt: 0,
    lastAction: null,
  });
  const socketRef = useRef<Socket | null>(null);
  const { url } = config;

  useEffect(() => {
    socketRef.current = io(url);

    socketRef.current.on('connect', () => {
      socketRef.current?.emit(
        'get-init-state',
        userId,
        (retrieveData: WsData) => {
          setData({ ...retrieveData });
        },
      );
    });

    socketRef?.current.on('update-likes', (cnt: number) => {
      setData((p) => ({ ...p, likesCnt: cnt }));
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [url]);

  const handleLike = (id: string) => {
    socketRef.current?.emit('like', id, (retrieveData: WsResponse) => {
      setData((p) => ({ ...p, lastAction: retrieveData.lastAction }));
    });
  };

  const handleDislike = (id: string) => {
    socketRef.current?.emit('dislike', id, (retrieveData: WsResponse) => {
      setData((p) => ({ ...p, lastAction: retrieveData.lastAction }));
    });
  };
  return { socketRef, data, handleLike, handleDislike };
}
