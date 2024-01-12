import clsx from "clsx";
import styles from "./MenuButton.module.css";

type MenuButtonProps = {
  className?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function MenuButton({ className, isOpen, setIsOpen }: MenuButtonProps) {
  function handleClick() {
    setIsOpen(!isOpen);
  }

  const barsClasses = clsx(styles.bars, isOpen && styles.open);

  return (
    <button
      type="button"
      id={styles.burgerButton}
      aria-haspopup="menu"
      aria-label="Open menu"
      aria-expanded={isOpen}
      onClick={handleClick}
      className={className}
    >
      <div className={barsClasses}></div>
    </button>
  );
}

export default MenuButton;
