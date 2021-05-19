import { useState, useEffect } from "react";
import { csv, scaleBand, scaleLinear, max } from "d3";

// UN_Population_2019
const csvUrl =
  "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";

const width = window.innerWidth;
const height = window.innerHeight;
const margin = { top: 20, right: 20, bottom: 20, left: 200 };

const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

const BarChart = () => {
  const [data, setData] = useState(null);
  // load data

  useEffect(() => {
    // use row callback to convert data representation
    const row = (d) => {
      d.Population = +d["2020"]; // convert to float
      return d;
    };

    csv(csvUrl, row).then((data) => {
      setData(data.slice(0, 10));
    });
  }, []);

  if (!data) {
    return <pre>Loading data...</pre>;
  }

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
        {xScale.ticks().map((tickValue) => (
          <g transform={`translate(${xScale(tickValue)},0)`}>
            <line y2={innerHeight} stroke="black"></line>
            <text
              key={tickValue}
              dy="0.71em"
              style={{ textAnchor: "middle" }}
              y={innerHeight + 3}
            >
              {tickValue}
            </text>
          </g>
        ))}
        {yScale.domain().map((tickValue) => (
          <text
            key={tickValue}
            dy="0.32em"
            style={{ textAnchor: "end" }}
            x={-3}
            y={yScale(tickValue) + yScale.bandwidth() / 2}
          >
            {tickValue}
          </text>
        ))}
        {data.map((d) => (
          <rect
            key={d.country}
            x={0}
            y={yScale(d.Country)}
            width={xScale(d.Population)}
            height={yScale.bandwidth()}
          ></rect>
        ))}
      </g>
    </svg>
  );
};

export default BarChart;
