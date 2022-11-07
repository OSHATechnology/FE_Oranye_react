import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./Employee/Emp_Home";
import AttendancePage from "./Employee/Emp_Attendance";
import ProfilePage from "./Employee/Emp_Profile";
import PerformancePage from "./Employee/Emp_performance";
import NotificationPage from "./Employee/Notifications";
import Alert from "../Components/Modal/Alert";
import { AuthRedirect } from "./Auth/AuthProvider";

const EmployeeLayout = ({ auth }) => {
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertColor, setalertColor] = useState("");

  const alertData = (type, msg) => {
    setShowAlert(true);
    setAlertMsg(msg);
    switch (type) {
      case "success":
        setalertColor("green");
        break;
      case "failed":
        setalertColor("red");
        break;
      default:
        setalertColor("green");
        break;
    }
    setTimeout(() => {
      setShowAlert(false);
    }, 2500);
  };

  useEffect(() => {
    if (auth === null) {
      navigate("/login");
    }
  }, [auth, navigate]);

  return (
    <>
    {showAlert && <Alert text={alertMsg} color={alertColor} />} 
      <Navbar />

      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/attendance" element={<AttendancePage alert={alertData} />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
};

export default EmployeeLayout;
