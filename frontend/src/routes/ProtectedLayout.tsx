import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedComponent";

function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
}

export default ProtectedLayout;
