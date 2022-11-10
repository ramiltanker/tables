import { getDateValues } from '../getDateValues/getDateValues';

export const checkIsSameDate = (date1: Date, date2: Date) => {
  const [year1, month1, day1] = getDateValues(date1);
  const [year2, month2, day2] = getDateValues(date2);

  return year1 === year2 && month1 === month2 && day1 === day2;
};
