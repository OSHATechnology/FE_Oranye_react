import React, { useEffect,useState } from 'react';
import AuthenticatedLayout from './Dashboard/AuthenticatedLayout';
import Sidebar from '../Components/Sidebar';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
import { AuthRedirect } from './Auth/AuthProvider';
import AllowanceAdd from './Dashboard/AllowanceAdd';
import LeaveRequest from './Dashboard/Attendance/LeaveRequest';
import NetSalary from './Dashboard/Payroll/NetSalary';
import RoleEdit from './Dashboard/RoleEdit';
import Alert from '../Components/Modal/Alert';
// import Spinner from '../Components/Spinner';

export default function Dashboard(props) {
    const navigate = useNavigate();

    const [showAlert, setShowAlert] = useState(false); 
    const [alertMsg, setAlertMsg] = useState('');
    const [alertColor, setalertColor] = useState('');

    const alertData = (type,msg) => {
        setShowAlert(true);
        setAlertMsg(msg);
        switch (type) {
            case 'success':
                setalertColor('green');
                break;
            case 'failed':
                setalertColor('red');
                break;
            default:
                setalertColor('green');
                break;
        }
        setTimeout(() => {
            setShowAlert(false);
        }, 2500);
    }

    useEffect(() => {
        if (props.auth.role !== 'admin') {
            navigate(AuthRedirect(props.auth));
        }
    }, [props, navigate])

    return (
        <div className="flex h-max">
            <AuthenticatedLayout
                auth={props.auth}
                errors={props.errors}
            >
                {showAlert && <Alert text={alertMsg} color={alertColor} />}
                <Sidebar />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="role" element={<Role />} />
                    <Route path="hadir" element={<Hadir />}>
                        <Route index element={<Attendance />} />
                        <Route path="Today" element={<Today />} />
                        <Route path="Overtime" element={<Overtime />} />
                        <Route path="LeaveRequest" element={<LeaveRequest />} />
                    </Route>
                    <Route path="payroll" element={<Payroll />}>
                        <Route index element={<GrossSalary />} />
                        <Route path="SalaryDeductions" element={<SalaryDeductions />} />
                        <Route path="NetSalary" element={<NetSalary />} />
                        <Route path="Loan" element={<Loan alert={alertData} />} />
                    </Route>
                    <Route path="emp" element={<Emp alert={alertData} />} />
                    <Route path="mitra" element={<Mitra />} />
                    <Route path="team" element={<Teams alert={alertData} />} />
                    <Route path="insurance" element={<Insurance />} />
                    <Route path="allowance" element={<Allowance />} />
                    <Route path="team/:id" element={<MemberTeam alert={alertData} />} />
                    <Route path="payroll/LoanPayment/:id" element={<LoanPayment />} />
                    <Route path="emp/:id/family" element={<Family />} />
                    <Route path="emp/:id/Salary" element={<Salary />} />
                    <Route path="DetailSalary/:id" element={<DetailSalary />} />
                    <Route path="manageInsurance/:id" element={<ManageInsurance />} />
                    <Route path="emp/:id" element={<Detail />} />
                    <Route path="addRole" element={<AddRole />} />
                    <Route path="RoleEdit" element={<RoleEdit />} />
                    <Route path="attendanceSettings" element={<AttendanceSettings />} />
                    <Route path="allowanceAdd" element={<AllowanceAdd />} />
                </Routes>

            </AuthenticatedLayout>
        </div>
    );
}
