import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import isToday from 'dayjs/plugin/isToday';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import isoWeek from 'dayjs/plugin/isoWeek';
import localeData from 'dayjs/plugin/localeData';

const configDayJS = () => {
  dayjs.extend(duration);
  dayjs.extend(utc);
  dayjs.extend(relativeTime);
  dayjs.extend(isToday);
  dayjs.extend(isBetween);
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);
  dayjs.extend(updateLocale);
  dayjs.extend(LocalizedFormat);
  dayjs.extend(isoWeek);
  dayjs.extend(localeData);

  // dayjs.updateLocale('en', {
  //   weekStart: 0,
  // });
};

export default configDayJS;
