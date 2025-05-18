import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import employeeService from '../service/employeeService'; // ✅ Assumes this file uses REACT_APP_API_URL

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        name: "",
        phoneNo: "", // ✅ Ensure phoneNo is part of the state
        email: "",
    });

    const navigate = useNavigate();

    // ✅ Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevState) => ({ ...prevState, [name]: value }));
    };

    // ✅ Reset form fields
    const reset = (e) => {
        e.preventDefault();
        setEmployee({
            name: "",
            phoneNo: "",
            email: "",
        });
    };

    // ✅ Save employee data to backend
    const saveEmployee = (e) => {
        e.preventDefault();
        console.log("Sending Employee Data:", employee);

        employeeService
            .saveEmployee(employee) // ✅ This function should call your backend using API URL from .env
            .then((response) => {
                console.log("Saved:", response);
                navigate("/"); // ✅ Redirect to home page
            })
            .catch((error) => {
                console.log("Error saving employee:", error);
            });
    };

    return (
        <div className='max-w-xl mx-40 bg-slate-800 my-20 rounded shadow py-4 px-8'>
            <div className='text-4xl tracking-wider font-bold text-center py-4 px-8 text-white'>
                <p>Add New Employee</p>
            </div>

            <div className='max-10 my-2'>
                <input
                    type='text'
                    name='name'
                    value={employee.name}
                    onChange={handleChange}
                    className='w-full py-2 my-4 text-white bg-transparent border-b border-white'
                    placeholder='Name'
                />
                <input
                    type='text'
                    name='phoneNo'
                    value={employee.phoneNo}
                    onChange={handleChange}
                    className='w-full py-2 my-4 text-white bg-transparent border-b border-white'
                    placeholder='Phone Number'
                />
                <input
                    type='email'
                    name='email'
                    value={employee.email}
                    onChange={handleChange}
                    className='w-full py-2 my-4 text-white bg-transparent border-b border-white'
                    placeholder='Email'
                />
            </div>

            <div className='flex my-4 space-x-4 px-20'>
                <button onClick={saveEmployee} className='bg-green-400 hover:bg-green-700 py-2 px-6 rounded'>
                    Save
                </button>
                <button onClick={reset} className='bg-blue-400 hover:bg-blue-700 py-2 px-6 rounded'>
                    Clear
                </button>
                <button onClick={() => navigate('/')} className='bg-red-400 hover:bg-red-700 py-2 px-6 rounded'>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default AddEmployee;
