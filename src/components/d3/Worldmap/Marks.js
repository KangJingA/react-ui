import { geoNaturalEarth1, geoPath, geoGraticule } from "d3";

const projection = geoNaturalEarth1();

const graticule = geoGraticule();
export const Marks = ({ data: { land, interiors } }) => {
  projection.fitSize([window.innerWidth, window.innerHeight], land);
  const path = geoPath(projection);

  return (
    // 1. projection
    // 2. path

    <g className="marks">
      <path className="sphere" d={path({ type: "Sphere" })} />
      <path className="graticules" d={path(graticule())} />
      {land.features.map((feature) => (
        <path className="land" d={path(feature)} />
      ))}

      <path className="interiors" d={path(interiors)} />
    </g>
  );
};
