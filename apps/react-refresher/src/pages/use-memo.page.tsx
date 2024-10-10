import React from 'react';
import { Box } from '@shared-ui/components/ui/box';
import { BoxRow } from '@shared-ui/components/ui/box-row';
import { BoxColumn } from '@shared-ui/components/ui/boxColumn';
import { Button } from '@shared-ui/components/ui/button';

export function UseMemoPage() {
  const [num1, setNum1] = React.useState(1);
  const [num2, setNum2] = React.useState(2);

  const computedValue = React.useMemo(() => num1 * num2, [num1, num2]);
  const computedValueNoDeps = React.useMemo(() => num1 * num2, []);
  const computedValueOnlyNum1 = React.useMemo(() => num1 * num2, [num1]);

  return (
    <Box className={'flex py-12 justify-center w-screen h-screen'}>
      <BoxColumn className={'gap-4 items-center'}>
        <BoxRow>{`computedValue: ${computedValue}`}</BoxRow>
        <BoxRow>{`computedValueOnlyNum1: ${computedValueOnlyNum1}`}</BoxRow>
        <BoxRow>{`computedValueNoDeps: ${computedValueNoDeps}`}</BoxRow>
        <BoxRow className={'gap-4'}>
          <Button
            variant={'outline'}
            onClick={() => {
              setNum1((p) => p + 1);
            }}
          >
            set number 1
          </Button>
          <Button
            variant={'outline'}
            onClick={() => {
              setNum2((p) => p + 1);
            }}
          >
            set number 2
          </Button>
        </BoxRow>
      </BoxColumn>
    </Box>
  );
}
