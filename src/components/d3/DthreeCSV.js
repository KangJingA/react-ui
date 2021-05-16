// parse csv
// count rows and columns
// estimating data size
// contructing and displaying text with D3 and css
// d3.csv.parse, csvformat

// takes csv string, returns array of objects.
// each object represents one row of the table
// each array also contains an object columns
import * as d3 from "d3";
import { useState, useEffect } from "react";
const fetchText = async (url) => {
  const response = await fetch(url);
  return await response.text();
};

const csvUrl =
  "https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv";

const message = (data) => {
  let message = "";
  message = message + Math.round(d3.csvFormat(data).length / 1024) + " kb\n";
  message = message + data.length + " rows\n";
  message = message + data.columns.length + " columns\n";

  return message;
};

const DthreeCsv = () => {
  const [data, setData] = useState(null);

  useEffect(()=>{
    d3.csv(csvUrl).then((data) => {
      setData(data);
      console.log(data)
    });

  }, []);
  

  return <div>Data is {data ? message(data) : "loading"} </div>;
};

export default DthreeCsv;
