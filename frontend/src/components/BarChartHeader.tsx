import { useNavigate } from "react-router-dom";
import clsx from "clsx";

interface BarChartHeaderProps {
  title: string;
  offsetParam: string;
}

function BarChartHeader({ title, offsetParam }: BarChartHeaderProps) {
  const url = new URL(window.location.href);
  const offset = +(url.searchParams.get(offsetParam) ?? 0);
  const navigate = useNavigate();

  const chevronBase = "p-2 bg-slate-400/30 rounded-[50%] transition-colors";

  const leftChevron = clsx(chevronBase, "hover:bg-slate-400/40");

  const rightChevron = clsx(chevronBase, {
    "text-neutral-400/80 cursor-default": offset === 0,
    "hover:bg-slate-400/40": offset !== 0,
  });

  function prevWeek() {
    url.searchParams.set(offsetParam, `${offset + 1}`);
    navigate(url.pathname + url.search);
  }

  function nextWeek() {
    if (offset === 0) {
      return;
    } else if (offset === 1) {
      url.search = "";
    } else {
      url.searchParams.set(offsetParam, `${offset - 1}`);
    }

    navigate(url.pathname + url.search);
  }

  return (
    <div className="p-4 flex gap-2 justify-between items-center">
      <button onClick={prevWeek} className={leftChevron}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-labelledby="prev-btn"
        >
          <polyline points="14 18 8 12 14 6"></polyline>
        </svg>
        <span id="prev-btn" className="sr-only">
          Previous
        </span>
      </button>
      <h1 className="font-bold font-display text-center text-xl">{title}</h1>
      <button onClick={nextWeek} className={rightChevron}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-labelledby="next-btn"
        >
          <polyline points="10 18 16 12 10 6"></polyline>
        </svg>
        <span id="next-btn" className="sr-only text-black">
          Next
        </span>
      </button>
    </div>
  );
}

export default BarChartHeader;
