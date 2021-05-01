// step 2 
// each column is represented by an object in the array
// u can pick what data to be rendered in the UI

import { format } from 'date-fns';

// const checker = value === "China" ? "Naise" : "Nooooo";
// Cell property controlls what is rendered in the UI

export const Columns = [
    {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id', // access row  data based on the key 
        disableSortBy: true // disable sorting

    },
    {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name',
        // Cell: ( props ) => {
        //     return (
        //         <button onClick={(e)=>console.log(props)}>{props.value}</button>
        //     )
        // }
    },
    {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name'
    },
    {
        Header: 'Date of Birth',
        Footer: 'Date of Birth',
        accessor: 'date_of_birth',
        //Cell: ({ cell: { value } }) => { return format(new Date(value),'dd/MM/yyyy')}
        Cell: ( { value } ) => { return format(new Date(value),'dd/MM/yyyy')}
    },
    {
        Header: 'Country',
        Footer: 'Country',
        accessor: 'country',
        // Cell: ({ cell: { value } }) => { 
        //     return String(value) === "China" ? "Hey man" : "Fuck yess"} 
        
    },
    {
        Header: 'Phone',
        Footer: 'Phone',
        accessor: 'phone'
    }

]

// group headers together into another header
export const GroupedColumns = [
        {
            Header: 'Id',
            Footer: 'Id',
            accessor: 'id'
        },
        {
            Header: 'Name',
            Footer: 'Name',
            // array of objects where each object represents a column
            columns: [         
                {
                    Header: 'First Name',
                    Footer: 'First Name',
                    accessor: 'first_name'
                },
                {
                    Header: 'Last Name',
                    Footer: 'Last Name',
                    accessor: 'last_name'
                }
            ]
        },
        {
            Header: 'Information',
            Footer: 'Information',
            columns: [
                {
                    Header: 'Date of Birth',
                    Footer: 'Date of Birth',
                    accessor: 'date_of_birth'
                },
                {
                    Header: 'Country',
                    Footer: 'Country',
                    accessor: 'country',
                    
                },
                {
                    Header: 'Phone',
                    Footer: 'Phone',
                    accessor: 'phone'
                }
            
            ]
        }
]