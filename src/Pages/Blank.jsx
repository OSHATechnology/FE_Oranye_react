import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Sidebar from '../Components/Sidebar';
// import Dashboard from "../Pages/Dashboard/Dashboard";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Login from "./Auth/Login";
import Employee from "./EmployeeLayout";
import { GetAuthData } from "./Auth/AuthProvider";
import GuestRoute from "./Auth/GuestRoute";



export default function Blank() {
    const user = GetAuthData()[0];

    return (
        <>
            {/* <ModalDelete /> */}

            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<ProtectedRoute user={user}><Employee auth={user} /></ProtectedRoute>} />
                    <Route path="login" element={<GuestRoute user={user}><Login /></GuestRoute>} />
                    <Route path="dashboard/*" element={<ProtectedRoute user={user}><Dashboard auth={user} /></ProtectedRoute>} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>

            </BrowserRouter>
        </>

    );
}
