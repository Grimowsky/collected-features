import React, { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface useSocketConnection {
  url: string;
}

interface WsData {
  likesCnt: number;
  lastUserAction: 'Like' | 'Dislike' | null;
}

interface WsResponse {
  lastUserAction: 'Like' | 'Dislike' | null;
}

export function useSocketConnection(
  config: useSocketConnection,
  userId: string | undefined,
) {
  const [data, setData] = React.useState<WsData>({
    likesCnt: 0,
    lastUserAction: null,
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
      setData((p) => ({ ...p, lastUserAction: retrieveData.lastUserAction }));
    });
  };

  const handleDislike = (id: string) => {
    socketRef.current?.emit('dislike', id, (retrieveData: WsResponse) => {
      setData((p) => ({ ...p, lastUserAction: retrieveData.lastUserAction }));
    });
  };
  return { socketRef, data, handleLike, handleDislike };
}
