import type { BarDatum } from "@nivo/bar";

function generateWeeklyData(): BarDatum[] {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dataset = weekDays.map((day) => {
    const count = Math.floor(Math.random() * 6);
    // const offset = Math.round((Math.random() * 1.8 - 0.9) * 10) / 10;
    const offset = Math.random() * 0.2 + 0.95;

    return {
      day,
      count1: count,
      // count2: count + offset,
      count2: Math.round(count * offset * 10) / 10,
    };
  });

  return dataset;
}

export default generateWeeklyData;
