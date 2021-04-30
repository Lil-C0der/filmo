import { useCallback, useEffect, useRef, useState } from 'react';

export function useDebounce(fn: any, delay = 300): any {
  const { current } = useRef<{ fn: any; timer: NodeJS.Timeout | null } | null>({
    fn,
    timer: null
  });
  useEffect(() => {
    if (current) {
      current.fn = fn;
    }
  }, [current, fn]);

  const debounceFn = useCallback(
    (...args: any[]) => {
      if (current?.timer) {
        clearTimeout(current.timer);
        current.timer = null;
      }
      current!.timer = setTimeout(() => {
        // @ts-ignore
        current?.fn.call(this, ...args);
      }, delay);
    },
    [current, delay]
  );

  return debounceFn;
}

export function useSubmit(asyncFn: any) {
  const [res, setRes] = useState();
  const [isRunning, setIsRunning] = useState(false);

  const executor = async () => {
    setIsRunning(true);
    setRes(await asyncFn());
    setIsRunning(false);
  };

  return { executor, res };
}
