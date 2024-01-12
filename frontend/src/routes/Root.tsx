import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function Root() {
  return (
    <>
      <Header />
      <nav>
        <ul className="flex gap-8 justify-center">
          <li>Year</li>
          <li>Month</li>
          <li>Week</li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Root;
