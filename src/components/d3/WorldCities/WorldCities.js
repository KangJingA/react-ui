import { scaleSqrt, max } from "d3";
import { useWorldAtlas } from "./useWorldAtlas";
import { useCities } from "./useCities";
import { Marks } from "./Marks";

import "./WorldCities.css";

const width = window.innerWidth;
const height = window.innerHeight;

// const width = 960;
// const height = 500;
const WorldCities = () => {
  const worldAtlas = useWorldAtlas();
  const cities = useCities();

  if (!worldAtlas || !cities) {
    return <pre>Loading data...</pre>;
  }

  const sizeValue = (data) => data.population;
  const maxRadius = 15;

  const sizeScale = scaleSqrt()     // each pixel is one person. covert area to radius
    .domain([0, max(cities, sizeValue)]) // area of the circle corresponds to the data values
    .range([0, maxRadius]);

  return (
    <svg width={width} height={height}>
      <g>
        <Marks
          data={worldAtlas}
          cities={cities}
          sizeScale={sizeScale}
          sizeValue={sizeValue}
        />
      </g>
    </svg>
  );
};

export default WorldCities;
