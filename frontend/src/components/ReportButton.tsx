import type { MouseEvent } from "react";

import flagIcon from "../assets/flag.svg";

interface ReportButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

function ReportButton({ onClick }: ReportButtonProps) {
  return (
    <button
      title="Report"
      className="absolute top-1 right-10 p-1 rounded-[50%] hover:scale-90 hover:bg-red-800/20 transition"
      onClick={onClick}
    >
      <img src={flagIcon} alt="Flag Icon" />
      <span className="sr-only">Report</span>
    </button>
  );
}

export default ReportButton;
