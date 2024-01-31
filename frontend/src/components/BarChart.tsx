import { ResponsiveBar, type BarDatum } from "@nivo/bar";
import { clsx } from "clsx";
import { CartesianMarkerProps, DatumValue } from "@nivo/core";

import useWindowDimensions from "../hooks/useWindowDimensions";
import type { CustomToolTipType } from "./CustomToolTip";

import BarChartAxisBottomTick from "./BarChartAxisBottomTick";
import CustomToolTip from "./CustomToolTip";

// @ts-ignore
const STUFF_THAT_IS_DIFFERENT = [
  "tickValues",
  "data prop",
  "indexBy",
  "valueScale.max (tickValues)",
  "markers (standardDrinkLimit)",
  "axisBottom.renderTick (<BarChartAxisBottomTick />)",
  "axisLeft.tickValues",
];

type BarChartProps = {
  data: BarDatum[];
  indexBy: string;
  tickValues?: number[] | undefined;
  indexLimit?: number | null;
  chartLimit?: number | null;
  truncFn?: (value: string) => string;
};

function BarChart({
  data,
  tickValues = undefined,
  indexBy,
  indexLimit = null,
  chartLimit = null,
  truncFn,
}: BarChartProps) {
  const { width } = useWindowDimensions();

  const maxValue = tickValues ? tickValues[tickValues.length - 1] : undefined;

  const containerCount = data.reduce(
    (sum, index) => sum + +index.Containers,
    0
  );
  const standardDrinkCount = +data
    .reduce((sum, index) => sum + +index["Standard Drinks"], 0)
    .toFixed(2);

  const marker: CartesianMarkerProps<DatumValue>[] | undefined =
    indexLimit !== null
      ? [
          {
            axis: "y",
            value: indexLimit,
            lineStyle: {
              stroke: "rgba(100, 0, 30, .35)",
              strokeWidth: 2,
              strokeDasharray: "8",
            },
          },
        ]
      : undefined;

  const legendTextClass =
    "flex gap-2 items-center font-display sm:text-base md:text-lg transition";

  return (
    <>
      <div className="w-full h-[350px]">
        <ResponsiveBar
          data={data}
          keys={["Containers", "Standard Drinks"]}
          indexBy={indexBy}
          margin={{ top: 50, right: 20, bottom: 50, left: 25 }}
          padding={0.2}
          innerPadding={width > 600 ? 6 : 2}
          valueScale={{
            type: "linear",
            min: 0,
            max: maxValue,
          }}
          indexScale={{ type: "band", round: true }}
          // colors={["rgba(33, 106, 111, .85)", "rgba(218, 165, 32, .85)"]}
          colors={["rgba(33, 106, 90, .85)", "rgba(218, 165, 32, .85)"]}
          borderRadius={2}
          markers={marker}
          groupMode="grouped"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            renderTick: (props) => (
              <BarChartAxisBottomTick
                screenWidth={width}
                truncFn={truncFn}
                {...props}
              />
            ),
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            tickValues,
          }}
          /**
           * TODO: Figure out how to get TypeScript to not complain about this
           */
          // @ts-ignore
          tooltip={(toolTipProps: CustomToolTipType) => (
            <CustomToolTip
              toolTipProps={toolTipProps}
              screenWidth={width}
              limit={indexLimit}
            />
          )}
          label={""}
          theme={{
            text: { fontSize: 16, fontFamily: "monospace" },
          }}
          role="application"
          ariaLabel="Nivo bar chart demo"
        />
      </div>
      <div className="mt-3 mb-6 px-4 flex gap-x-6 flex-wrap justify-center text-black">
        <span
          className={clsx(
            legendTextClass,
            chartLimit && containerCount > chartLimit && "text-danger"
          )}
        >
          <svg
            width={16}
            viewBox="0 0 24 24"
            fill="rgba(33, 106, 90, .85)"
            stroke="none"
            xmlns="http://www.w3.org/2000/svg"
            className="inline"
          >
            <circle cx="12" cy="12" r="12" />
          </svg>
          Containers: {containerCount}
        </span>
        <span
          className={clsx(
            legendTextClass,
            chartLimit && standardDrinkCount > chartLimit && "text-danger"
          )}
        >
          <svg
            width={16}
            viewBox="0 0 24 24"
            fill="rgba(218, 165, 32, .85)"
            stroke="none"
            xmlns="http://www.w3.org/2000/svg"
            className="inline"
          >
            <circle cx="12" cy="12" r="12" />
          </svg>
          Standard Drinks: {standardDrinkCount}
        </span>
      </div>
    </>
  );
}

export default BarChart;
