import { useMemo, useEffect } from "react";
import { useTable, useRowSelect } from "react-table";
import table_data from "../data/table_data.json"; // step 1
import { Columns } from "./Columns";

import { Checkbox } from './Checkbox';

import './BasicTable.css';
const BasicTable = () => {
  
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => table_data, []);

  // step 3
  // create table instance
  const tableInstance = useTable(
    {
        columns: columns,
        data: data,
    },
    useRowSelect, // helps to keep track of the selected row
    hooks => { // programmatically add checkbox column to the table
        hooks.visibleColumns.push(columns => [ 
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} /> //the rest of the columns in Columns.js
          },
          ...columns
        ])
      }
  );

  const {
    getTableProps, // to be destructured on the table tag
    getTableBodyProps, // to be destructured on the body tag
    headerGroups, // an array. for thead tag 
    rows,
    prepareRow,
    selectedFlatRows // gives you flat array of rows currently selected in the table
  } = tableInstance; 

  useEffect(()=> {
    console.log(selectedFlatRows);
    console.log(typeof selectedFlatRows)
  },[selectedFlatRows])

  // just grab 10 rows
  const firstPageRows = rows.slice(0,10);

  // thead: table head
  // tbody: table body
  // tr: table row -> put the cells in the rows
  // th: table header cell -> bold and centered by default
  // td: table data cell -> regular and left-aligned by default
  return (
    <>
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
                firstPageRows.map( row => {
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
        <pre>
        <code>
        {JSON.stringify(
            {
            selectedFlatRows: selectedFlatRows.map(row => row.original)
            },
            null,
            2
        )}
        </code>
    </pre>
  </>          
  );
};

export default BasicTable;
