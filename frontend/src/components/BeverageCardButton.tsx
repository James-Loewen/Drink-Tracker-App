import clsx from "clsx";

import type { Beverage } from "../api/search";
import { useModal } from "../context/ModalContext";

import LogBeverageModal from "./modals/LogBeverageModal";

const colorMap: { [key: string]: string } = {
  beer: "text-teal",
  cider: "text-gold-800",
};

interface BeverageCardButtonProps {
  beverage: Beverage;
}

function BeverageCardButton({ beverage }: BeverageCardButtonProps) {
  const { openModal } = useModal();

  const buttonClass = clsx(
    "px-3 py-2 w-full",
    "grid grid-cols-[1fr,_9ch] gap-2 justify-items-start",
    "border-2 border-raisin-black rounded-lg",
    "shadow-1 hover:shadow-2",
    "font-display text-base sm:text-lg leading-none",
    "transition-shadow"
  );

  const coloredText = `font-bold ${
    colorMap[beverage.category.category.toLowerCase()]
  }`;

  function handleClick() {
    openModal(<LogBeverageModal beverage={beverage} />);
  }

  return (
    <button onClick={handleClick} className={buttonClass}>
      <span className={coloredText}>{beverage.category.category}</span>
      <span className="justify-self-end">
        {beverage.abv}% <span className={coloredText}>abv</span>
      </span>
      <div className="col-span-2 flex flex-col gap-2 text-left leading-4">
        <span className="text-gray-700">{beverage.brand.name}</span>
        <span className="text-gray-700 font-bold">{beverage.name}</span>
      </div>
    </button>
  );
}

export default BeverageCardButton;
