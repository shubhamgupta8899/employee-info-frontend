import axios from 'axios';

const Employee_SAPI_BASE_URL = "http://localhost:8080/employees";

class EmployeeService {
    saveEmployee(employee) {
        console.log("Sending request with:", employee); // ✅ Debugging
        return axios.post(Employee_SAPI_BASE_URL, {
            name: employee.name,
            phoneNo: employee.phoneNo, // ✅ Ensure this is sent
            email: employee.email
        });
    }

    getEmployees() {
        return axios.get(Employee_SAPI_BASE_URL);
    }

    getEmployeeById(id) { // ✅ Fixed missing `id` parameter
        return axios.get(`${Employee_SAPI_BASE_URL}/${id}`);
    }

    deleteEmployeeById(id) { // ✅ Fixed missing `id` parameter
        return axios.delete(`${Employee_SAPI_BASE_URL}/${id}`);
    }

    updateEmployeeById(employee, id) {
        return axios.put(`${Employee_SAPI_BASE_URL}/${id}`, employee);
    }
}

export default new EmployeeService();
