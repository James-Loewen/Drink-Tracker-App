import {
  ResponsiveBar,
  type BarDatum,
  type ComputedBarDatumWithValue,
} from "@nivo/bar";

import useWindowDimensions from "../hooks/useWindowDimensions";
import BarChartAxisBottomTick from "./BarChartAxisBottomTick";
import generateAxisTicks from "../utils/generateAxisTicks";

type BarChartProps = {
  data: BarDatum[];
};

function BarChart({ data }: BarChartProps) {
  const { width } = useWindowDimensions();
  console.log(data);

  const tickValues = generateAxisTicks(data);

  function barLabelColor(d: ComputedBarDatumWithValue<BarDatum>) {
    if (d.data.value >= 4) {
      return "#8B6666";
    } else {
      return "#22232A";
    }
  }

  return (
    <div className="w-full h-[450px]">
      <ResponsiveBar
        data={data}
        keys={["count1", "count2"]}
        indexBy="day"
        margin={{ top: 50, right: 20, bottom: 80, left: 25 }}
        padding={0.3}
        innerPadding={width > 600 ? 8 : 2}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "pastel1" }}
        borderRadius={3}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
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
        labelTextColor={barLabelColor}
        theme={{
          text: { fontSize: 16, fontFamily: "monospace" },
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 80,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        // markers={[
        //   {
        //     axis: "y",
        //     value: 4,
        //     lineStyle: {
        //       stroke: "rgba(34, 35, 42, .25)",
        //       strokeWidth: 2,
        //     },
        //     legend: "4/day limit",
        //     legendOrientation: "horizontal",
        //   },
        // ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
          e.id + ": " + e.formattedValue + " in country: " + e.indexValue
        }
      />
    </div>
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
