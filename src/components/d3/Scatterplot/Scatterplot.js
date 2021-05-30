import { useState } from "react";
import { scaleLinear, scaleOrdinal, format, extent } from "d3";
import { ColorLegend } from "./ColorLegend";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

import "./Scatterplot.css";

const width = window.innerWidth;
const height = window.innerHeight;
const margin = { top: 20, right: 200, bottom: 70, left: 100 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;
const fadeOpacity = 0.2;

const Scatterplot = () => {
  const data = useData();
  const [hoveredValue, setHoveredValue] = useState(null);

  if (!data) {
    return <pre>Loading data...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  // accessor functions
  // access the value that you want from the data
  // remove duplicate code logic
  const yValue = (data) => data.petal_length;
  const xAxisLabel = "Petal Length";

  const xValue = (data) => data.sepal_width;
  const yAxisLabel = "Sepal Width";

  const colorValue = (data) => data.species;
  const colorLegendLabel = "Species";
  const filteredData = data.filter((d) => hoveredValue === colorValue);

  const siFormat = format(".2s");
  const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");

  const circleRadius = 7;
  // domain => "data space"
  // range => "screen space"

  // construct scale
  // domain is an array or iterator ;imput is array of country names
  // pixel space coordinates that the rectangles will be mapped onto; range must be continuous
  // divide the range evenly between the elements of the domain

  // width will be population size
  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight]); // set aside space for margin

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue)) // array
    .range(["#E6842A", "#137B80", "#8E6C8A"]); //map to range of colors

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
          transform={`translate(${-yAxisLabelOffset},${
            innerHeight / 2
          }) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} />
        <text
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
          className="axis-label"
        >
          {xAxisLabel}
        </text>
        <g transform={`translate(${innerWidth + 60}, 60)`}>
          <text x={35} y={-25} className="axis-label" textAnchor="middle">
            {colorLegendLabel}
          </text>
          <ColorLegend
            colorScale={colorScale}
            tickSpacing={22}
            tickTextOffset={12}
            tickSize={circleRadius}
            onHover={setHoveredValue}
            hoveredValue={hoveredValue}
            fadeOpacity={fadeOpacity}
          />
        </g>
        <g opacity={hoveredValue ? fadeOpacity : 1}>
          <Marks
            data={data}
            xScale={xScale}
            xValue={xValue}
            yScale={yScale}
            yValue={yValue}
            colorScale={colorScale}
            colorValue={colorValue}
            tooltipFormat={xAxisTickFormat}
            circleRadius={circleRadius}
          />
        </g>
        <Marks
          data={filteredData}
          xScale={xScale}
          xValue={xValue}
          yScale={yScale}
          yValue={yValue}
          colorScale={colorScale}
          colorValue={colorValue}
          tooltipFormat={xAxisTickFormat}
          circleRadius={circleRadius}
        />
      </g>
    </svg>
  );
};

export default Scatterplot;
