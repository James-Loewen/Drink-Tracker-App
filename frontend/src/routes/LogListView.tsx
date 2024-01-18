import { useLoaderData } from "react-router-dom";
import { type DrinkLog } from "../api/drinkLog";
import { getDatesInTimeframe } from "../utils/datetime";
import { isSameDay } from "date-fns";
import clsx from "clsx";

interface LogListDayTableProps {
  dailyLog?: DrinkLog[];
  date: Date;
}

function LogListDayTable({ dailyLog, date }: LogListDayTableProps) {
  const thClass = clsx("border border-slate-600");
  const tdClass = clsx("border border-slate-700");

  return (
    <table className="my-2 w-5/6 border-collapse border border-slate-500">
      <thead>
        <tr>
          <th className={thClass}>{date.toDateString()}</th>
        </tr>
      </thead>
      <tr>
        <td className={tdClass}>No data</td>
      </tr>
    </table>
  );
}

interface LogListViewLoaderData {
  drinkLog: DrinkLog[];
  startDate: Date;
  endDate: Date;
}

function LogListView() {
  const { drinkLog, startDate, endDate } =
    useLoaderData() as LogListViewLoaderData;
  console.log(drinkLog);
  const timeframe = getDatesInTimeframe(startDate, endDate).reverse();

  const list = timeframe.map((date) => {
    const dailyLog = drinkLog.filter((log) =>
      isSameDay(date, new Date(log.timestamp))
    );

    return <LogListDayTable dailyLog={dailyLog} date={date} />;
  });

  return (
    <>
      <h1>Log List</h1>
      {list}
    </>
  );
}

export default LogListView;
