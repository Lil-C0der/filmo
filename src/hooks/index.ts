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

export function useSubmit<T, P extends any[]>(
  asyncFn: (...args: P) => Promise<T>,
  delay: number = 0
) {
  const [isRunning, setIsRunning] = useState(false);

  const executor = useCallback(
    async (...args: P) => {
      setIsRunning(true);
      let res, err;
      try {
        res = await asyncFn(...args);
      } catch (error) {
        err = error;
      }
      setTimeout(() => {
        setIsRunning(false);
      }, delay);
      return { res, err } as { res: T };
    },
    [asyncFn, delay]
  );

  return { executor, isRunning };
}
