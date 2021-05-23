import {} from "d3";
import { useData } from "./useData";
import { Marks } from "./Marks";

import "./Worldmap.css";

const width = window.innerWidth;
const height = window.innerHeight;

// const width = 960;
// const height = 500;
const Worldmap = () => {
  const data = useData();

  if (!data) {
    return <pre>Loading data...</pre>;
  }

  return (
    <svg width={width} height={height}>
      <g>
        <Marks data={data} />
      </g>
    </svg>
  );
};

export default Worldmap;
