import { scaleLinear, scaleTime, timeFormat, extent } from "d3";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

import "./Linechart.css";

const width = window.innerWidth;
const height = window.innerHeight;
const margin = { top: 20, right: 30, bottom: 70, left: 100 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

const Linechart = () => {
  const data = useData();

  if (!data) {
    return <pre>Loading data...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  // accessor functions
  // access the value that you want from the data
  // remove duplicate code logic
  const xValue = (data) => data.timestamp;
  const xAxisLabel = 'Time';

  const yValue = (data) => data.temperature;
  const yAxisLabel = 'Temperature';

  
  const xAxisTickFormat = timeFormat("%a");

  // domain => "data space"
  // range => "screen space"

  // construct scale
  // domain is an array or iterator ;imput is array of country names
  // pixel space coordinates that the rectangles will be mapped onto; range must be continuous
  // divide the range evenly between the elements of the domain

  // width will be population size
  const xScale = scaleTime()
    .domain((extent(data,xValue)))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0]) // set aside space for margin
    .nice();

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
        />
        <text
          textAnchor="middle"
          className="axis-label"
          transform={`translate(${-yAxisLabelOffset},${innerHeight /
            2}) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth}/>
        <text
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
          className="axis-label"
        >
          {xAxisLabel}
        </text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
        />
      </g>
    </svg>
  );
};

export default Linechart;
