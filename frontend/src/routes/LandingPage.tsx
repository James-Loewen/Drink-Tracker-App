import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LandingPage() {
  const { user } = useAuth();

  if (!user?.display_username) {
    return (
      <>
        <h1>Hello Landing page!</h1>
        <a className="font-medium text-blue-600 hover:underline" href="/login">
          Log In
        </a>
      </>
    );
  }

  return <Navigate to="graph/" />;
}

export default LandingPage;
