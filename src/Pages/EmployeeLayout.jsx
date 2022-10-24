import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from './Employee/Emp_Home'
import AttendancePage from './Employee/Emp_Attendance'
import ProfilePage from './Employee/Emp_Profile'
import PerformancePage from './Employee/Emp_performance'
import NotificationPage from './Employee/Notifications'
import { AuthRedirect } from './Auth/AuthProvider';

const EmployeeLayout = ({ auth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (auth === null) {
      navigate('/login');
    }
  }, [auth, navigate])

  return (
    <>
      <Navbar />

      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  )
}

export default EmployeeLayout