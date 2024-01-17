import { useLoaderData } from "react-router-dom";
import type { BarDatum } from "@nivo/bar";
import BarChart from "../components/BarChart";
import { type DrinkLog } from "../api/drinkLog";

interface WeekViewLoaderData {
  drinkLog: DrinkLog[];
  startDate: Date;
  endDate: Date;
  dataset: BarDatum[];
}

function WeekView() {
  const { dataset, startDate, endDate } = useLoaderData() as WeekViewLoaderData;

  return (
    <>
      <div className="p-4">
        <h1 className="font-bold font-mono text-center text-xl">
          {startDate.toLocaleDateString()} – {endDate.toLocaleDateString()}
        </h1>
      </div>
      <BarChart data={dataset} />
    </>
  );
}

export default WeekView;
