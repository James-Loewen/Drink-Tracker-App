import type { BarDatum } from "@nivo/bar";
import BarChart from "../components/BarChart";

const dataset: BarDatum[] = [
  {
    day: "Sunday",
    count1: 6,
    count2: 5.6,
  },
  {
    day: "Monday",
    count1: 3,
    count2: 4.1,
  },
  {
    day: "Tuesday",
    count2: 5,
    count1: 4.9,
  },
  {
    day: "Wednesday",
    count1: 1,
    count2: 1.5,
  },
  {
    day: "Thursday",
    count1: 8,
    count2: 9.2,
  },
  {
    day: "Friday",
    count1: 7,
    count2: 7.8,
  },
  {
    day: "Saturday",
    count1: 3,
    count2: 3.2,
  },
];

function WeekView() {
  return (
    <>
      <BarChart data={dataset} />
    </>
  );
}

export default WeekView;
