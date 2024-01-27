import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./NavTabs.module.css";

type NavPaths = "week" | "month" | "drink-log";

function NavTabs() {
  const [navPath, setNavPath] = useState<NavPaths | null>(null);

  const linkText = "font-display text-xl";

  /**
   * I'm not the most happy with this method of getting/setting
   * the initial navPath state, but it works for now.
   */
  useEffect(() => {
    const currPath = window.location.pathname
      .split("/")
      .filter((s) => s !== "");
    setNavPath(currPath[currPath.length - 1] as NavPaths);
  }, []);

  function handleNavPath(path: NavPaths) {
    function inner() {
      console.log("Path:", path);
      setNavPath(path);
    }
    return inner;
  }

  return (
    <nav>
      <ul className="flex gap-8 justify-center">
        <li>
          <Link
            className={clsx({
              [linkText]: true,
              [styles.inactive]: navPath !== "week",
              [styles.active]: navPath === "week",
            })}
            to="/graph/week"
            onClick={handleNavPath("week")}
          >
            Week
          </Link>
        </li>
        <li>
          <Link
            className={clsx({
              [linkText]: true,
              [styles.inactive]: navPath !== "month",
              [styles.active]: navPath === "month",
            })}
            to="/graph/month"
            onClick={handleNavPath("month")}
          >
            Month
          </Link>
        </li>
        <li>
          <Link
            className={clsx({
              [linkText]: true,
              [styles.inactive]: navPath !== "drink-log",
              [styles.active]: navPath === "drink-log",
            })}
            to="/drink-log"
            onClick={handleNavPath("drink-log")}
          >
            Log
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavTabs;
