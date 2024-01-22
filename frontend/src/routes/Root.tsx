import { Outlet, Link } from "react-router-dom";
import Header from "../components/Header";
import ModalManager from "../components/modals/ModalManager";

function Root() {
  return (
    <>
      <Header />
      <nav>
        <ul className="flex gap-8 justify-center">
          <li>
            <Link to="/drink-log">Year</Link>
          </li>
          <li>
            <Link to="/graph/week/?w=1">Month</Link>
          </li>
          <li>
            <Link to="/graph/week">Week</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      <ModalManager />
    </>
  );
}

export default Root;
