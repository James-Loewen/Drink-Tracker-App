import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LandingPage() {
  const { user } = useAuth();

  if (!user?.display_username) {
    return (
      <main className="mx-auto mt-[30vh] w-[min(95%,_720px)]">
        <h1 className="font-display font-bold text-4xl">Drink Tracker</h1>
        <p className="mt-4">
          Search from a database of over 10,000 beverages and brands (don't
          sweat the spelling).
        </p>
        <p className="mt-4">
          Easily record your drinks when you have them and view real-time charts
          that calculate standard drinks for you.
        </p>
        <p className="mt-4 text-slate-700">
          <i>
            This application is actively being developed. You may encounter
            minor bugs or less-than-lovely pages in the meantime.
          </i>
        </p>
        <div className="mt-8 w-full flex justify-center items-center font-display font-bold">
          <a
            className="block px-2 py-1 text-blue-600 hover:underline"
            href="/login"
          >
            Log In
          </a>
          <span className="text-slate-600">or</span>
          <a
            className="block px-2 py-1 text-blue-600 hover:underline"
            href="/register"
          >
            Sign Up
          </a>
        </div>
      </main>
    );
  }

  return <Navigate to="graph/" />;
}

export default LandingPage;
