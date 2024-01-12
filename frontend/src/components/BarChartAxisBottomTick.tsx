import type { AxisTickProps } from "@nivo/axes";

interface BarChartAxisBottomTickProps extends AxisTickProps<any> {
  screenWidth: number;
}

function BarChartAxisBottomTick(props: BarChartAxisBottomTickProps) {
  // console.log(props);
  const value = props.screenWidth > 650 ? props.value : props.value.slice(0, 3);

  return (
    <g transform={`translate(${props.x},${props.y})`}>
      <line
        x1={0}
        x2={0}
        y1={0}
        y2={5}
        style={{ stroke: "rgb(119, 119, 119)", width: "1px" }}
      ></line>
      <text
        dominantBaseline={props.textBaseline}
        textAnchor={props.textAnchor}
        transform={`translate(${props.textX},${props.textY}) rotate(${props.rotate})`}
        className="font-mono font-bold"
      >
        {value}
      </text>
    </g>
  );
}

export default BarChartAxisBottomTick;
