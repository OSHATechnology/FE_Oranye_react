import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from './Employee/Emp_Home'
import AttendancePage from './Employee/Emp_Attendance'
import ProfilePage from './Employee/Emp_Profile'
import { AuthRedirect } from './Auth/AuthProvider';

const EmployeeLayout = ({ auth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.role !== 'employee') {
      navigate(AuthRedirect(auth));
    }
  }, [auth, navigate])

  return (
    <>
      <Navbar />

      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  )
}

export default EmployeeLayout