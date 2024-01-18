import { Outlet, Link } from "react-router-dom";
import Header from "../components/Header";
import ModalManager from "../components/modals/ModalManager";
import Button from "../components/Button";
import { useModal } from "../context/ModalContext";
import SearchBeverageModal from "../components/modals/SearchBeverageModal";

function Root() {
  const { setModal } = useModal();

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
      <Button onClick={() => setModal(<SearchBeverageModal />)}>
        Beverage Search Modal
      </Button>
      <ModalManager />
    </>
  );
}

export default Root;
