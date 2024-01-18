import { Outlet, Link } from "react-router-dom";
import Header from "../components/Header";
import ModalManager from "../components/modals/ModalManager";
import Button from "../components/Button";
import { useModal } from "../context/ModalContext";
import SampleModal from "../components/modals/SampleModal";
import SearchBeverageModal from "../components/modals/SearchBeverageModal";

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
            <Link to="/graph/week/?w=1">Month</Link>
          </li>
          <li>
            <Link to="/graph/week">Week</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      <Button onClick={() => setModal(<SampleModal />)}>Sample Modal</Button>
      <Button onClick={() => setModal(<SearchBeverageModal />)}>
        Beverage Search Modal
      </Button>
      <ModalManager />
    </>
  );
}

export default Root;
