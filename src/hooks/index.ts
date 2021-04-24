import { useCallback, useEffect, useRef } from 'react';

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
