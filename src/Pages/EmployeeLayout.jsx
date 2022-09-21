import React from 'react'
import Navbar from '../Components/Navbar'
import { Routes, Route } from "react-router-dom";
import HomePage from './Employee/Emp_Home'
import AttendancePage from './Employee/Emp_Attendance'
import ProfilePage from './Employee/Emp_Profile'

const EmployeeLayout = () => {
  return (
   <>
      <Navbar />

      <Routes>
          <Route index element={<HomePage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/profile" element={<ProfilePage />} />
      </Routes>
   </>
  )
}

export default EmployeeLayout