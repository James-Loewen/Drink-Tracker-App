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
    const offset = Math.random() * 0.2 + 0.95;

    return {
      day,
      Containers: count,
      "Standard Drinks": Math.round(count * offset * 10) / 10,
    };
  });

  return dataset;
}

export default generateWeeklyData;
