import { useState } from "react";

import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import MenuButton from "./MenuButton";
import clsx from "clsx";

function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const { logout } = useAuth();

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
            "h-10 gap-4 justify-center items-center": true,
            hidden: !menuIsOpen,
            flex: menuIsOpen,
          })}
        >
          <li>Week</li>
          <li>Month</li>
          <li>
            <Button variant="secondary" onClick={logout}>
              Sign Out
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
