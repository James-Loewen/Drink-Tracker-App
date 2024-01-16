import { getDatesInTimeframe } from "./datetime";

function formatDataset(data: any[], startDate: Date, endDate: Date) {
  const timeframe = getDatesInTimeframe(startDate, endDate);

  const dataset = timeframe.map((date) => {});
}

export default formatDataset;
