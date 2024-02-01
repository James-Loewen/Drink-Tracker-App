import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LandingPage() {
  const { user } = useAuth();

  if (!user?.display_username) {
    return (
      <main className="mx-auto mt-[30vh] w-[min(95%,_720px)]">
        <h1 className="font-display font-bold text-4xl">Drink Tracker</h1>
        <p className="mt-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, at ex
          commodi totam, necessitatibus eaque iure laboriosam temporibus in
          maiores reiciendis ullam. Ex incidunt reprehenderit ipsa earum
          necessitatibus accusantium sapiente.
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
            href="/login"
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
