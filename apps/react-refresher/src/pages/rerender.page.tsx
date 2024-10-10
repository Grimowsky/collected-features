import React from 'react';
import { useRenderCount } from '../hooks/render-count';
import { Box } from '@shared-ui/components/ui/box';
import { BoxRow } from '@shared-ui/components/ui/box-row';
import { BoxColumn } from '@shared-ui/components/ui/boxColumn';
import { Button } from '@shared-ui/components/ui/button';

interface ChildComponent1Props {
  counter: number;
}
function ChildComponent1(props: ChildComponent1Props) {
  const { counter } = props;
  const count = useRenderCount();

  return (
    <>
      <BoxColumn className={'items-center border p-6 rounded-sm mt-4'}>
        <BoxRow className={'mb-4'}>counter1 as props</BoxRow>
        <BoxRow>{`counter - child: ${counter}`}</BoxRow>
        <BoxRow>{`renderCount - child: ${count}`}</BoxRow>
      </BoxColumn>
    </>
  );
}

interface ChildComponent2Props {
  counter: number;
}
function ChildComponent2(props: ChildComponent2Props) {
  const { counter } = props;
  const count = useRenderCount();

  return (
    <>
      <BoxColumn className={'items-center border p-6 rounded-lg mt-4'}>
        <BoxRow className={'mb-4'}>memoized counter1</BoxRow>
        <BoxRow>{`counter - child: ${counter}`}</BoxRow>
        <BoxRow>{`renderCount - child: ${count}`}</BoxRow>
      </BoxColumn>
    </>
  );
}

interface ChildComponent3Props {
  counter: number;
}

const ChildComponent3 = React.memo(function ChildComponent3(
  props: ChildComponent3Props,
) {
  const { counter } = props;
  const count = useRenderCount();

  return (
    <>
      <BoxColumn className={'items-center border p-6 rounded-lg mt-4'}>
        <BoxRow className={'mb-4'}>react.memo & memoized count2</BoxRow>
        <BoxRow>{`counter - child: ${counter}`}</BoxRow>
        <BoxRow>{`renderCount - child: ${count}`}</BoxRow>
      </BoxColumn>
    </>
  );
});

interface ChildComponent4Props {
  counter: number;
}
const ChildComponent4 = React.memo(function ChildComponent4(
  props: ChildComponent4Props,
) {
  const { counter } = props;
  const count = useRenderCount();

  return (
    <>
      <BoxColumn className={'items-center border p-6 rounded-lg mt-4'}>
        <BoxRow className={'mb-4'}>react.memo & normal count1</BoxRow>
        <BoxRow>{`counter - child: ${counter}`}</BoxRow>
        <BoxRow>{`renderCount - child: ${count}`}</BoxRow>
      </BoxColumn>
    </>
  );
});

interface useCallbackOnlyProps {
  onChange: () => void;
}

function UseCallbackOnly(props: useCallbackOnlyProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onChange } = props;
  const count = useRenderCount();

  return (
    <>
      <BoxColumn className={'items-center border p-8 rounded-lg mt-4'}>
        <BoxRow className={'mb-4 text-center'}>
          use callback only, deps on counter2 increase
        </BoxRow>
        <BoxRow>{`renderCount - child: ${count}`}</BoxRow>
      </BoxColumn>
    </>
  );
}

interface MemoizedUseCallbackOnlyProps {
  onChange: () => void;
}

const MemoizedUseCallback = React.memo(function MemoizedUseCallback(
  props: MemoizedUseCallbackOnlyProps,
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onChange } = props;
  const count = useRenderCount();

  return (
    <>
      <BoxColumn className={'items-center border p-8 rounded-lg mt-4'}>
        <BoxRow className={'mb-4 text-center'}>
          React.memo useCallback, deps on counter2 increase
        </BoxRow>
        <BoxRow>{`renderCount - child: ${count}`}</BoxRow>
      </BoxColumn>
    </>
  );
});

function NonProps() {
  const count = useRenderCount();

  return (
    <>
      <BoxColumn className={'items-center border p-8 rounded-lg mt-4'}>
        <BoxRow className={'mb-4'}>non-props child</BoxRow>
        <BoxRow>{`renderCount - child: ${count}`}</BoxRow>
      </BoxColumn>
    </>
  );
}

const MemoNonProps = React.memo(function MemoNonProps() {
  const count = useRenderCount();

  return (
    <>
      <BoxColumn className={'items-center border p-8 rounded-lg mt-4'}>
        <BoxRow className={'mb-4'}>memo non-props child</BoxRow>
        <BoxRow>{`renderCount - child: ${count}`}</BoxRow>
      </BoxColumn>
    </>
  );
});

export function RerenderPage() {
  const [counter, setCounter] = React.useState(0);
  const [counter2, setCounter2] = React.useState(99);
  const [counter3, setCounter3] = React.useState(200);
  const count = useRenderCount();

  const memoizedCounter = React.useMemo(() => {
    return counter;
  }, [counter]);

  const memoizedOnChange = React.useCallback(() => {
    setCounter2((p) => p + 1);
  }, [counter2]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onChange = () => {
    setCounter2((p) => p + 1);
  };

  return (
    <Box className={'flex justify-center'}>
      <BoxColumn className={'gap-6 pt-8 w-screen'}>
        <BoxColumn
          className={'items-center justify-center gap-6 sticky top-10'}
        >
          <Button
            onClick={() => setCounter((p) => p + 1)}
            variant={'outline'}
            className={'max-w-[350px]'}
          >
            increase counter1
          </Button>
          <Button
            onClick={() => setCounter2((p) => p + 1)}
            variant={'outline'}
            className={'max-w-[350px]'}
          >
            increase counter2
          </Button>
          <Button
            onClick={() => setCounter3((p) => p + 1)}
            variant={'outline'}
            className={'max-w-[350px]'}
          >
            increase counter 3 (not passed via props)
          </Button>
          <BoxColumn
            className={
              'gap-2 border rounded-lg w-[350px] p-8 items-center bg-background'
            }
          >
            <Box>{`counter value: ${counter}`}</Box>
            <Box>{`counter2 value: ${counter2}`}</Box>
            <Box>{`counter3 value: ${counter3}`}</Box>
            <Box>{`parent renders count: ${count}`}</Box>
          </BoxColumn>
        </BoxColumn>
        <BoxRow className={'flex-wrap w-full mt-4 gap-8 justify-center'}>
          <Box className={'w-[350px]'}>
            <NonProps />
          </Box>
          <Box className={'w-[350px]'}>
            <MemoNonProps />
          </Box>
        </BoxRow>
        <BoxRow className={'flex-wrap w-full mt-4 gap-8 justify-center'}>
          <Box className={'w-[350px]'}>
            <ChildComponent1 counter={counter} />
          </Box>
          <Box className={'w-[350px]'}>
            <ChildComponent2 counter={memoizedCounter} />
          </Box>
        </BoxRow>
        <BoxRow className={'flex-wrap w-full mt-4 gap-8 justify-center'}>
          <Box className={'w-[350px]'}>
            <ChildComponent4 counter={counter} />
          </Box>
          <Box className={'w-[350px]'}>
            <ChildComponent3 counter={counter2} />
          </Box>
        </BoxRow>
        <BoxRow className={'flex-wrap w-full mt-4 gap-8 justify-center'}>
          <Box className={'w-[350px]'}>
            <UseCallbackOnly onChange={memoizedOnChange} />
          </Box>
          <Box className={'w-[350px]'}>
            <MemoizedUseCallback onChange={memoizedOnChange} />
          </Box>
        </BoxRow>
      </BoxColumn>
    </Box>
  );
}
