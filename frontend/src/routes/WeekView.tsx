// import type { BarDatum } from "@nivo/bar";
import { useState } from "react";
import Button from "../components/Button";
import BarChart from "../components/BarChart";
import generateWeeklyData from "../data/generateWeeklyData";

import { useLoaderData } from "react-router-dom";

function WeekView() {
  // const [dataset, setDataset] = useState(generateWeeklyData());
  const data: any = useLoaderData();
  console.log("Loader data:", data);

  return (
    <>
      <BarChart data={data.dataset} />
      <Button
        // onClick={() => setDataset(generateWeeklyData())}
        variant="primary"
      >
        Randomize
      </Button>
    </>
  );
}

export default WeekView;
