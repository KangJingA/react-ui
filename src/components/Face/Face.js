const face = () => {

    const width= 960; 
    const height= 500;

    const centerX = width /2 ;
    const centerY = height/2 ;
    const strokeWidth = 10;

    const eyeOffsetX = 90;
    const eyeOffsetY = 90;

    const eyeRadius = 40;
  return (
    <svg width={width} height={height}>
      <circle
        cx={centerX}
        cy={centerY}
        r={centerY - strokeWidth/2}
        fill="yellow"
        stroke="black"
        stroke-width={strokeWidth}
      ></circle>
      <circle
        cx={centerX - eyeOffsetX}
        cy={centerY -eyeOffsetY}
        r={eyeRadius}
        fill="black"
        stroke="black"
        stroke-width="2px"
      ></circle>
      <circle
        cx={centerX + eyeOffsetX}
        cy={centerY -eyeOffsetY}
        r={eyeRadius}
        fill="black"
        stroke="black"
        stroke-width="2px"
      ></circle>
    </svg>
  );
};

export default face;
