import './App.css';
import React, {useState} from "react";
import {ReactTabulator} from 'react-tabulator'

function App () {
    const [tableData, setTableData] = useState([])

    const columns = [
        { title: "Name", field: "name", width: 150 },
        { title: "Age", field: "age", hozAlign: "left", formatter: "progress" },
        { title: "Favourite Color", field: "col" },
        { title: "Date Of Birth", field: "dob", hozAlign: "center" },
        { title: "Rating", field: "rating", hozAlign: "center", formatter: "star" },
        { title: "Passed?", field: "passed", hozAlign: "center", formatter: "tickCross" }
    ];

    setTableData([
        { id: 1, name: "Oli Bob", age: "12", col: "red", dob: "" },
        { id: 2, name: "Mary May", age: "1", col: "blue", dob: "14/05/1982" },
        { id: 3, name: "Christine Lobowski", age: "42", col: "green", dob: "22/05/1982" },
        { id: 4, name: "Brendon Philips", age: "125", col: "orange", dob: "01/08/1980" },
        { id: 5, name: "Margret Marmajuke", age: "16", col: "yellow", dob: "31/01/1999" },
    ]);

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
                    data={this.tableData}
                    columns={this.columns}
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
