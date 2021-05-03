import { arc } from "d3";

const face = () => {
  const width = 960;
  const height = 500;

  const centerX = width / 2;
  const centerY = height / 2;
  const strokeWidth = 10;

  const eyeOffsetX = 90;
  const eyeOffsetY = 90;

  const eyeRadius = 40;

  const mouthWidth = 10;
  const mouthRadius = 150;
  // read the docs man
  const mouthArc = arc()
    .innerRadius(mouthRadius)
    .outerRadius(mouthRadius + mouthWidth)
    .startAngle(Math.PI / 2) // starts fomr 12 oclock
    .endAngle((Math.PI * 3) / 2);

  const browWidth = 5;
  const browRadius = 50;
  const browArc = arc()
    .innerRadius(browRadius)
    .outerRadius(browRadius + browWidth)
    .startAngle(0) // starts fomr 12 oclock
    .endAngle(Math.PI * 2);

  return (
    <svg width={width} height={height}>
      {/* svg group element */}
      {/* kinda works like a div, puts all svg elements together */}
      {/* translate everything to the center */}
      <g transform={`translate(${centerX},${centerY})`}>
        <circle
          r={centerY - strokeWidth / 2}
          fill="yellow"
          stroke="black"
          strokeWidth={strokeWidth}
        ></circle>
        <g transform={`translate(${-eyeOffsetX},${-eyeOffsetY})`}>
          <path d={browArc()} fill="red"></path>
          <circle
            r={eyeRadius}
            fill="black"
            stroke="black"
            strokeWidth="2px"
          ></circle>
        </g>
        <g transform={`translate(${eyeOffsetX},${-eyeOffsetY})`}>
          <path d={browArc()} fill="aqua"></path>
          <circle
            r={eyeRadius}
            fill="black"
            stroke="black"
            strokeWidth="2px"
          ></circle>
        </g>
        <path d={mouthArc()}></path>
      </g>
    </svg>
  );
};

export default face;
