import { useState } from "react";
import { scaleLinear, format, extent } from "d3";
import { Dropdown } from "../Dropdown/Dropdown";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import "./Scatterplot.css";

const width = window.innerWidth;
const height = window.innerHeight;
const margin = { top: 20, right: 30, bottom: 70, left: 100 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

const attributes = [
  { value: "sepal_length", label: "Sepal Length" },
  { value: "sepal_width", label: "Sepal Width" },
  { value: "petal_length", label: "Petal Length" },
  { value: "petal_width", label: "Petal Width" },
  { value: "species", label: "Species" },
];

const getLabel = (value) => {
  for (let i = 0; i < attributes.length; i++) {
    if (attributes[i].value === value) {
      return attributes[i].label;
    }
  }
};

const ScatterplotDropdown = () => {
  const data = useData();

  // accessor functions
  // access the value that you want from the data
  // remove duplicate code logic
  const initialXAttribute = "petal_length";
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = (d) => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);

  const initialYAttribute = "sepal_width";
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = (d) => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);

  const menuHeight = 60;
  if (!data) {
    return <pre>Loading data...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom - menuHeight;
  const innerWidth = width - margin.left - margin.right;

  const siFormat = format(".2s");
  const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");

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

  return (
    <>
      <div className="dropdown-container">
        <label for="x-select">X:</label>
        <Dropdown
          options={attributes}
          id="x-select"
          selectedValue={xAttribute}
          onSelectedValueChange={setXAttribute}
        />
        <label for="y-select">Y:</label>
        <Dropdown
          options={attributes}
          id="y-select"
          selectedValue={yAttribute}
          onSelectedValueChange={setYAttribute}
        />
      </div>

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
    </>
  );
};

export default ScatterplotDropdown;
