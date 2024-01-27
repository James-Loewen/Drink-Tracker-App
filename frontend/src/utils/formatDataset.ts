import { isSameDay, isSameWeek, format } from "date-fns";
import { getDatesInTimeframe, getWeeksInTimeFrame, WEEKDAYS } from "./datetime";
import type { DrinkLog } from "../api/drinkLog";
import calculateStandardDrinks from "./calculateStandardDrinks";

export function formatBarChartDataset(
  data: DrinkLog[],
  startDate: Date,
  endDate: Date
) {
  const timeframe = getDatesInTimeframe(startDate, endDate);
  const dataset = timeframe.map((date, i) => {
    const dailyLog = data.filter((log) =>
      isSameDay(new Date(log.timestamp), date)
    );
    const count = dailyLog.length;
    const standardDrinks = dailyLog.reduce(
      (acc: number, log) =>
        acc + calculateStandardDrinks(log.volume, log.beverage.abv),
      0
    );
    return {
      day: WEEKDAYS[i],
      Containers: count,
      "Standard Drinks": standardDrinks,
    };
  });

  return dataset;
}

export function formatMonthDataset(
  data: DrinkLog[],
  startDate: Date,
  endDate: Date
) {
  const weeks = getWeeksInTimeFrame(startDate, endDate);
  // const timeframe = getDatesInTimeframe(startDate, endDate);
  const dataset = weeks.map((week, i) => {
    const weeklyLog = data.filter((log) =>
      // isSameDay(new Date(log.timestamp), date)
      isSameWeek(new Date(log.timestamp), week.start)
    );
    const count = weeklyLog.length;
    const standardDrinks = weeklyLog.reduce(
      (acc: number, log) =>
        acc + calculateStandardDrinks(log.volume, log.beverage.abv),
      0
    );
    return {
      // day: WEEKDAYS[i],
      weekStart: week.start,
      day: format(week.start, "M/d") + " – " + format(week.end, "M/d"),
      Containers: count,
      "Standard Drinks": standardDrinks,
    };
  });

  return dataset;
}
