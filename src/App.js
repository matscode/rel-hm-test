import React, {useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import faker from 'faker';
import * as _ from 'lodash'
import moment from "moment";
import jsonCSV from 'json-csv'

function App () {
    // history
    const history = useHistory();

    const [search, setSearch] = useState('');
    const [confirmationFilter, setConfirmationFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [fileContent, setFileContent] = useState('');
    // generate some table data
    const [numOfRecord] = useState(5);
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
        loadEmployeeData()
    }, [numOfRecord])

    // persist data
    useEffect(() => {
        localStorage.setItem('employees', JSON.stringify(data));
    }, [data]);

    function loadEmployeeData () {
        const td = [];
        const gd = localStorage.getItem('employees') || '[]';
        const gdCount = JSON.parse(gd).length
        // generate records if none exist
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
            makeDownloadableCSV(td)
        } else {
            setData(JSON.parse(gd));
            makeDownloadableCSV(JSON.parse(gd))
        }
    }

    function makeDownloadableCSV (data) {
        const csvOption = {
            fields:
                [
                    {
                        name: 'first_name',
                        label: 'First name',
                    },
                    {
                        name: 'last_name',
                        label: 'Last name',
                    },
                    {
                        name: 'date_of_birth',
                        label: 'Date of Birth',
                    },
                    {
                        name: 'gender',
                        label: 'Gender',
                    },
                    {
                        name: 'phone_number',
                        label: 'Phone Number',
                    },
                    {
                        name: 'email_address',
                        label: 'Email Address',
                    },
                    {
                        name: 'home_address',
                        label: 'Home Address',
                    },
                    {
                        name: 'department',
                        label: 'Department',
                    },
                    {
                        name: 'date_employed',
                        label: 'Date Employed',
                    },
                    {
                        name: 'date_confirmed',
                        label: 'Date Confirmed',
                    },
                    {
                        name: 'is_employed',
                        label: 'Is Employed',
                    },
                    {
                        name: 'status',
                        label: 'Status',
                    },
                    {
                        name: 'created_at',
                        label: 'Created At',
                    },
                ],
        };

        jsonCSV
            .buffered(data, csvOption)
            .then((csv) => {
                setFileContent(`data:text/plain;charset=utf-8,${encodeURIComponent(csv)}`);
            })
            .catch((e) => {
                console.log(e)
                alert('There is an error generating CSV for download, you can however continue to use the app')
            })
    }

    function handleSearch (e) {
        const sq = e.target.value;
        setSearch(sq)
    }

    function handleConfirmFilter (e) {
        const filter = e.target.value;
        setConfirmationFilter(filter)
    }

    function handleStatusFilter (e) {
        const filter = e.target.value;
        setStatusFilter(filter)
    }

    function clearFilters () {
        setSearch('')
        setConfirmationFilter('')
        setStatusFilter('')
    }

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
                            <li className="list-item">
                                <span className="text-muted mr-1">
                                    Confirmed:
                                </span>
                                <strong>
                                    {_.filter(data, (v) => v.date_confirmed).length}
                                </strong>
                            </li>
                        </ul>
                    </section>
                </aside>
            </header>

            <main>
                <section className="search-and-filter mb-3 d-flex align-items-center">
                    <section className="mr-3">
                        <input type="text"
                               value={search}
                               className="form-control bg-light"
                               placeholder="Search for employee"
                               onChange={(e) => handleSearch(e)}/>
                    </section>

                    <section className="d-flex align-items-center border-left pl-3">
                        <section className="d-flex align-items-center">
                        <span className="text-info text-nowrap mr-3">
                            Filter by
                        </span>

                            <span className="text-nowrap mr-2">
                            => Confirmation
                        </span>
                            <select value={confirmationFilter}
                                    onChange={(e) => handleConfirmFilter(e)}
                                    className="form-control bg-light mr-3">
                                <option value="">-- select --</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="unconfirmed">Unconfirmed</option>
                            </select>

                            <span className="text-nowrap mr-2">
                            => Status
                        </span>
                            <select value={statusFilter}
                                    onChange={(e) => handleStatusFilter(e)}
                                    className="form-control bg-light mr-2">
                                <option value="">-- Select --</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Terminated">Terminated</option>
                                <option value="Suspended">Suspended</option>
                            </select>

                            {search || confirmationFilter || statusFilter
                                ? <button className="btn btn-danger btn-sm text-nowrap"
                                          onClick={() => clearFilters()}>
                                    Clear filters
                                </button>
                                : null}
                        </section>
                    </section>
                    {fileContent &&
                    <section className="ml-auto">
                        <a href={fileContent}
                           download={faker.random.uuid()}>
                            Download employee data
                        </a>
                    </section>}
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
                        {data
                            .filter((std) => {
                                if (search) {
                                    return std.first_name.toLowerCase().indexOf(search)!== -1
                                        || std.last_name.toLowerCase().indexOf(search)!== -1
                                        || std.email_address.toLowerCase().indexOf(search)!== -1
                                        || std.department.toLowerCase().indexOf(search)!== -1;
                                }

                                // no filter
                                return true;
                            })
                            .filter((cftd) => {
                                if (confirmationFilter==='confirmed' && !!cftd.date_confirmed) {
                                    return true;
                                } else if (confirmationFilter==='unconfirmed' && !cftd.date_confirmed) {
                                    return true;
                                } else if (!confirmationFilter) {
                                    return true;
                                }

                                // no filter
                                return false;
                            })
                            .filter((sftd) => {
                                if (statusFilter) {
                                    return sftd.status.toLowerCase()===statusFilter.toLowerCase();
                                }

                                // no filter
                                return true;
                            })
                            .map((td, index) => (
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
