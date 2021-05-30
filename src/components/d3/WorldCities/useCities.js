import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv';

const row = d => {
  d.lat = +d.lat; // converts string to number
  d.lng = +d.lng;
  return d;
};

export const useCities = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl, row).then(setData);
  }, []);

  return data;
};
