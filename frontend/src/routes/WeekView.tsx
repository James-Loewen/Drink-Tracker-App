import { useLoaderData, useNavigate } from "react-router-dom";
import type { BarDatum } from "@nivo/bar";
import BarChart from "../components/BarChart";
import { type DrinkLog } from "../api/drinkLog";
import type { Beverage } from "../api/search";
import SearchBeverageModal from "../components/modals/SearchBeverageModal";
import { useModal } from "../context/ModalContext";
import clsx from "clsx";

import BeverageCardButton from "../components/BeverageCardButton";

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
  console.log(plusIcon);

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
  const url = new URL(window.location.href);
  const weekOffset = +(url.searchParams.get("w") ?? 0);
  const navigate = useNavigate();

  const chevronClass = clsx(
    "p-2 bg-neutral-400/30 rounded-full",
    "hover:bg-neutral-400/40",
    "transition-colors"
  );

  const rightChevron = clsx(chevronClass, {
    "text-gray-600/30 hover:bg-neutral-400/30 cursor-default": weekOffset === 0,
  });

  function prevWeek() {
    url.searchParams.set("w", `${weekOffset + 1}`);
    navigate(url.pathname + url.search);
  }

  function nextWeek() {
    if (weekOffset === 0) {
      return;
    } else if (weekOffset === 1) {
      url.search = "";
    } else {
      url.searchParams.set("w", `${weekOffset - 1}`);
    }

    navigate(url.pathname + url.search);
  }

  return (
    <main className="mx-auto w-[min(800px,_100%)]">
      <div className="p-4 flex gap-2 justify-between items-center">
        <button onClick={prevWeek} className={chevronClass}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-labelledby="prev-btn"
          >
            <polyline points="14 18 8 12 14 6"></polyline>
          </svg>
          <span id="prev-btn" className="sr-only">
            Previous
          </span>
        </button>
        <h1 className="font-bold font-display text-center text-xl">
          {startDate.toLocaleDateString()} – {endDate.toLocaleDateString()}
        </h1>
        <button onClick={nextWeek} className={rightChevron}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-labelledby="next-btn"
          >
            <polyline points="10 18 16 12 10 6"></polyline>
          </svg>
          <span id="next-btn" className="sr-only text-black">
            Next
          </span>
        </button>
      </div>
      <BarChart data={dataset} />
      <button
        className="mx-auto my-4 px-2 py-1 flex gap-1 items-center bg-amber-500/50 font-display text-lg border-2 border-[#232232] rounded-lg shadow-1 hover:shadow-2 transition-shadow"
        onClick={() => openModal(<SearchBeverageModal />)}
      >
        Log Beverage <img src={plusIcon} alt="plus symbol" />
      </button>
      <RecentBeverageCards drinkLog={drinkLog} />
    </main>
  );
}

export default WeekView;
