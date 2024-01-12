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
