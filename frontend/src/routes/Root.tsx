import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function Root() {
  return (
    <>
      <Header />
      <h1>Root to boot</h1>
      <Outlet />
    </>
  );
}

export default Root;
