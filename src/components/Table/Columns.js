// step 2 
// each coloumn is represented by an object in the array
// u can pick what data to be rendered in the UI

// const checker = value === "China" ? "Naise" : "Nooooo";

export const Columns = [
    {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id' // access row  data based on the key 

    },
    {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name'
    },
    {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name'
    },
    {
        Header: 'Date of Birth',
        Footer: 'Date of Birth',
        accessor: 'date_of_birth'
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