import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-tabulator/lib/styles.css';
import React, {useState} from "react";
import {ReactTabulator} from 'react-tabulator';
import faker from 'faker';

function App () {
    // generate some table data
    const numOfRecord = 6;
    const genders = ['male', 'female']
    const departments = [
        'Engineering',
        'Accounting',
        'Sales & Marketing',
        'Product'
    ];
    const statuses = [
        'Active',
        'Inactive',
        'Terminated',
        'Suspended'
    ];

    const tableData = [];

    for (let i = 0; i < numOfRecord; i++) {
        // pick a gender
        const gender = faker.random.arrayElement(genders);
        const department = faker.random.arrayElement(departments);
        const first_name = faker.name.firstName(gender);
        const last_name = faker.name.lastName(gender);
        const status = faker.random.arrayElement(statuses)

        tableData.push({
            profile_picture: faker.image.people(100, 100, true),
            employee_id: faker.random.uuid(),
            first_name,
            last_name,
            date_of_birth: faker.date.past(),
            gender,
            phone_number: faker.phone.phoneNumber(),
            email_address: faker.internet.email(first_name, last_name).toLowerCase(),
            home_address: faker.address.streetAddress(true),
            department,
            date_employed: faker.date.past(),
            is_employed: faker.random.arrayElement([true, false]),
            status,
            created_at: faker.date.past(),
        })
    }

    const columns = [
        { title: "Photo", field: "profile_picture" },
        { title: "Employee ID", field: "employee_id" },
        { title: "First name", field: "first_name" },
        { title: "Last name", field: "last_name" },
        { title: "Date Of Birth", field: "date_of_birth" },
        { title: "Gender", field: "gender" },
        { title: "Phone number", field: "phone_number" },
        { title: "Email Address", field: "email_address" },
        { title: "Home Address", field: "home_address" },
        { title: "Department", field: "department" },
        { title: "Date employed", field: "date_employed" },
        { title: "Is employed?", field: "is_employed", hozAlign: "center", formatter: "tickCross" },
        { title: "Status", field: "status",  },
        { title: "Created at", field: "created_at" },
    ];


    const [data] = useState(tableData)

    return (
        <section className="container-fluid">
            <header className='my-5 pb-3'>
                <h1 className='font-weight-bold'>
                    Tecrum Create
                </h1>
                <h6>
                    Emplooyee portal
                </h6>
            </header>

            <main>
                <ReactTabulator
                    data={data}
                    columns={columns}
                    tooltips={true}
                    layout={"fitData"}
                />
            </main>

            {/*<footer>
                <small className='text-muted'>
                    &copy; Footr
                </small>
            </footer>*/}
        </section>
    );
}

export default App;
