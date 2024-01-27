import { Link, useLoaderData } from "react-router-dom";
import type { BarDatum } from "@nivo/bar";
import { addWeeks, differenceInWeeks, format } from "date-fns";

import type { DrinkLog } from "../api/drinkLog";
import { useModal } from "../context/ModalContext";
import generateAxisTicks from "../utils/generateAxisTicks";

import BarChart from "../components/BarChart";
import BarChartHeader from "../components/BarChartHeader";
import SearchBeverageModal from "../components/modals/SearchBeverageModal";

import plusIcon from "../assets/plus.svg";

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
          className="w-full border-2 border-black rounded-lg bg-slate-200 shadow-1 hover:shadow-2 font-display text-lg sm:text-xl leading-none transition-shadow"
        >
          <Link
            to={`/graph/week?w=${differenceInWeeks(
              today,
              new Date(week.weekStart)
            )}`}
            className="block px-3 py-2"
          >
            Go to: <span className="pl-2 font-mono">{week.day}</span>
          </Link>
        </li>
      );
    }
  });

  return (
    <div className="mx-auto p-2 max-w-[500px]">
      <h2 className="pl-2 py-3 font-display font-bold text-lg">Go to Week</h2>
      <ul className="flex flex-col gap-2">{linkList.reverse()}</ul>
    </div>
  );
}

function MonthView() {
  const { dataset, startDate } = useLoaderData() as MonthViewLoaderData;
  const { openModal } = useModal();

  return (
    <main className="mx-auto w-[min(800px,_100%)]">
      <BarChartHeader
        title={format(addWeeks(startDate, 1), "LLLL yyyy")}
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
      <button
        className="mx-auto my-4 px-3 py-2 flex gap-1 items-center bg-amber-500/50 font-display text-xl border-2 border-[#232232] rounded-lg shadow-1 hover:shadow-2 transition-shadow"
        onClick={() => openModal(<SearchBeverageModal />)}
      >
        Log Beverage <img src={plusIcon} alt="plus symbol" />
      </button>
      <WeekLinks dataset={dataset} />
    </main>
  );
}

export default MonthView;
