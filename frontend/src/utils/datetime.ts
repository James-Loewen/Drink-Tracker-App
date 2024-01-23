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
  subMonths,
} from "date-fns";

export const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function toDateString(date: Date) {
  return format(date, "M/d/yy");
}

export function toTimeString(date: Date) {
  return format(date, "h:mmaaa");
}

const DATETIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

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

export function getMonthStartAndEndDate(
  monthOffset: number = 0,
  date = new Date()
) {
  if (monthOffset > 0) {
    date = subMonths(date, monthOffset);
  }

  return {
    startDate: startOfMonth(date),
    endDate: endOfMonth(date),
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

export function getDatesInTimeframe(startDate: Date, endDate: Date) {
  const dates: Date[] = [];
  let currDate = startDate;
  while (!isSameDay(currDate, endDate)) {
    dates.push(currDate);
    currDate = addDays(currDate, 1);
  }
  dates.push(currDate);
  return dates;
}
