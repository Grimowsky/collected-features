import React, { useEffect, useRef } from 'react';
import { Box } from '@shared-ui/components/ui/box';
import { io, Socket } from 'socket.io-client';
import { Button } from '@shared-ui/components/ui/button';
import { BoxColumn } from '@shared-ui/components/ui/boxColumn';
import { PiThumbsDownThin, PiThumbsUpThin } from 'react-icons/pi';
import { BoxRow } from '@shared-ui/components/ui/box-row';

interface useSocketConnection {
  url: string;
}

function useSocketConnection(data: useSocketConnection) {
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

function LikesPage() {
  const { socket } = useSocketConnection({ url: 'http://localhost:4000' });

  return (
    <Box className={'w-screen h-screen flex justify-center items-center'}>
      <BoxRow className={'justify-center items-center'}>
        <Button
          className={
            'rounded-l-xl rounded-r-0 border-r-0 rounded-tr-none rounded-br-none'
          }
          size={'lg'}
          variant="outline"
          onClick={() => {
            socket.current?.emit('hello-test');
          }}
        >
          <PiThumbsDownThin className={'text-2xl'} />
        </Button>
        <BoxRow
          className={
            'min-w-[85px] justify-center items-center border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground min-h-[40px] border-r-0 border-l-0'
          }
        >
          hello
        </BoxRow>
        <Button
          className={
            'rounded-r-xl rounded-l-0 border-l-0 rounded-tl-none rounded-bl-none'
          }
          size={'lg'}
          variant="outline"
          onClick={() => {
            socket.current?.emit('hello-test');
          }}
        >
          <PiThumbsUpThin className={'text-2xl'} />
        </Button>
      </BoxRow>
    </Box>
  );
}

export { LikesPage };
