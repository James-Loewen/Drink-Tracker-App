import type { AxisTickProps } from "@nivo/axes";

interface BarChartAxisBottomTickProps extends AxisTickProps<any> {
  screenWidth: number;
  truncFn?: (value: string) => string;
}

function BarChartAxisBottomTick(props: BarChartAxisBottomTickProps) {
  let value: string;
  if (props.truncFn) {
    value = props.screenWidth > 720 ? props.value : props.truncFn(props.value);
  } else {
    value = props.value;
  }

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
        className="font-display"
      >
        {value}
      </text>
    </g>
  );
}

export default BarChartAxisBottomTick;
