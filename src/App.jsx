import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import EmployeeList from './components/EmployeeList';

import NavBar from './components/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
        <NavBar/>

      <Routes>
        
        <Route index element={ <EmployeeList/> }/>
        <Route path="/" element={ <EmployeeList/> }/>
        <Route path="/AddEmployee" element={ <AddEmployee/> }/>
        <Route path="/editEmployee/:id" element={<UpdateEmployee/>} />
      </Routes>

    </BrowserRouter>
    </>
  )
}

export default App
