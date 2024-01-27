import { Outlet, Link } from "react-router-dom";
import Header from "../components/Header";
import ModalManager from "../components/modals/ModalManager";

function Root() {
  const linkText = "font-display text-xl hover:underline";

  return (
    <>
      <Header />
      <nav>
        <ul className="flex gap-8 justify-center">
          <li>
            <Link className={linkText} to="/graph/week">
              Week
            </Link>
          </li>
          <li>
            <Link className={linkText} to="/graph/month">
              Month
            </Link>
          </li>
          <li>
            <Link className={linkText} to="/drink-log">
              Log
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      <ModalManager />
    </>
  );
}

export default Root;
