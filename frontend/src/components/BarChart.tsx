import { ResponsiveBar, type BarDatum } from "@nivo/bar";
import { clsx } from "clsx";

import useWindowDimensions from "../hooks/useWindowDimensions";
import BarChartAxisBottomTick from "./BarChartAxisBottomTick";
import generateAxisTicks from "../utils/generateAxisTicks";

type BarChartProps = {
  data: BarDatum[];
};

function BarChart({ data }: BarChartProps) {
  const { width } = useWindowDimensions();

  const tickValues = generateAxisTicks(data);
  const containerCount = data.reduce((sum, day) => sum + +day.Containers, 0);
  const standardDrinkCount = +data
    .reduce((sum, day) => sum + +day["Standard Drinks"], 0)
    .toFixed(2);

  const legendTextClass =
    "flex gap-2 items-center font-mono sm:text-lg md:text-xl transition";

  return (
    <>
      <div className="w-full h-[350px]">
        <ResponsiveBar
          data={data}
          keys={["Containers", "Standard Drinks"]}
          indexBy="day"
          margin={{ top: 50, right: 20, bottom: 50, left: 25 }}
          padding={0.2}
          innerPadding={width > 600 ? 6 : 2}
          valueScale={{
            type: "linear",
            min: 0,
            max: tickValues[tickValues.length - 1],
          }}
          indexScale={{ type: "band", round: true }}
          // colors={["rgba(33, 106, 111, .85)", "rgba(218, 165, 32, .85)"]}
          colors={["rgba(33, 106, 90, .85)", "rgba(218, 165, 32, .85)"]}
          borderRadius={2}
          markers={[
            {
              axis: "y",
              value: 4,
              lineStyle: {
                stroke: "rgba(100, 0, 30, .35)",
                strokeWidth: 2,
                strokeDasharray: "8",
              },
            },
          ]}
          groupMode="grouped"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            renderTick: (props) => (
              <BarChartAxisBottomTick screenWidth={width} {...props} />
            ),
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            tickValues: tickValues,
          }}
          label={""}
          theme={{
            text: { fontSize: 16, fontFamily: "monospace" },
          }}
          // legends={[
          //   {
          //     dataFrom: "keys",
          //     anchor: "bottom",
          //     direction: "row",
          //     justify: false,
          //     translateX: -20,
          //     translateY: 65,
          //     itemsSpacing: 40,
          //     itemWidth: 100,
          //     itemHeight: 20,
          //     itemDirection: "left-to-right",
          //     itemOpacity: 0.85,
          //     symbolSize: 15,
          //     symbolShape: "circle",
          //   },
          // ]}
          role="application"
          ariaLabel="Nivo bar chart demo"
          // barAriaLabel={(e) =>
          //   e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          // }
        />
      </div>
      <div className="mb-6 px-4 flex gap-x-6 flex-wrap justify-center text-slate-600">
        <span
          className={clsx(
            legendTextClass,
            containerCount > 14 && "text-danger"
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
            standardDrinkCount > 14 && "text-danger"
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
