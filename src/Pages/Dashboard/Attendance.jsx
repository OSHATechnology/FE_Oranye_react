import React from "react";
import TitleDashboard from "../../Components/TitleDashboard";
import { Link,Outlet } from "react-router-dom";

const Attendance = () => {
    return (
        <div className="w-full md:mx-8">
            <TitleDashboard
                Title="Attendance"
                Keterangan="Attendance from employees"
            />
    
            <div className="flex mt-8 space-x-8 text-sm font-semibold text-gray-600">
                <Link to="../hadir">Attendance</Link>
                <Link to="Today">Today</Link>
                <Link to="Overtime">Overtime</Link>
            </div>
            

            <Outlet />
        </div>
    );
};

export default Attendance;
