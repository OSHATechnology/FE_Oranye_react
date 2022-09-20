import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Sidebar from '../Components/Sidebar';
// import Dashboard from "../Pages/Dashboard/Dashboard";
import Dashboard from "./Dashboard";
import Role from "../Pages/Dashboard/RolePermissions";
import Hadir from "../Pages/Dashboard/Attendance";
import Emp from "../Pages/Dashboard/Employee";
import Mitra from "../Pages/Dashboard/Partner";
import Detail from "../Pages/Dashboard/EmployeeDetail";
import AddRole from "../Pages/Dashboard/AddRole";
import Today from "../Pages/Dashboard/Attendance/Today";
import Overtime from "../Pages/Dashboard/Attendance/Overtime";
import Attendance from "../Pages/Dashboard/Attendance/Attendance";
// import ProtectedRoute from "./Auth/ProtectedRoute";
import Login from "./Auth/Login";




export default function Blank() {
    // const {token} = useAuth();
    // console.log('hash', location.hash);
    // console.log('pathname', location.pathname);
    // console.log('search', location.search);
    return (
        <>
            {/* <ModalDelete /> */}
            
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="login" element={<Login />} />
                    <Route path="dashboard/*" element={<Dashboard />} />
                </Routes>
                {/* <div className="flex"> */}
                
                {/* <Sidebar /> */}
                {/* <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
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
                    <Route path="addRole" element={<AddRole />} />
                </Routes> */}
                {/* </div> */}

            </BrowserRouter>
        </>

    );
}
