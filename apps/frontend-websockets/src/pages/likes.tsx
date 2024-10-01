import React from 'react';
import { Box } from '@shared-ui/components/ui/box';
import { Button } from '@shared-ui/components/ui/button';
import { PiThumbsDownThin, PiThumbsUpThin } from 'react-icons/pi';
import { BoxRow } from '@shared-ui/components/ui/box-row';
import { useSocketConnection } from '../hooks/useSocketConnection';

function LikesPage() {
  const { socket } = useSocketConnection({ url: 'http://localhost:4000' });

  return (
    <Box className={'w-screen h-screen flex justify-center items-center'}>
      <BoxRow className={'justify-center items-center'}>
        <Button
          className={'rounded-tr-none rounded-br-none'}
          size={'lg'}
          variant="outline-left"
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
          className={'rounded-tl-none rounded-bl-none'}
          size={'lg'}
          variant="outline-right"
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
