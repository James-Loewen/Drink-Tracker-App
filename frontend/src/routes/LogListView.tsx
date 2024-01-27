import { useLoaderData } from "react-router-dom";
import { format, isSameDay } from "date-fns";
import clsx from "clsx";

import { getDatesInTimeframe, toTimeString } from "../utils/datetime";
import type { DrinkLog } from "../api/drinkLog";
import { millilitersToOunces } from "../utils/convertVolume";
import { useModal } from "../context/ModalContext";

import TimeframePicker from "../components/TimeframePicker";
import DeleteLogModal from "../components/modals/DeleteLogModal";
import EditLogModal from "../components/modals/EditLogModal";

interface LogListDayTableProps {
  dailyLog: DrinkLog[];
  date: Date;
}

function LogListDayTable({ dailyLog, date }: LogListDayTableProps) {
  const { openModal } = useModal();

  const thClass =
    "py-3 border-slate-600/20 bg-blue-900/15 font-display text-sm sm:text-base";

  const dailyList = dailyLog.map((log, i) => {
    const tdClass = clsx(
      "px-1 py-2 border-slate-700/20 text-[#232232] text-sm sm:text-base",
      {
        "bg-neutral-700/15": i % 2 !== 0,
        "bg-neutral-300/20": i % 2 === 0,
      }
    );

    return (
      <tr>
        <td className={clsx(tdClass, "pr-3 pl-2")}>{log.beverage.name}</td>
        <td className={clsx(tdClass, "whitespace-nowrap")}>
          {millilitersToOunces(log.volume)} oz.
        </td>
        <td className={clsx(tdClass, "whitespace-nowrap")}>
          {toTimeString(new Date(log.timestamp))}
        </td>
        <td className={tdClass}>
          <button
            className="p-2"
            onClick={() => openModal(<EditLogModal drinkLog={log} />)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
        </td>
        <td className={tdClass}>
          <button
            className="p-2"
            onClick={() => openModal(<DeleteLogModal drinkLog={log} />)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            <span className="sr-only">Delete button</span>
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <tr>
        <th className={thClass} colSpan={6}>
          {date.toDateString()}
        </th>
      </tr>
      {dailyList.length > 0 ? (
        dailyList
      ) : (
        <tr>
          <td
            className="px-2 py-3 font-mono font-bold text-neutral-500 text-center"
            colSpan={5}
          >
            No data
          </td>
        </tr>
      )}
    </>
  );
}

interface LogListViewLoaderData {
  drinkLog: DrinkLog[];
  startDate: Date;
  endDate: Date;
  monthOffset: number;
}

function LogListView() {
  const { drinkLog, startDate, endDate, monthOffset } =
    useLoaderData() as LogListViewLoaderData;

  let timeframe: Date[];
  if (monthOffset > 0) {
    timeframe = getDatesInTimeframe(startDate, endDate).reverse();
  } else {
    timeframe = getDatesInTimeframe(startDate, new Date()).reverse();
  }

  const list = timeframe.map((date) => {
    const dailyLog = drinkLog.filter((log) =>
      isSameDay(date, new Date(log.timestamp))
    );

    return <LogListDayTable dailyLog={dailyLog} date={date} />;
  });

  return (
    <main className="">
      <TimeframePicker
        title={format(startDate, "LLLL, yyyy")}
        offsetParam="m"
      />
      <table className="mx-auto my-4 w-[min(720px,_95%)] border-collapse border border-slate-500/20">
        <thead>
          <tr className="sr-only">
            <th>Beer</th>
            <th>Vol</th>
            <th>Time</th>
          </tr>
        </thead>
        {list}
      </table>
    </main>
  );
}

export default LogListView;
