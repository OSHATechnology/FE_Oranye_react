import React from 'react';
import AuthenticatedLayout from './Dashboard/AuthenticatedLayout';
import Sidebar from '../Components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Home from "../Pages/Dashboard/Home";
import Role from "../Pages/Dashboard/RolePermissions";
import Hadir from "../Pages/Dashboard/Attendance";
import Payroll from "../Pages/Dashboard/Payroll";
import Emp from "../Pages/Dashboard/Employee";
import Mitra from "../Pages/Dashboard/Partner";
import Teams from "../Pages/Dashboard/Teams";
import Insurance from "../Pages/Dashboard/Insurance";
import Detail from "../Pages/Dashboard/EmployeeDetail";
import MemberTeam from "../Pages/Dashboard/TeamMembers";
import ManageInsurance from "../Pages/Dashboard/ManageLayanan";
import AddRole from "../Pages/Dashboard/AddRole";
import AttendanceSettings from "../Pages/Dashboard/AttendanceSettings";
import Today from "../Pages/Dashboard/Attendance/Today";
import Overtime from "../Pages/Dashboard/Attendance/Overtime";
import Attendance from "../Pages/Dashboard/Attendance/Attendance";
import GrossSalary from "../Pages/Dashboard/Payroll/GrossSalary";
import SalaryDeductions from "../Pages/Dashboard/Payroll/SalaryDeductions";
import Loan from "./Dashboard/Payroll/Loan";
import Allowance from '../Pages/Dashboard/Allowance';
import LoanPayment from './Dashboard/LoanPayment';
import Family from './Dashboard/Family';
import Salary from './Dashboard/Salary';
import DetailSalary from './Dashboard/DetailSalary';
// import Spinner from '../Components/Spinner';

export default function Dashboard(props) {
    return (
        <div className="flex h-screen">
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
                    <Route path="payroll" element={<Payroll />}>
                        <Route index element={<GrossSalary />} />
                        <Route path="SalaryDeductions" element={<SalaryDeductions />} />
                        <Route path="Loan" element={<Loan />} />
                    </Route>
                    <Route path="emp" element={<Emp />} />
                    <Route path="mitra" element={<Mitra />} />
                    <Route path="team" element={<Teams />} />
                    <Route path="insurance" element={<Insurance />} />
                    <Route path="allowance" element={<Allowance />} />
                    <Route path="team/:id" element={<MemberTeam />} />
                    <Route path="payroll/LoanPayment" element={<LoanPayment />} />
                    <Route path="emp/:id/Family" element={<Family />} />
                    <Route path="emp/:id/Salary" element={<Salary />} />
                    <Route path="emp/:id/Salary/DetailSalary" element={<DetailSalary />} />
                    <Route path="manageInsurance" element={<ManageInsurance />} />
                    <Route path="emp/:id" element={<Detail />} />
                    <Route path="addRole" element={<AddRole />} />
                    <Route path="attendanceSettings" element={<AttendanceSettings />} />
                </Routes>

            </AuthenticatedLayout>
        </div>
    );
}
