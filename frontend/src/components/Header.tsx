import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import { useAuth } from "../context/AuthContext";
import MenuButton from "./MenuButton";
import styles from "./Header.module.css";
// import Button from "./Button";

function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { logout } = useAuth();
  // const navigate = useNavigate();

  // function handleNavigate(e: MouseEvent<HTMLAnchorElement>) {
  //   e.preventDefault();
  //   const anchor = e.target as HTMLAnchorElement;
  //   const { pathname, search } = new URL(anchor.href);
  //   setMenuIsOpen(false);
  //   navigate(pathname + search);
  // }

  return (
    <header className="mx-auto w-[min(100%,_800px)] h-12 relative">
      <nav className="">
        <MenuButton
          isOpen={menuIsOpen}
          setIsOpen={setMenuIsOpen}
          className="absolute right-4 top-1"
        />
        <ul
          className={clsx({
            hidden: !menuIsOpen,
            flex: menuIsOpen,
            [styles.nav]: menuIsOpen,
          })}
        >
          {/* <li>
            <a href="/graph/week" onClick={handleNavigate}>
              Settings
            </a>
          </li> */}
          <li>
            <button
              className="px-2 py-1 w-full font-display text-left decoration-2 decoration-raisin-black underline-offset-[3px] hover:underline"
              onClick={logout}
            >
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

// function Header() {
//   const { logout } = useAuth();

//   return (
//     <header className="mx-auto mb-2 p-2 w-[min(100%,_800px)] flex justify-end">
//       <Button variant="secondary" onClick={logout}>
//         Sign Out
//       </Button>
//     </header>
//   );
// }

export default Header;
