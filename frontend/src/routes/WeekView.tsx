// import type { BarDatum } from "@nivo/bar";
import { useState } from "react";
import Button from "../components/Button";
import BarChart from "../components/BarChart";
import generateWeeklyData from "../data/generateWeeklyData";

function WeekView() {
  const [dataset, setDataset] = useState(generateWeeklyData());

  return (
    <>
      <BarChart data={dataset} />
      <Button
        onClick={() => setDataset(generateWeeklyData())}
        variant="primary"
      >
        Randomize
      </Button>
    </>
  );
}

export default WeekView;
