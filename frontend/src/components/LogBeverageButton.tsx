import { useModal } from "../context/ModalContext";

import SearchBeverageModal from "./modals/SearchBeverageModal";

function LogBeverageButton() {
  const { openModal } = useModal();

  return (
    <button
      className="group mx-auto my-6 sm:my-8 px-3 py-2 flex gap-1 items-center bg-amber-500/50 font-display text-xl border-2 border-[#232232] rounded-lg shadow-1 hover:shadow-2 transition-shadow"
      onClick={() => openModal(<SearchBeverageModal />)}
    >
      Log Beverage{" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        className="group-hover:animate-pulse"
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
  );
}

export default LogBeverageButton;
