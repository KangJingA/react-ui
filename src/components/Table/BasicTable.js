// 1.get data to display
// 2.define columns for table
// 3.use data and columns defind to create a table using react-table
// 4.define basic table structure using plain HTML
// 5.use table instance created in step 3 to bring life to the HTML defined in step 4
// 6.include CSS for tableData

import { useMemo } from "react";
import { useTable } from "react-table";
import table_data from "../data/table_data.json"; // step 1
import { Columns } from "./Columns";

import './BasicTable.css';
const BasicTable = () => {
  // react-table reccomends memoisation of data --> ensures that data is not loaded again at every render
  // memoization: optimization technique used primarily to speed up computer programs by
  // storing the results of expensive function calls and returning the cached result when the same inputs occur again
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => table_data, []);

  // step 3
  // create table instance
  const tableInstance = useTable({
    columns: columns,
    data: data,
  });

  // step 5
  // destructure properties and methods from table instance
  const {
    getTableProps, // to be destructured on the table tag
    getTableBodyProps, // to be destructured on the body tag
    headerGroups, // an array. for thead tag 
    rows,
    prepareRow,
  } = tableInstance;

  console.log(headerGroups);
  // thead: table head
  // tbody: table body
  // tr: table row -> put the cells in the rows
  // th: table header cell -> bold and centered by default
  // td: table data cell -> regular and left-aligned by default

  return (
    // step 4 + 5 + 6
    <table {...getTableProps()}>
      <thead >
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map( (column) => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th> // render the poperty specified Columns.js
                ))}
            </tr>
          ))}
      </thead>

      <tbody {...getTableBodyProps()}>
          {
              rows.map( row => {
                  prepareRow(row)
                  return (
                      <tr {...row.getRowProps()}>
                          {row.cells.map((cell)=>{
                              return(
                                <td {...cell.getCellProps()} >{cell.render('Cell')}</td> // grabs data from each row and renders in the browser
                              )
                          })}
                          
                      </tr>
                  )
              })
          }
      </tbody>
    </table>
  );
};

export default BasicTable;
