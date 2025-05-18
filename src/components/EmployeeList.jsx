import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EmployeeList = () => {
    const [loading, setLoading] = useState(true);
    const [employee, setEmployee] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_BASE_URL}/api/employees`);
                setEmployee(response.data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const deleteEmployee = async (e, id) => {
        e.preventDefault();
        try {
            await axios.delete(`${API_BASE_URL}/api/employees/${id}`);
            setEmployee((prevEmployees) => prevEmployees.filter((emp) => emp.id !== id));
            console.log(`Employee with ID ${id} deleted successfully`);
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    const editEmployee = (e, id) => {
        e.preventDefault();
        navigate(`/editEmployee/${id}`);
    };

    return (
        <div className="container mx-auto my-8">
            <div>
                <button
                    onClick={() => navigate("/AddEmployee")}
                    className="bg-slate-600 hover:bg-blue-700 mx-40 my-12 font-semibold px-20 py-2 rounded text-white"
                >
                    Add Employee
                </button>
            </div>

            <div>
                <table className="shadow border-collapse w-full">
                    <thead className="bg-slate-600 text-white">
                        <tr>
                            <th className="px-6 py-3 uppercase tracking-wide">Name</th>
                            <th className="px-6 py-3 uppercase tracking-wide">Phone No</th>
                            <th className="px-6 py-3 uppercase tracking-wide">Email</th>
                            <th className="px-6 py-3 uppercase tracking-wide">Action</th>
                        </tr>
                    </thead>

                    {!loading && (
                        <tbody>
                            {employee.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-gray-500">
                                        No employees found.
                                    </td>
                                </tr>
                            ) : (
                                employee.map((emp) => (
                                    <tr key={emp.id} className="hover:bg-white hover:text-black">
                                        <td className="text-left px-6 py-4 whitespace-nowrap">{emp.name}</td>
                                        <td className="text-left px-6 py-4 whitespace-nowrap">{emp.phoneNo}</td>
                                        <td className="text-left px-6 py-4 whitespace-nowrap">{emp.email}</td>
                                        <td className="text-left px-6 py-4 whitespace-nowrap">
                                            <a
                                                onClick={(e) => editEmployee(e, emp.id)}
                                                className='hover:text-green-500 hover:cursor-pointer mr-4'
                                            >
                                                Edit
                                            </a>
                                            <a
                                                onClick={(e) => deleteEmployee(e, emp.id)}
                                                className='hover:text-red-500 hover:cursor-pointer'
                                            >
                                                Delete
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
