import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import employeeService from '../service/employeeService';

const UpdateEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        id: id,
        name: "",
        phoneNo: "",
        email: "",
    });

    const [loading, setLoading] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevState) => ({ ...prevState, [name]: value }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await employeeService.getEmployeeById(id);
                setEmployee(response.data);
            } catch (error) {
                console.log("Error fetching employee:", error);
            }
            setLoading(false);
        };
        fetchData();
    }, [id]);

    const updateEmployee = (e) => {
        e.preventDefault();
        employeeService
            .updateEmployee(employee, id)
            .then((response) => {
                console.log("Updated:", response);
                navigate("/");
            })
            .catch((error) => {
                console.log("Error updating employee:", error);
            });
    };

    if (loading) {
        return <p className="text-center text-white">Loading...</p>;
    }

    return (
        <div className='max-w-xl mx-40 bg-slate-800 my-20 rounded shadow py-4 px-8'>
            <div className='text-4xl tracking-wider font-bold text-center py-4 px-8'>
                <p>Update Employee</p>
            </div>

            <div className='my-2'>
                <input
                    type='text'
                    name='name'
                    value={employee.name}
                    onChange={handleChange}
                    className='w-full py-2 my-4 text-white bg-slate-700 px-2 rounded'
                    placeholder='Name'
                />
                <input
                    type='text'
                    name='phoneNo'
                    value={employee.phoneNo}
                    onChange={handleChange}
                    className='w-full py-2 my-4 text-white bg-slate-700 px-2 rounded'
                    placeholder='Phone Number'
                />
                <input
                    type='email'
                    name='email'
                    value={employee.email}
                    onChange={handleChange}
                    className='w-full py-2 my-4 text-white bg-slate-700 px-2 rounded'
                    placeholder='Email'
                />
            </div>

            <div className='flex my-4 space-x-4 px-20'>
                <button
                    onClick={updateEmployee}
                    className='bg-green-400 hover:bg-green-700 py-2 px-6 rounded text-white font-semibold'
                >
                    Update
                </button>
                <button
                    onClick={() => navigate('/')}
                    className='bg-red-400 hover:bg-red-700 py-2 px-6 rounded text-white font-semibold'
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default UpdateEmployee;
