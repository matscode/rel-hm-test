import React, {useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import faker from 'faker';
import * as _ from 'lodash'
import moment from "moment";

function App () {
    // history
    const history = useHistory();

    // generate some table data

    const [numOfRecord] = useState(10);
    const [data, setData] = useState([]);
    const genders = useRef(['male', 'female'])
    const departments = useRef([
        'Engineering',
        'Accounting',
        'Sales & Marketing',
        'Product'
    ]);
    const statuses = useRef([
        'Active',
        'Inactive',
        'Terminated',
        'Suspended'
    ]);

    const columns = useRef([
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
    ]);

    useEffect(() => {
        const td = [];
        const gd = localStorage.getItem('employees') || '[]';
        const gdCount = JSON.parse(gd).length;

        // generate new record on number of record change
        if (gdCount!==numOfRecord || !gdCount) {
            for (let i = 0; i < numOfRecord; i++) {
                // pick a gender
                const gender = faker.random.arrayElement(genders.current);
                const department = faker.random.arrayElement(departments.current);
                const first_name = faker.name.firstName(gender);
                const last_name = faker.name.lastName(gender);
                const status = faker.random.arrayElement(statuses.current)

                td.push({
                    profile_picture: faker.image.people(180, 180, true),
                    employee_id: faker.random.uuid().substring(0, 7),
                    first_name,
                    last_name,
                    date_of_birth: moment(faker.date.past().toISOString()).format('YYYY-MM-DD'),
                    gender,
                    phone_number: faker.phone.phoneNumber(),
                    email_address: faker.internet.email(first_name, last_name).toLowerCase(),
                    home_address: faker.address.streetAddress(true),
                    department,
                    date_employed: moment(faker.date.past().toISOString()).format('YYYY-MM-DD'),
                    date_confirmed: faker.random.arrayElement(['', moment(faker.date.past().toISOString()).format('YYYY-MM-DD')]),
                    is_employed: faker.random.arrayElement([true, false]),
                    status,
                    created_at: moment(faker.date.past().toISOString()).format('YYYY-MM-DD'),
                })
            }
            setData(td);
        } else {
            setData(JSON.parse(gd));
        }

    }, [numOfRecord])

    // persist data
    useEffect(() => {
        localStorage.setItem('employees', JSON.stringify(data));
    }, [data]);

    return (
        <section className="container-fluid">
            <header className="mb-3 py-5 d-flex align-items-start flex-wrap justify-content-between">
                <section>
                    <h1 className="font-weight-bold">
                        Tecrum Create
                    </h1>
                    <h5 className="text-muted">
                        Employee portal
                    </h5>
                </section>

                <aside className="border-left border-dark p-4 ep-stat d-flex">
                    <section className="aside-p1 mr-5">
                        <h1 className="ep-stat-totalcount font-weight-bold">
                            {data.length}
                        </h1>
                        <p className="text-muted">
                            Total Employees
                        </p>
                    </section>

                    <section className="aside-p2">
                        <ul className="list-unstyled">
                            <li className="list-item">
                                <span className="text-muted mr-1">
                                    Active:
                                </span>
                                <strong>
                                    {_.filter(data, { status: 'Active' }).length}
                                </strong>
                            </li>
                            <li className="list-item">
                                <span className="text-muted mr-1">
                                    Suspended:
                                </span>
                                <strong>
                                    {_.filter(data, { status: 'Suspended' }).length}
                                </strong>
                            </li>
                            <li className="list-item">
                                <span className="text-muted mr-1">
                                    Inactive:
                                </span>
                                <strong>
                                    {_.filter(data, { status: 'Inactive' }).length}
                                </strong>
                            </li>
                            <li className="list-item">
                                <span className="text-muted mr-1">
                                    Terminated:
                                </span>
                                <strong>
                                    {_.filter(data, { status: 'Terminated' }).length}
                                </strong>
                            </li>
                        </ul>
                    </section>
                </aside>
            </header>

            <main>
                <section className="search-and-filter">
                    
                </section>

                <section className="employee-record table-responsive">
                    <table className="table table-striped table-borderless table-hover employee-records-table">
                        <thead className="thead-dark">
                        {(
                            <tr>
                                {columns.current.map(c => (
                                    <th key={c.field}>
                                        {c.title}
                                    </th>
                                ))}
                            </tr>
                        )}
                        </thead>
                        <tbody>
                        {data.map((td, index) => (
                            <tr onClick={() => {
                                history.push(`/view/${index}`)
                            }} className="cursor-pointer" key={td.employee_id}>
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
                                    {moment(td.date_of_birth).calendar()}
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
                                    {moment(td.date_employed).fromNow()}
                                </td>
                                <td>
                                    {td.is_employed.toString()}
                                </td>
                                <td>
                                    {td.status}
                                </td>
                                <td>
                                    {moment(td.created_at).fromNow()}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            </main>

        </section>
    );
}

export default App;
