import { useLoaderData } from "react-router-dom";
import { getDatesInTimeframe, toTimeString } from "../utils/datetime";
import { isSameDay } from "date-fns";
import clsx from "clsx";
import { type DrinkLog } from "../api/drinkLog";
import { millilitersToOunces } from "../utils/convertVolume";
import EditIcon from "../components/svg/EditIcon";
import TrashIcon from "../components/svg/TrashIcon";

interface LogListDayTableProps {
  dailyLog: DrinkLog[];
  date: Date;
}

function LogListDayTable({ dailyLog, date }: LogListDayTableProps) {
  const thClass = clsx(
    "py-2 border-slate-600/20 bg-blue-900/15 font-display text-sm sm:text-base"
  );

  const dailyList = dailyLog.map((log, i) => {
    const tdClass = clsx("px-2 py-1 border-slate-700/20 text-sm sm:text-base", {
      "bg-neutral-700/15": i % 2 !== 0,
      "bg-neutral-300/20": i % 2 === 0,
    });

    return (
      <tr>
        <td className={tdClass}>{log.beverage.name}</td>
        {/* <td className={tdClass}>{log.beverage.abv}%</td> */}
        <td className={clsx(tdClass, "whitespace-nowrap")}>
          {millilitersToOunces(+log.volume)} oz.
        </td>
        <td className={clsx(tdClass, "whitespace-nowrap")}>
          {toTimeString(new Date(log.timestamp))}
        </td>
        <td className={tdClass}>
          <button className="p-2" onClick={() => alert(`Edit log #${log.id}`)}>
            <EditIcon />
          </button>
        </td>
        <td className={tdClass}>
          <button
            className="p-2"
            onClick={() => alert(`Delete log #${log.id}`)}
          >
            <TrashIcon />
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
            className="px-2 py-3 font-mono font-bold text-neutral-500"
            colSpan={6}
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
}

function LogListView() {
  const { drinkLog, startDate } = useLoaderData() as LogListViewLoaderData;
  const timeframe = getDatesInTimeframe(startDate, new Date()).reverse();

  const list = timeframe.map((date) => {
    const dailyLog = drinkLog.filter((log) =>
      isSameDay(date, new Date(log.timestamp))
    );

    return <LogListDayTable dailyLog={dailyLog} date={date} />;
  });

  return (
    <main className="">
      <h1>Log List</h1>
      <table className="mx-auto my-2 w-[min(720px,_90%)] border-collapse border border-slate-500/20">
        <thead>
          <tr className="font-display">
            <th>Beer</th>
            {/* <th>Abv</th> */}
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
