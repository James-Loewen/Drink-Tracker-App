import { useState } from "react";
import clsx from "clsx";
import styles from "./MenuButton.module.css";

type MenuButtonProps = {
  className?: string;
};

function MenuButton({ className }: MenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log(e.target);
    setIsOpen(!isOpen);
  }

  const barsClasses = clsx(styles.bars, isOpen && styles.open);

  return (
    <button
      type="button"
      id={styles.burgerButton}
      aria-haspopup="menu"
      aria-label="Open menu"
      aria-expanded="false"
      onClick={handleClick}
      className={className}
    >
      <div className={barsClasses}></div>
    </button>
  );
}

export default MenuButton;
