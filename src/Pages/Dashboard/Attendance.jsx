import React from "react";
import TitleDashboard from "../../Components/TitleDashboard";
import { Link, Outlet } from "react-router-dom";
import { Icon } from "@iconify/react";

const Attendance = () => {
  return (
    <div className="w-full md:mx-8">
      <TitleDashboard
        Title="Attendance"
        Keterangan="Attendance from employees"
      />
      <div className="flex justify-between">

        <div className="flex my-8 space-x-8 font-semibold  text-gray-500">
          <Link to="../hadir" className=" hover:text-black">Attendance</Link>
          <Link to="Today" className=" hover:text-black">Today</Link>
          <Link to="Overtime" className=" hover:text-black">Overtime</Link>
          <Link to="LeaveRequest" className=" hover:text-black">Request</Link>
        </div>
        <div className="flex my-8 text-sm font-semibold text-gray-600">
          <Link to="../attendanceSettings">
            <button>
              <Icon
                icon="ant-design:setting-filled"
                className="text-lg text-gray-400 hover:text-gray-800"
              ></Icon>
            </button>
          </Link>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Attendance;
