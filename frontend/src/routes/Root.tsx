import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import ModalManager from "../components/modals/ModalManager";
import NavTabs from "../components/NavTabs";

function Root() {
  return (
    <>
      <Header />
      <NavTabs />
      <Outlet />
      <ModalManager />
    </>
  );
}

export default Root;
