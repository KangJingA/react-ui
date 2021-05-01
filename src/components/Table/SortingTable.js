// 1.get data to display
// 2.define columns for table
// 3.use data and columns defind to create a table using react-table
// 4.define basic table structure using plain HTML
// 5.use table instance created in step 3 to bring life to the HTML defined in step 4
// 6.include CSS for tableData

import { useMemo } from "react";
import { useTable, useSortBy } from "react-table"; ////
import table_data from "../data/table_data.json"; // step 1
import { Columns, GroupedColumns } from "./Columns";

import './BasicTable.css';
const SortingTable = () => {

  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => table_data, []);

  // step 3
  // create table instance
  const tableInstance = useTable({
    columns: columns,
    data: data,
  },
  useSortBy); //pass useSortBy hook as argument into the useTableHook --> adds sorting feature, add into the th

  // step 5
  // destructure properties and methods from table instance
  const {
    getTableProps, // to be destructured on the table tag
    getTableBodyProps, // to be destructured on the body tag
    headerGroups, // an array. for thead tag 
    footerGroups,
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
                    // add here to sort
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>  
                        {column.render('Header')}       
                        <span>
                            {column.isSorted   // add icon
                            ? column.isSortedDesc
                                ? ' 🔽'
                                : ' 🔼'
                            : ''}
                        </span>
                        </th> 
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
      <tfoot>
          {footerGroups.map(footerGroup => (
              <tr {...footerGroup.getFooterGroupProps()}>
                  {
                    footerGroup.headers.map(column => (
                        <td {...column.getFooterGroupProps}>
                            {column.render('Footer')}
                        </td>
                    ))
                  }
              </tr>
          ))}
      </tfoot>  
    </table>
  );
};

export default SortingTable;
