import type { BarTooltipProps, BarDatum } from "@nivo/bar";
import { clsx } from "clsx";

export interface CustomToolTipType extends BarTooltipProps<BarDatum> {
  x: number;
  y: number;
}

interface CustomToolTipProps {
  toolTipProps: CustomToolTipType;
  screenWidth: number;
  limit?: number | null;
}

function CustomToolTip({
  toolTipProps,
  screenWidth,
  limit = null,
}: CustomToolTipProps) {
  const wrapperClass = clsx(
    "relative top-2 px-2 py-1 bg-white/80 rounded-lg",
    "flex flex-col items-center justify-items-center",
    "font-display text-sm sm:text-base",
    "border-2 border-raisin-black shadow-1",
    {
      "right-[60px]": toolTipProps.x > screenWidth / 2,
      "left-[60px]": toolTipProps.x <= screenWidth / 2,
    }
  );

  const valueClass = clsx("font-bold", {
    "text-danger": limit && toolTipProps.value > limit,
  });

  return (
    <div className={wrapperClass}>
      <div className="flex gap-2 items-center">
        <svg
          width={16}
          viewBox="0 0 24 24"
          fill={toolTipProps.color}
          stroke="none"
          xmlns="http://www.w3.org/2000/svg"
          className="inline"
        >
          <circle cx="12" cy="12" r="12" />
        </svg>
        <span>{toolTipProps.id}</span>
      </div>
      <div className="flex gap-2 items-center">
        <span>{toolTipProps.indexValue}:</span>
        <span className={valueClass}>{toolTipProps.value.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default CustomToolTip;
