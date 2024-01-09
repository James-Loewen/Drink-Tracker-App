// import type { BarDatum } from "@nivo/bar";
import { useState } from "react";
import BarChart from "../components/BarChart";
import generateWeeklyData from "../data/generateWeeklyData";

function WeekView() {
  const [dataset, setDataset] = useState(generateWeeklyData());

  return (
    <>
      <BarChart data={dataset} />
      <button
        onClick={() => setDataset(generateWeeklyData())}
        className="px-2 py-1 rounded-md bg-black text-white"
      >
        Randomize
      </button>
    </>
  );
}

export default WeekView;
