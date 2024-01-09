import MenuButton from "./MenuButton";

function Header() {
  return (
    <header className="relative">
      <nav className="">
        <ul className="h-10 flex gap-4 justify-center items-center">
          <li>Week</li>
          <li>Month</li>
          <li>Year</li>
        </ul>
      </nav>
      <MenuButton className="absolute right-4 top-1" />
    </header>
  );
}

export default Header;
