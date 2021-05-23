import { line, curveNatural } from "d3";

export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
}) => (
  <g className="marks">
    <path
      fill="none"
      stroke="black"
      d={line()
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(yValue(d)))
        .curve(curveNatural)(data)}
    />

    {data.map((d) => (
      <circle
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={5}
      >
        <title>{tooltipFormat(xValue(d))}</title>
      </circle>
    ))}
  </g>
);
