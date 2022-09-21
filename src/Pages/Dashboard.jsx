import React from 'react';
import AuthenticatedLayout from './Dashboard/AuthenticatedLayout';
import Sidebar from '../Components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Home from "../Pages/Dashboard/Home";
import Role from "../Pages/Dashboard/RolePermissions";
import Hadir from "../Pages/Dashboard/Attendance";
import Emp from "../Pages/Dashboard/Employee";
import Mitra from "../Pages/Dashboard/Partner";
import Teams from "../Pages/Dashboard/Teams";
import Detail from "../Pages/Dashboard/EmployeeDetail";
import MemberTeam from "../Pages/Dashboard/TeamMembers";
import AddRole from "../Pages/Dashboard/AddRole";
import Today from "../Pages/Dashboard/Attendance/Today";
import Overtime from "../Pages/Dashboard/Attendance/Overtime";
import Attendance from "../Pages/Dashboard/Attendance/Attendance";

export default function Dashboard(props) {
    return (
        <div className="flex">
            <AuthenticatedLayout
                auth={props.auth}
                errors={props.errors}
            >
                <Sidebar />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="role" element={<Role />} />
                    <Route path="hadir" element={<Hadir />}>
                        <Route index element={<Attendance />} />
                        <Route path="Today" element={<Today />} />
                        <Route path="Overtime" element={<Overtime />} />
                    </Route>
                    <Route path="emp" element={<Emp />} />
                    <Route path="mitra" element={<Mitra />} />
                    <Route path="team" element={<Teams />} />
                    <Route path="team/:id" element={<MemberTeam />} />
                    <Route path="emp/:id" element={<Detail />} />
                    <Route path="addRole" element={<AddRole />} />
                </Routes>
                
            </AuthenticatedLayout>
        </div>
    );
}
