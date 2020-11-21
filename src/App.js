import React, {useState} from "react";
import {ReactTabulator} from 'react-tabulator';
import faker from 'faker';

function App () {
    // generate some table data
    const numOfRecord = 5;
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
            profile_picture: faker.image.people(150, 150, true),
            employee_id: faker.random.uuid().substring(0, 7),
            first_name,
            last_name,
            date_of_birth: faker.date.past().toDateString(),
            gender,
            phone_number: faker.phone.phoneNumber(),
            email_address: faker.internet.email(first_name, last_name).toLowerCase(),
            home_address: faker.address.streetAddress(true),
            department,
            date_employed: faker.date.past().toDateString(),
            is_employed: faker.random.arrayElement([true, false]),
            status,
            created_at: faker.date.past().toDateString(),
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
        { title: "Status", field: "status", },
        { title: "Created at", field: "created_at" },
    ];


    const [data] = useState(tableData)

    const tableHeader = (
        <tr>
            {columns.map(c => (
                <th>
                    {c.title}
                </th>
            ))}
        </tr>
    );

    const tableBody = data.map(td => (
        <tr>
            <td>
                <img src={td.profile_picture} alt={td.first_name} width={60}/>
            </td>
            <td>
                {td.employee_id}
            </td>
            <td>
                {td.first_name}
            </td>
            <td>
                {td.last_name}
            </td>
            <td>
                {td.date_of_birth}
            </td>
            <td>
                {td.gender}
            </td>
            <td>
                {td.phone_number}
            </td>
            <td>
                {td.email_address}
            </td>
            <td>
                {td.home_address}
            </td>
            <td>
                {td.department}
            </td>
            <td>
                {td.date_employed}
            </td>
            <td>
                {td.is_employed}
            </td>
            <td>
                {td.status}
            </td>
            <td>
                {td.created_at}
            </td>
        </tr>
    ));

    return (
        <section className="container-fluid">
            <header className='mb-3 py-5 d-flex align-items-start'>
                <section>
                    <h1 className='font-weight-bold'>
                        Tecrum Create
                    </h1>
                    <h6 className='text-muted'>
                        Emplooyee portal
                    </h6>
                </section>
                <aside className='border-left border-dark p-4 w-25 h-100 ml-auto ep-stat d-flex'>
                    <section className='aside-p1 mr-5'>
                        <h1 className='ep-stat-totalcount'>
                            {tableData.length}
                        </h1>
                        <p className='text-muted'>
                            Total Employees
                        </p>
                    </section>
                    <section className='aside-p2'>
                        <ul className="list-unstyled">
                            <li className="list-item">
                                <span className="text-muted mr-1">
                                    Active:
                                </span>

                                90
                            </li>
                            <li className="list-item">
                                <span className="text-muted mr-1">
                                    Suspended:
                                </span>

                                2
                            </li>
                            <li className="list-item">
                                <span className="text-muted mr-1">
                                    Inactive:
                                </span>

                                8
                            </li>
                            <li className="list-item">
                                <span className="text-muted mr-1">
                                    Terminated:
                                </span>

                                8
                            </li>
                        </ul>
                    </section>
                </aside>
            </header>

            <main>
                <section className="employee-record table-responsive">
                    <table className="table table-striped table-borderless table-hover employee-records-table">
                        <thead className="thead-dark">
                        {tableHeader}
                        </thead>
                        <tbody>
                        {tableBody}
                        </tbody>
                    </table>
                </section>
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
