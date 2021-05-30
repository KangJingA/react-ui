import {} from "d3";
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

  return (
    <svg width={width} height={height}>
      <g>
        <Marks data={worldAtlas} cities={cities} />
      </g>
    </svg>
  );
};

export default WorldCities;
