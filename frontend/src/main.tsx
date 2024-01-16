import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// import ProtectedLayout from "./routes/ProtectedLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Root from "./routes/Root";
import LandingPage from "./routes/LandingPage";
import Search from "./routes/Search";
import Login from "./routes/Login";
import WeekView from "./routes/WeekView";
import "./index.css";
import { getDatesInTimeframe, getWeekStartAndEndDate } from "./utils/datetime";
import { fetchDrinkLog } from "./api/drinkLog";
import { isSameDay } from "date-fns";
import calculateStandardDrinks from "./utils/calculateStandardDrinks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "graph/",
    element: (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="week/" />,
      },
      {
        path: "week/",
        element: <WeekView />,
        loader: async ({ request }) => {
          // console.log(request);
          // const url = new URL(request.url);
          // const weekOffset = parseInt(url.searchParams.get("w") ?? "0");
          // console.log("week offset:", weekOffset, typeof weekOffset);
          const startTime = new Date().getTime();
          const { startDate, endDate } = getWeekStartAndEndDate(
            new Date(2024, 0, 14)
          );
          const drinkLog = await fetchDrinkLog(startDate, endDate);
          const timeframe = getDatesInTimeframe(startDate, endDate);
          const WEEKDAYS = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          const dataset = timeframe.map((date, i) => {
            const dailyLog = drinkLog.filter((log: any) =>
              isSameDay(new Date(log.timestamp), date)
            );
            const count = dailyLog.length;
            const standardDrinks = dailyLog.reduce((acc: number, log: any) => {
              return (
                acc + calculateStandardDrinks(log.volume, log.beverage.abv)
              );
            }, 0);
            return {
              day: WEEKDAYS[i],
              Containers: count,
              "Standard Drinks": standardDrinks,
            };
          });
          console.log(dataset);
          const endTime = new Date().getTime();
          console.log(
            "time ellapsed:",
            (endTime - startTime) / 1000,
            "seconds"
          );
          return { drinkLog, startDate, endDate, dataset };
        },
      },
    ],
  },
  {
    path: "search/",
    element: <Search />,
  },
  {
    path: "login/",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
