import { scaleBand, scaleLinear, max } from "d3";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

const width = window.innerWidth;
const height = window.innerHeight;
const margin = { top: 20, right: 20, bottom: 20, left: 200 };

const BarChart = () => {
  const data = useData();

  if (!data) {
    return <pre>Loading data...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  // accessor functions
  // access the value that you want from the data
  // remove duplicate code logic
  const yValue = (data) => data.Country;
  const xValue = (data) => data.Population;

  // domain => "data space"
  // range => "screen space"

  // construct scale
  // domain is an array or iterator ;imput is array of country names
  // pixel space coordinates that the rectangles will be mapped onto; range must be continuous
  // divide the range evenly between the elements of the domain

  const yScale = scaleBand()
    .domain(data.map((d) => d.Country))
    .range([0, innerHeight]) // set aside space for margin
    .paddingInner(0.1);

  // width will be population size
  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.Population)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} />
        <AxisLeft yScale={yScale} />
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
        />
      </g>
    </svg>
  );
};

export default BarChart;
