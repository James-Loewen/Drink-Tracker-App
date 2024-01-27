import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedComponent from "./components/ProtectedComponent";
import Root from "./routes/Root";
import LandingPage from "./routes/LandingPage";
import Search from "./routes/Search";
import Login from "./routes/Login";
import WeekView from "./routes/WeekView";
import MonthView from "./routes/MonthView";
import "./index.css";
import {
  getWeekStartAndEndDate,
  getMonthStartAndEndDate,
} from "./utils/datetime";
import { fetchDrinkLog } from "./api/drinkLog";
import {
  formatBarChartDataset,
  formatMonthDataset,
} from "./utils/formatDataset";
import { ModalProvider } from "./context/ModalContext";
import LogListView from "./routes/LogListView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "graph/",
    element: (
      <ProtectedComponent>
        <Root />
      </ProtectedComponent>
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
          const url = new URL(request.url);
          const weekOffset = parseInt(url.searchParams.get("w") ?? "0");
          const { startDate, endDate } = getWeekStartAndEndDate(weekOffset);
          const drinkLog = await fetchDrinkLog(startDate, endDate);
          const dataset = formatBarChartDataset(drinkLog, startDate, endDate);
          return { drinkLog, startDate, endDate, dataset };
        },
      },
      {
        path: "month/",
        element: <MonthView />,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const monthOffset = parseInt(url.searchParams.get("m") ?? "0");
          const { startDate, endDate } = getMonthStartAndEndDate(monthOffset);
          const drinkLog = await fetchDrinkLog(startDate, endDate);
          const dataset = formatMonthDataset(drinkLog, startDate, endDate);
          return { drinkLog, startDate, endDate, dataset };
        },
      },
    ],
  },
  {
    path: "drink-log/",
    element: (
      <ProtectedComponent>
        <Root />
      </ProtectedComponent>
    ),
    children: [
      {
        path: "",
        element: <LogListView />,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const monthOffset = parseInt(url.searchParams.get("m") ?? "0");
          const { startDate, endDate } = getMonthStartAndEndDate(monthOffset);
          const drinkLog = await fetchDrinkLog(startDate, endDate);
          return { drinkLog, startDate, endDate };
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
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </AuthProvider>
  </React.StrictMode>
);
