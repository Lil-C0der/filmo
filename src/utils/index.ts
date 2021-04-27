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

export const parseMongoDate = (date: string) => {
  if (!date) {
    return;
  }
  const dateArr = date.split('T');
  // console.log(dateArr);
  let timeArr = dateArr[1]?.split(':');
  const hrs = +timeArr[0] + 8;
  // console.log(timeArr);
  return `${dateArr[0]} ${hrs >= 24 ? hrs - 24 : hrs}:${timeArr[1]}`;
};

const fillLeft = (n: string | number) => (+n >= 10 ? String(n) : `0${+n}`);

export const parseTimeStamp = (stampStr: string) => {
  if (!stampStr) {
    return;
  }
  const stamp = +stampStr;
  const d = new Date(stamp);
  const yrs = d.getFullYear(),
    month = d.getMonth() + 1,
    date = d.getDate(),
    hrs = d.getHours(),
    min = d.getMinutes();

  // 2021-04-25 0:47 +8:00

  return `${yrs}-${fillLeft(month)}-${fillLeft(date)} ${fillLeft(
    hrs
  )}:${fillLeft(min)}`;
};
