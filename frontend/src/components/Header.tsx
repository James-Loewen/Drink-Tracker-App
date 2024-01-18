import { type MouseEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";

import { useAuth } from "../context/AuthContext";
import MenuButton from "./MenuButton";
import styles from "./Header.module.css";

function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleNavigate(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const anchor = e.target as HTMLAnchorElement;
    const { pathname, search } = new URL(anchor.href);
    setMenuIsOpen(false);
    navigate(pathname + search);
  }

  return (
    <header className="h-12 relative border border-[coral]">
      <nav className="">
        <MenuButton
          isOpen={menuIsOpen}
          setIsOpen={setMenuIsOpen}
          className="absolute right-4 top-1"
        />
        <ul
          className={clsx({
            // "h-10 gap-4 justify-center items-center": true,
            hidden: !menuIsOpen,
            flex: menuIsOpen,
            [styles.nav]: menuIsOpen,
          })}
        >
          <li>
            <a href="/graph/week" onClick={handleNavigate}>
              Settings
            </a>
          </li>
          <li>
            <button className="" onClick={logout}>
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
