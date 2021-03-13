export const imgUrlParser = (
  url: string | null | undefined,
  width: number,
  height: number
) => (url ? url.replace(/w.h/, `${width}.${height}`) : '');

export const numberParser = (num: number = 0, divisor: number = 1) =>
  (num / divisor).toFixed(2);
