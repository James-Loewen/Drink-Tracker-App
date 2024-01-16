import {
  format,
  addDays,
  isSameDay,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  subWeeks,
  startOfMonth,
  endOfMonth,
} from "date-fns";

const DATETIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

export const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

type TimeOfDay = "start" | "end" | null;

export function toCustomIsoFormat(
  date: Date,
  replaceTimeOfDay: TimeOfDay = null
) {
  const replaceTimeFns = {
    start: startOfDay,
    end: endOfDay,
  };
  if (replaceTimeOfDay === null) {
    return format(date, DATETIME_FORMAT);
  }

  const replacementFn = replaceTimeFns[replaceTimeOfDay];

  return format(replacementFn(date), DATETIME_FORMAT);
}

export function getWeekStartAndEndDate(
  weekOffset: number = 0,
  date = new Date()
) {
  if (weekOffset > 0) {
    date = subWeeks(date, weekOffset);
  }

  return {
    startDate: startOfWeek(date),
    endDate: endOfWeek(date),
  };
}

export function getWeekStartAndEndDateStrings(day = new Date()) {
  return {
    startDate: toCustomIsoFormat(startOfWeek(day)),
    endDate: toCustomIsoFormat(endOfWeek(day)),
  };
}

export function getMonthStartAndEndDateStrings(day = new Date()) {
  return {
    startDate: toCustomIsoFormat(startOfMonth(day)),
    endDate: toCustomIsoFormat(endOfMonth(day)),
  };
}

export function getMonthStartAndEndDate(date = new Date()) {
  return {
    startDate: startOfMonth(date),
    endDate: endOfMonth(date),
  };
}

export function getDatesInTimeframe(startDate: Date, endDate: Date) {
  const dates: Date[] = [];
  let currDate = startDate;
  while (!isSameDay(currDate, endDate)) {
    dates.push(currDate);
    currDate = addDays(currDate, 1);
  }
  dates.push(currDate);
  console.log(dates);
  return dates;
}
