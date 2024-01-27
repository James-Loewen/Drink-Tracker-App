import { useLoaderData } from "react-router-dom";
import type { BarDatum } from "@nivo/bar";

import type { DrinkLog } from "../api/drinkLog";
import type { Beverage } from "../api/search";
import { useModal } from "../context/ModalContext";
import { toDateString } from "../utils/datetime";
import generateAxisTicks from "../utils/generateAxisTicks";

import BarChart from "../components/BarChart";
import BeverageCardButton from "../components/BeverageCardButton";
import SearchBeverageModal from "../components/modals/SearchBeverageModal";
import BarChartHeader from "../components/BarChartHeader";

import plusIcon from "../assets/plus.svg";

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
      <div className="mx-auto mb-8 px-2 w-[min(100%,_600px)]">
        <h2 className="pl-2 py-3 font-display font-bold text-lg">
          Log it again?
        </h2>
        <ul className="flex flex-col gap-2">{beverageList}</ul>
      </div>
    );
  }
}

function WeekView() {
  const { drinkLog, dataset, startDate, endDate } =
    useLoaderData() as WeekViewLoaderData;
  const { openModal } = useModal();

  return (
    <main className="mx-auto w-[min(800px,_100%)]">
      <BarChartHeader
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
      <button
        className="mx-auto my-4 px-3 py-2 flex gap-1 items-center bg-amber-500/50 font-display text-xl border-2 border-[#232232] rounded-lg shadow-1 hover:shadow-2 transition-shadow"
        onClick={() => openModal(<SearchBeverageModal />)}
      >
        Log Beverage <img src={plusIcon} alt="plus symbol" />
      </button>
      <RecentBeverageCards drinkLog={drinkLog} />
    </main>
  );
}

export default WeekView;
