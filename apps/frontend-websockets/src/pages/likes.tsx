import React from 'react';
import { Box } from '@shared-ui/components/ui/box';
import { Button } from '@shared-ui/components/ui/button';
import { PiThumbsDownThin, PiThumbsUpThin } from 'react-icons/pi';
import { BoxRow } from '@shared-ui/components/ui/box-row';
import { useSocketConnection } from '../hooks/useSocketConnection';
import { useParams } from 'react-router-dom';

function LikesPage() {
  const { socketRef, likes } = useSocketConnection({
    url: 'http://localhost:4000',
  });
  const { id } = useParams<{ id: string }>();

  return (
    <Box className={'w-screen h-screen flex justify-center items-center'}>
      <BoxRow className={'justify-center items-center'}>
        <Button
          className={'rounded-tr-none rounded-br-none'}
          size={'lg'}
          variant="outline-left"
          onClick={() => {
            socketRef.current?.emit('dislike', id);
          }}
        >
          <PiThumbsDownThin className={'text-2xl'} />
        </Button>
        <BoxRow
          className={
            'min-w-[85px] justify-center items-center border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground min-h-[40px] border-r-0 border-l-0'
          }
        >
          {likes}
        </BoxRow>
        <Button
          className={'rounded-tl-none rounded-bl-none'}
          size={'lg'}
          variant="outline-right"
          onClick={() => {
            socketRef.current?.emit('like', id);
          }}
        >
          <PiThumbsUpThin className={'text-2xl'} />
        </Button>
      </BoxRow>
    </Box>
  );
}

export { LikesPage };
