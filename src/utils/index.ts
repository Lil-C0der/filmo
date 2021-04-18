export const imgUrlParser = (
  url: string | null | undefined,
  width: number,
  height: number
) => (url ? url.replace(/w.h/, `${width}.${height}`) : '');

export const numberParser = (num: number = 0, divisor: number = 1) =>
  (num / divisor).toFixed(2);

export const getCurrGreeting = (
  h: number = new Date().getHours(),
  greetingList = ['夜深了', '早上好', '下午好', '晚上好', '夜深了']
): string => {
  if (h === 12) return '中午';

  const hoursList = [4, 12, 18, 22, 24];
  const idx = hoursList.findIndex((hour) => h <= hour);
  return greetingList[idx];
};
