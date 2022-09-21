import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Sidebar from '../Components/Sidebar';
// import Dashboard from "../Pages/Dashboard/Dashboard";
import Dashboard from "./Dashboard";
// import ProtectedRoute from "./Auth/ProtectedRoute";
import Login from "./Auth/Login";
import Employee from "./EmployeeLayout";



export default function Blank() {
    // const {token} = useAuth();
    return (
        <>
            {/* <ModalDelete /> */}
            
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Employee />} />
                    <Route path="login" element={<Login />} />
                    <Route path="dashboard/*" element={<Dashboard />} />
                    {/* <Route path="dashboard/*" element={<ProtectedRoute element={<Dashboard />} />} /> */}
                </Routes>

            </BrowserRouter>
        </>

    );
}
