import axios from 'axios';

// Use environment variable for base URL
const Employee_SAPI_BASE_URL = process.env.REACT_APP_API_URL + "/employees";

class EmployeeService {
    saveEmployee(employee) {
        console.log("Sending request with:", employee);
        return axios.post(Employee_SAPI_BASE_URL, {
            name: employee.name,
            phoneNo: employee.phoneNo,
            email: employee.email
        });
    }

    getEmployees() {
        return axios.get(Employee_SAPI_BASE_URL);
    }

    getEmployeeById(id) {
        return axios.get(`${Employee_SAPI_BASE_URL}/${id}`);
    }

    deleteEmployeeById(id) {
        return axios.delete(`${Employee_SAPI_BASE_URL}/${id}`);
    }

    updateEmployeeById(employee, id) {
        return axios.put(`${Employee_SAPI_BASE_URL}/${id}`, employee);
    }
}

export default new EmployeeService();
