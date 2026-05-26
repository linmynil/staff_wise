import dayjs from 'dayjs';

export const isToday = (value: string) => {
  return dayjs(value).isSame(dayjs(), 'day');
};
