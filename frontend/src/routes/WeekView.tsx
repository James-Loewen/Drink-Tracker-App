import { useLoaderData, useNavigate } from "react-router-dom";
import type { BarDatum } from "@nivo/bar";
import BarChart from "../components/BarChart";
import { type DrinkLog } from "../api/drinkLog";
import Button from "../components/Button";
import SearchBeverageModal from "../components/modals/SearchBeverageModal";
import { useModal } from "../context/ModalContext";
import clsx from "clsx";

interface WeekViewLoaderData {
  drinkLog: DrinkLog[];
  startDate: Date;
  endDate: Date;
  dataset: BarDatum[];
}

function WeekView() {
  const { dataset, startDate, endDate } = useLoaderData() as WeekViewLoaderData;
  const { setModal } = useModal();
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
            // className="feather feather-chevron-left"
          >
            {/* <polyline points="15 18 9 12 15 6"></polyline> */}
            <polyline points="14 18 8 12 14 6"></polyline>
          </svg>
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
            className="feather feather-chevron-right"
          >
            <polyline points="10 18 16 12 10 6"></polyline>
            {/* <polyline points="9 18 15 12 9 6"></polyline> */}
          </svg>
        </button>
      </div>
      <BarChart data={dataset} />
      <Button onClick={() => setModal(<SearchBeverageModal />)}>
        Beverage Search Modal
      </Button>
    </main>
  );
}

export default WeekView;
