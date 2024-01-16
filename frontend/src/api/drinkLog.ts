import { authFetch } from "./auth";
import { toCustomIsoFormat } from "../utils/datetime";
// import calculateStandardDrinks from "../utils/calculateStandardDrinks";
import type { Beverage } from "./search";

// type Timeframe = "week" | "month" | "year";

export interface DrinkLog {
  timestamp: string;
  volume: string;
  beverage: Beverage;
}

export async function fetchDrinkLog(startDate: Date, endDate: Date) {
  const startDateString = toCustomIsoFormat(startDate, "start");
  const endDateString = toCustomIsoFormat(endDate, "end");
  const drinkLogUrl = new URL("http://localhost:8000/drink-log/");
  const searchParams = new URLSearchParams({
    startDate: startDateString,
    endDate: endDateString,
  });
  drinkLogUrl.search = searchParams.toString();
  const res = await authFetch(drinkLogUrl, { credentials: "include" });
  const data: DrinkLog[] = await res.json();
  // console.log(data);
  return data;
}
