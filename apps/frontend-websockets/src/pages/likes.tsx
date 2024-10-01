import React, { useEffect, useRef } from 'react';
import { Box } from '@shared-ui/components/ui/box';
import { BoxRow } from '@shared-ui/components/ui/box-row';
import { io, Socket } from 'socket.io-client';
import { Button } from '@shared-ui/components/ui/button';
import { BoxColumn } from '@shared-ui/components/ui/boxColumn';

function LikesPage() {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:8080');

    socketRef.current.on('connect', () => {
      console.log('@@@ connected ws');
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  socketRef.current?.emit('hello-word');

  return (
    <Box className={'w-screen h-screen flex justify-center items-center'}>
      <BoxColumn className={'w-full justify-center items-center'}>
        <BoxRow className={'h-fit w-4/5 justify-center bg-amber-300'}>
          hello world
        </BoxRow>
        <Button
          variant="outline"
          onClick={() => {
            socketRef.current?.emit('hello-world');
          }}
        >
          click me
        </Button>
      </BoxColumn>
    </Box>
  );
}

export { LikesPage };
