import clsx from "clsx";
import type { Beverage } from "../api/search";
import { useModal } from "../context/ModalContext";

import LogBeverageModal from "./modals/LogBeverageModal";

const colorMap: { [key: string]: string } = {
  beer: "text-teal",
  cider: "text-gold",
};

interface BeverageCardButtonProps {
  beverage: Beverage;
}

function BeverageCardButton({ beverage }: BeverageCardButtonProps) {
  const { setModal } = useModal();

  const buttonClass = clsx(
    "px-3 py-2 w-full",
    "grid grid-cols-[1fr,_9ch] gap-3 justify-items-start",
    "border-2 border-black rounded-lg",
    "shadow-1 hover:shadow-2",
    "font-display text-base sm:text-base leading-none",
    "transition-shadow"
  );

  const coloredText = `font-bold ${
    colorMap[beverage.category.category.toLowerCase()]
  }`;

  return (
    <button
      onClick={() => setModal(<LogBeverageModal beverage={beverage} />)}
      className={buttonClass}
    >
      <span className={coloredText}>{beverage.category.category}</span>
      <span className="justify-self-end">
        {beverage.abv}% <span className={coloredText}>abv</span>
      </span>
      <div className="col-span-2 flex gap-2 flex-wrap">
        <span className="text-gray-700">{beverage.name}</span>
        <span className="text-gray-700 font-bold">{beverage.brand.name}</span>
      </div>
    </button>
  );
}

export default BeverageCardButton;
