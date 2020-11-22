import React, {useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import * as Yup from 'yup';
import moment from "moment";

// import * as _ from 'lodash'
import {ErrorMessage, Field, Form, Formik} from "formik";

function ViewEmployee () {
    // history
    const history = useHistory();
    const { id } = useParams();
    const [employees, setEmployees] = useState([]);
    const [employeeData, setEmployeeData] = useState({});

    useEffect(() => {
        const employeesString = localStorage.getItem('employees') || '[]';
        const employees = JSON.parse(employeesString);
        setEmployees(employees)

        if (!employees.length || !employees[id]) {
            history.push('/');
        }

        setEmployeeData(employees[id])
    }, [id, history]);

    function confirmThisEmployee () {
        employees[id].date_confirmed = moment().format('YYYY-MM-DD')
        setEmployeeData(employees[id])
        // overwrite employee data in storage
        localStorage.setItem('employees', JSON.stringify(employees));
    }

    return (
        <section className="container-fluid">
            <header className="mb-3 py-5 d-flex align-items-start">
                <section>
                    <div>
                        <Link to={'/'}>&lt; Back</Link>
                    </div>
                    <h1 className="font-weight-bold">
                        View Employee
                    </h1>
                </section>
            </header>

            <main>
                <section className="admins-actions text-right mb-5 mb-md-auto pb-4 pb-md-0">
                    <button className="btn btn-outline-info mr-3"
                            disabled={true}
                            title={'WIP'}>
                        Edit Information
                    </button>

                    {!employeeData.date_confirmed
                        ? <button className="btn btn-primary"
                                  onClick={() => confirmThisEmployee()}>
                            Confirm Employee
                        </button>
                        : null}
                </section>

                <section className="border my-3 p-3 rounded">
                    <section className="row">
                        <section className="col-md-2">
                            <section className="text-center">
                                <section className="position-relative pp-wrapper">
                                    <img
                                        src={employeeData.profile_picture}
                                        alt=""
                                        className="p-2 border border-info bg-white profile-picture rounded"/>
                                </section>
                                <section className="text-center">
                                    <h6 className="">
                                        Employee ID
                                    </h6>
                                    <h4 className="font-weight-bold">
                                        {employeeData.employee_id}
                                    </h4>
                                </section>
                            </section>
                        </section>

                        <section className="col-md-10">
                            <Formik
                                enableReinitialize={true}
                                initialValues={employeeData}
                                validationSchema={Yup.object({
                                    first_name: Yup
                                        .string()
                                        .max(15, 'Must be 15 characters or less')
                                        .required('Required'),

                                    last_name: Yup
                                        .string()
                                        .max(20, 'Must be 20 characters or less')
                                        .required('Required'),

                                    email_address: Yup
                                        .string()
                                        .email('Invalid email address')
                                        .required('Required'),

                                    home_address: Yup
                                        .string()
                                        .required('Required'),
                                })}

                                onSubmit={(values, { setSubmitting }) => {
                                    employees[id] = values;
                                    // overwrite employee data in storage
                                    localStorage.setItem('employees', JSON.stringify(employees));
                                    setEmployeeData(values)
                                    setSubmitting(false);
                                    history.push('/')
                                }
                                }>
                                {formik => (
                                    <section className="container-fluid">
                                        <Form>
                                            <section className="row mb-3">
                                                <h4 className="col-12">
                                                    Personal Information
                                                </h4>

                                                <div className="form-group col-md-3">
                                                    <label htmlFor="first_name"
                                                           className="d-block small font-weight-bold">
                                                        First Name
                                                    </label>
                                                    <Field type="text"
                                                           name="first_name"
                                                           id="first_name"
                                                           className="form-control bg-light"/>
                                                    <ErrorMessage
                                                        name="first_name"
                                                        component="div"
                                                        className="text-danger small"/>
                                                </div>
                                                <div className="form-group col-md-3">
                                                    <label htmlFor="last_name"
                                                           className="d-block small font-weight-bold">
                                                        Last Name
                                                    </label>
                                                    <Field type="text"
                                                           name="last_name"
                                                           id="last_name"
                                                           className="form-control bg-light"/>
                                                    <ErrorMessage
                                                        name="last_name"
                                                        component="div"
                                                        className="text-danger small"/>
                                                </div>

                                                <div className="form-group col-md-3">
                                                    <label htmlFor="date_of_birth"
                                                           className="d-block small font-weight-bold">
                                                        Date of Birth
                                                    </label>
                                                    <Field type="date"
                                                           name="date_of_birth"
                                                           id="date_of_birth"
                                                           className="form-control bg-light"/>
                                                    <ErrorMessage
                                                        name="date_of_birth"
                                                        component="div"
                                                        className="text-danger small"/>
                                                </div>

                                                <div className="form-group col-md-3">
                                                    <label htmlFor="gender"
                                                           className="d-block small font-weight-bold">
                                                        Gender
                                                    </label>
                                                    <Field as="select"
                                                           name="gender"
                                                           id="gender"
                                                           className="form-control bg-light">
                                                        <option value="">-- Select --</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                    </Field>
                                                    <ErrorMessage
                                                        name="gender"
                                                        component="div"
                                                        className="text-danger small"/>
                                                </div>
                                            </section>

                                            <section className="row mb-3">
                                                <h4 className="col-12">
                                                    Contact Information
                                                </h4>

                                                <div className="form-group col-md-3">
                                                    <label htmlFor="phone_number"
                                                           className="d-block small font-weight-bold">
                                                        Phone Number
                                                    </label>
                                                    <Field type="text"
                                                           name="phone_number"
                                                           id="phone_number"
                                                           className="form-control bg-light"/>
                                                    <ErrorMessage
                                                        name="phone_number"
                                                        component="div"
                                                        className="text-danger small"/>
                                                </div>
                                                <div className="form-group col-md-3">
                                                    <label htmlFor="email_address"
                                                           className="d-block small font-weight-bold">
                                                        Email Address
                                                    </label>
                                                    <Field type="email"
                                                           name="email_address"
                                                           id="email_address"
                                                           className="form-control bg-light"/>
                                                    <ErrorMessage
                                                        name="email_address"
                                                        component="div"
                                                        className="text-danger small"/>
                                                </div>

                                                <div className="form-group col-md-3">
                                                    <label htmlFor="home_address"
                                                           className="d-block small font-weight-bold">
                                                        Address
                                                    </label>
                                                    <Field type="text"
                                                           name="home_address"
                                                           id="date_of_birth"
                                                           className="form-control bg-light"/>
                                                    <ErrorMessage
                                                        name="home_address"
                                                        component="div"
                                                        className="text-danger small"/>
                                                </div>

                                            </section>

                                            <section className="row mb-3">
                                                <h4 className="col-12">
                                                    Employee Information
                                                </h4>

                                                <div className="form-group col-md-3">
                                                    <label htmlFor="date_employed"
                                                           className="d-block small font-weight-bold">
                                                        Date Employed
                                                    </label>
                                                    <Field type="date"
                                                           name="date_employed"
                                                           id="date_employed"
                                                           className="form-control bg-light"/>
                                                    <ErrorMessage
                                                        name="date_employed"
                                                        component="div"
                                                        className="text-danger small"/>
                                                </div>
                                                <div className="form-group col-md-3">
                                                    <label htmlFor="date_confirmed"
                                                           className="d-block small font-weight-bold">
                                                        Date Confirmed
                                                    </label>
                                                    <Field type="date"
                                                           name="date_confirmed"
                                                           id="date_confirmed"
                                                           className="form-control bg-light"/>
                                                    <ErrorMessage
                                                        name="date_confirmed"
                                                        component="div"
                                                        className="text-danger small"/>
                                                </div>

                                                <div className="form-group col-md-3">
                                                    <label htmlFor="status"
                                                           className="d-block small font-weight-bold">
                                                        Current Status
                                                    </label>
                                                    <Field as="select"
                                                           name="status"
                                                           id="status"
                                                           className="form-control bg-light">
                                                        <option value="">-- Select --</option>
                                                        <option value="Active">Active</option>
                                                        <option value="Inactive">Inactive</option>
                                                        <option value="Terminated">Terminated</option>
                                                        <option value="Suspended">Suspended</option>
                                                    </Field>
                                                    <ErrorMessage
                                                        name="status"
                                                        component="div"
                                                        className="text-danger small"/>
                                                </div>

                                                <div className="form-group col-md-3">
                                                    <label htmlFor="department"
                                                           className="d-block small font-weight-bold">
                                                        Department
                                                    </label>
                                                    <Field as="select"
                                                           name="department"
                                                           id="department"
                                                           className="form-control bg-light">
                                                        <option value="">-- Select --</option>
                                                        <option value="Engineering">Engineering</option>
                                                        <option value="Accounting">Accounting</option>
                                                        <option value="Sales & Marketing">Sales & Marketing</option>
                                                        <option value="Product">Product</option>
                                                    </Field>
                                                    <ErrorMessage
                                                        name="department"
                                                        component="div"
                                                        className="text-danger small"/>
                                                </div>
                                            </section>

                                            <section className="text-right">
                                                <button type="reset"
                                                        className="btn btn-outline-danger mr-3">
                                                    Cancel
                                                </button>

                                                <button type="submit"
                                                        className="btn btn-primary"
                                                        disabled={formik.isSubmitting}>
                                                    Save
                                                </button>
                                            </section>
                                        </Form>

                                    </section>
                                )}
                            </Formik>
                        </section>
                    </section>
                </section>
            </main>

        </section>
    );
}

export default ViewEmployee;
