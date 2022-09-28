import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Sidebar from '../Components/Sidebar';
// import Dashboard from "../Pages/Dashboard/Dashboard";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Login from "./Auth/Login";
import Employee from "./EmployeeLayout";
import { GetAuthData } from "./Auth/AuthProvider";



export default function Blank() {
    const user = GetAuthData()[0];
    return (
        <>
            {/* <ModalDelete /> */}

            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<ProtectedRoute user={user}><Employee /></ProtectedRoute>} />
                    <Route path="login" element={<Login />} />
                    {/* <Route path="dashboard/*" element={<Dashboard />} /> */}
                    <Route path="dashboard/*" element={<ProtectedRoute user={user}><Dashboard /></ProtectedRoute>} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>

            </BrowserRouter>
        </>

    );
}
