import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedComponent({ children }: ProtectedRouteProps) {
  const { user } = useAuth();
  console.log("Protected Route rendering");

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedComponent;
