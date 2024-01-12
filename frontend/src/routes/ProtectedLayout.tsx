import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
}

export default ProtectedLayout;
