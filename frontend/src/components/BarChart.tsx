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
  // console.log(data);

  const tickValues = generateAxisTicks(data);
  const containerCount = data.reduce((sum, day) => sum + +day.Containers, 0);
  const standardDrinkCount = data
    .reduce((sum, day) => sum + +day["Standard Drinks"], 0)
    .toFixed(2);

  return (
    <>
      <div className="w-full h-[350px]">
        <ResponsiveBar
          data={data}
          keys={["Containers", "Standard Drinks"]}
          indexBy="day"
          margin={{ top: 50, right: 20, bottom: 80, left: 25 }}
          padding={0.3}
          innerPadding={width > 600 ? 8 : 3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={["rgba(33, 106, 111, .85)", "rgba(218, 165, 32, .85)"]}
          borderRadius={3}
          // borderColor={{
          //   from: "color",
          //   modifiers: [["darker", 1.6]],
          // }}
          // borderColor={(d) => {
          //   if (d.data.value > 4) {
          //     return "rgba(255, 0, 0, .5)";
          //   } else {
          //     return d.color;
          //   }
          // }}
          // borderWidth={2}
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
          minValue={0}
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
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: -20,
              translateY: 65,
              itemsSpacing: 40,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 15,
              symbolShape: "circle",
            },
          ]}
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={(e) =>
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          }
        />
      </div>
      <div className="static">
        <p className={clsx(containerCount > 14 && "text-red-700")}>
          Containers: {containerCount}
        </p>
        <p className={clsx(+standardDrinkCount > 14 && "text-red-700")}>
          Standard Drinks: {standardDrinkCount}
        </p>
      </div>
      <a
        href="https://codesandbox.io/p/sandbox/vibrant-ives-3gkfx?file=%2Fsrc%2FBusinessIntelligence.js%3A65%2C22"
        target="_blank"
        className="text-blue-600 underline"
      >
        Grouped bar shared tooltip
      </a>
    </>
  );
}

export default BarChart;

// arr = [
//   {
//     day: "Sunday",
//     count1: 3,
//     count2: 3.2,
//   },
//   {
//     day: "Monday",
//     count1: 4,
//     count2: 4.2,
//   },
//   {
//     day: "Tuesday",
//     count1: 5,
//     count2: 5.1,
//   },
//   {
//     day: "Wednesday",
//     count1: 1,
//     count2: 1.1,
//   },
//   {
//     day: "Thursday",
//     count1: 6,
//     count2: 5.5,
//   },
//   {
//     day: "Friday",
//     count1: 4,
//     count2: 3.9,
//   },
//   {
//     day: "Saturday",
//     count1: 2,
//     count2: 2.6,
//   },
// ];
