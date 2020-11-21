import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-tabulator/lib/styles.css';
import React, {useState} from "react";
import {ReactTabulator} from 'react-tabulator'

function App () {
    // generate some table data
    const numOfRecord = 12;
    const tableData = [];
    for (let i = 0; i < numOfRecord; i++) {

    }


    const [data] = useState([
        { id: 1, name: "Oli Bob", age: "12", col: "red", dob: "" },
        { id: 2, name: "Mary May", age: "1", col: "blue", dob: "14/05/1982" },
        { id: 3, name: "Christine Lobowski", age: "42", col: "green", dob: "22/05/1982" },
        { id: 4, name: "Brendon Philips", age: "125", col: "orange", dob: "01/08/1980" },
        { id: 5, name: "Margret Marmajuke", age: "16", col: "yellow", dob: "31/01/1999" },
    ])

    const columns = [
        { title: "Name", field: "name" },
        { title: "Age", field: "age" },
        { title: "Favourite Color", field: "col" },
        { title: "Date Of Birth", field: "dob" },
        { title: "Rating", field: "rating" },
        { title: "Passed?", field: "passed" }
    ];

    return (
        <section className="container-fluid">
            <header className=''>
                <h1 className='font-weight-bold'>
                    Tecrum Create
                </h1>
            </header>

            <main>
                <em>List employees here</em>

                <ReactTabulator
                    data={data}
                    columns={columns}
                    tooltips={true}
                    layout={"fitData"}
                />
            </main>

            <footer>
                <small className='text-muted'>
                    &copy; Footr
                </small>
            </footer>
        </section>
    );
}

export default App;
