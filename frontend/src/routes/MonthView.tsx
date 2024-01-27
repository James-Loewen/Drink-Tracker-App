import { Link, useLoaderData } from "react-router-dom";
import type { BarDatum } from "@nivo/bar";
import { addWeeks, differenceInWeeks, format } from "date-fns";

import type { DrinkLog } from "../api/drinkLog";
import generateAxisTicks from "../utils/generateAxisTicks";

import BarChart from "../components/BarChart";
import TimeframePicker from "../components/TimeframePicker";
import LogBeverageButton from "../components/LogBeverageButton";

interface MonthViewLoaderData {
  drinkLog: DrinkLog[];
  startDate: Date;
  endDate: Date;
  dataset: BarDatum[];
}

interface WeekLinksProps {
  dataset: BarDatum[];
}

function WeekLinks({ dataset }: WeekLinksProps) {
  const today = new Date();

  const linkList = dataset.map((week, i) => {
    if (new Date(week.weekStart) <= today) {
      return (
        <li
          key={i}
          className="border-2 border-black rounded-lg bg-slate-400/20 shadow-1 hover:shadow-2 font-display text-lg sm:text-xl leading-none transition-shadow"
        >
          <Link
            to={`/graph/week?w=${differenceInWeeks(
              today,
              new Date(week.weekStart)
            )}`}
            className="block px-3 py-2"
          >
            Week <span className="pl-2 font-mono">{week.day}</span>
          </Link>
        </li>
      );
    }
  });

  return (
    <div className="mx-auto w-[min(90%,_400px)]">
      <h2 className="pl-3 pb-2 font-display font-bold text-lg sm:text-xl">
        Go to:
      </h2>
      <ul className="flex flex-col gap-2">{linkList.reverse()}</ul>
    </div>
  );
}

function MonthView() {
  const { dataset, startDate } = useLoaderData() as MonthViewLoaderData;

  return (
    <main className="mx-auto mb-4 w-[min(800px,_100%)]">
      <TimeframePicker
        title={format(addWeeks(startDate, 1), "LLLL, yyyy")}
        offsetParam="m"
      />
      <BarChart
        data={dataset}
        indexBy="day"
        indexLimit={14}
        chartLimit={dataset.length * 14}
        tickValues={generateAxisTicks(dataset, 5)}
        truncFn={(v) => v.split(" ")[0] + "..."}
      />
      <LogBeverageButton />
      <WeekLinks dataset={dataset} />
    </main>
  );
}

export default MonthView;
