import { Outlet, Link } from "react-router-dom";
import Header from "../components/Header";
import ModalManager from "../components/ModalManager";
import Button from "../components/Button";
import { useModal } from "../context/ModalContext";

function Root() {
  const { setModal } = useModal();

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
      <Button onClick={() => setModal("sampleModal")}>Uh... modal</Button>
      <ModalManager />
    </>
  );
}

export default Root;
