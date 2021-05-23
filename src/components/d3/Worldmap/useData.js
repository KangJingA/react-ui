import { useState, useEffect } from "react";
import { json } from "d3"; // parse json data
import { feature, mesh } from "topojson"; // converts from topoJSON to geoJSON

// world map
// topoJSON is good file format to encode, but data structure is hard to work with
// convert topoJSON to geoJSON, easier to work with:
// each polygon are a array of coordinate pairs that can be directly mapped to svg paths
const jsonUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    json(jsonUrl).then(topology => {
      console.log(topology)
      const { countries, land } = topology.objects;
      setData({
        land: feature(topology, land),
        interiors: mesh(topology, countries, (a, b) => a !== b) // only include interior outline
      });
    }); // in topoJSON
  }, []);

  return data;
};
