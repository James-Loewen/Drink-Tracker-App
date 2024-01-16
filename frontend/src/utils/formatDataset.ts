import { isSameDay } from "date-fns";
import { getDatesInTimeframe, WEEKDAYS } from "./datetime";
import type { DrinkLog } from "../api/drinkLog";
import calculateStandardDrinks from "./calculateStandardDrinks";

// const startTime = new Date().getTime();
// const { startDate, endDate } = getWeekStartAndEndDate(
//   new Date(2024, 0, 14)
// );
// const drinkLog = await fetchDrinkLog(startDate, endDate);
// const timeframe = getDatesInTimeframe(startDate, endDate);
// const WEEKDAYS = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];
// const dataset = timeframe.map((date, i) => {
//   const dailyLog = drinkLog.filter((log: any) =>
//     isSameDay(new Date(log.timestamp), date)
//   );
//   const count = dailyLog.length;
//   const standardDrinks = dailyLog.reduce((acc: number, log: any) => {
//     return (
//       acc + calculateStandardDrinks(log.volume, log.beverage.abv)
//     );
//   }, 0);
//   return {
//     day: WEEKDAYS[i],
//     Containers: count,
//     "Standard Drinks": standardDrinks,
//   };
// });
// console.log(dataset);
// const endTime = new Date().getTime();
// console.log(
//   "time ellapsed:",
//   (endTime - startTime) / 1000,
//   "seconds"
// );
// return { drinkLog, startDate, endDate, dataset };

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
        acc + calculateStandardDrinks(+log.volume, log.beverage.abv),
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
