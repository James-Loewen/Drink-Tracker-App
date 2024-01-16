import { Outlet, Link } from "react-router-dom";
import Header from "../components/Header";

function Root() {
  return (
    <>
      <Header />
      <nav>
        <ul className="flex gap-8 justify-center">
          <li>
            <Link to="/graph/year">Year</Link>
          </li>
          <li>
            <Link to="/graph/month">Month</Link>
          </li>
          <li>
            <Link to="/graph/week">Week</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Root;
