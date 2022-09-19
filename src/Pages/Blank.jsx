import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from '../Components/Sidebar';
import Dashboard from "../Pages/Dashboard/Dashboard";
import Role from "../Pages/Dashboard/RolePermissions";
import Hadir from "../Pages/Dashboard/Attendance";
import Emp from "../Pages/Dashboard/Employee";
import Mitra from "../Pages/Dashboard/Partner";
import Detail from "../Pages/Dashboard/EmployeeDetail";
import Today from "../Pages/Dashboard/Attendance/Today";
import Overtime from "../Pages/Dashboard/Attendance/Overtime";
import Attendance from "../Pages/Dashboard/Attendance/Attendance";
import ModalDelete from "../Components/Modal/ModalDelete"


export default function Blank() {
    // console.log('hash', location.hash);
    // console.log('pathname', location.pathname);
    // console.log('search', location.search);
    return (
        <div className="flex">
            {/* <ModalDelete /> */}
            <BrowserRouter>
                <Sidebar />

                <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="role" element={<Role />} />
                    <Route path="hadir" element={<Hadir />}>
                        <Route index element={<Attendance />} />
                        <Route path="Today" element={<Today />} />
                        <Route path="Overtime" element={<Overtime />} />
                    </Route>
                    <Route path="emp" element={<Emp />} />
                    <Route path="mitra" element={<Mitra />} />
                    <Route path="emp/:id" element={<Detail />} />
                </Routes>

            </BrowserRouter>
        </div>

    );
}
