import clsx from "clsx";
import type { Brand } from "../api/search";
import { useModal } from "../context/ModalContext";

import CreateBeverageModal from "./modals/CreateBeverageModal";

interface BrandCardButtonProps {
  brand: Brand;
}

function BrandCardButton({ brand }: BrandCardButtonProps) {
  const { openModal } = useModal();

  const buttonClass = clsx(
    "px-3 py-2 w-full",
    "grid grid-cols-[1fr,_9ch] gap-3 justify-items-start",
    "border-2 border-black rounded-lg",
    "shadow-1 hover:shadow-2",
    "font-display text-base sm:text-base leading-none",
    "transition-shadow"
  );

  function handleClick() {
    openModal(<CreateBeverageModal brand={brand} />);
  }

  return (
    <button onClick={handleClick} className={buttonClass}>
      <span className="font-bold text-gray-700">{brand.name}</span>
    </button>
  );
}

export default BrandCardButton;
