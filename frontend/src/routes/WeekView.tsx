import { useLoaderData } from "react-router-dom";
import type { BarDatum } from "@nivo/bar";

import type { DrinkLog } from "../api/drinkLog";
import type { Beverage } from "../api/search";
import { toDateString } from "../utils/datetime";
import generateAxisTicks from "../utils/generateAxisTicks";

import BarChart from "../components/BarChart";
import BeverageCardButton from "../components/BeverageCardButton";
import TimeframePicker from "../components/TimeframePicker";
import LogBeverageButton from "../components/LogBeverageButton";

interface WeekViewLoaderData {
  drinkLog: DrinkLog[];
  startDate: Date;
  endDate: Date;
  dataset: BarDatum[];
}

interface RecentBeverageCardsProps {
  drinkLog: DrinkLog[];
}

function RecentBeverageCards({ drinkLog }: RecentBeverageCardsProps) {
  const uniqueBeveragesSet: Set<string> = new Set();
  const nonRepeatingBeverages: Beverage[] = [];

  for (const obj of drinkLog) {
    const beverageName = obj.beverage.name;
    if (!uniqueBeveragesSet.has(beverageName)) {
      uniqueBeveragesSet.add(beverageName);
      nonRepeatingBeverages.push(obj.beverage);
    }
  }

  const beverageList = nonRepeatingBeverages.map((bev) => {
    return (
      <li>
        <BeverageCardButton key={bev.id} beverage={bev} />
      </li>
    );
  });

  if (beverageList.length > 0) {
    return (
      <div className="mx-auto mb-4 w-[min(90%,_600px)]">
        <h2 className="pl-3 pb-2 font-display font-bold text-lg sm:text-xl">
          Recent Beverages:
        </h2>
        <ul className="flex flex-col gap-3">{beverageList}</ul>
      </div>
    );
  }
}

function WeekView() {
  const { drinkLog, dataset, startDate, endDate } =
    useLoaderData() as WeekViewLoaderData;

  return (
    <main className="mx-auto w-[min(800px,_100%)]">
      <TimeframePicker
        title={`${toDateString(startDate)} – ${toDateString(endDate)}`}
        offsetParam="w"
      />
      <BarChart
        data={dataset}
        indexBy="day"
        tickValues={generateAxisTicks(dataset)}
        indexLimit={4}
        chartLimit={14}
        truncFn={(v) => v.slice(0, 3)}
      />
      <LogBeverageButton />
      <RecentBeverageCards drinkLog={drinkLog} />
    </main>
  );
}

export default WeekView;
