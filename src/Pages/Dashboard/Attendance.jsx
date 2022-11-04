import React from "react";
import TitleDashboard from "../../Components/TitleDashboard";
import { Link, Outlet } from "react-router-dom";
import { Icon } from "@iconify/react";

const Attendance = () => {
  const location = window.location.pathname;
  const parseLocation = location.split("/");
  const active = parseLocation[parseLocation.length - 1];

  const AttendanceTabs = [
    {
      name: "Attendance",
      link: "../hadir",
      icon: "fa-regular:calendar-alt",
      as: "hadir",
    },
    {
      name: "Today",
      link: "Today",
      icon: "bi:calendar-check",
      as: "Today",
    },
    {
      name: "Overtime",
      link: "Overtime",
      icon: "mdi:calendar-clock",
      as: "Overtime",
    },
    {
      name: "Leave Request",
      link: "LeaveRequest",
      icon: "bi:envelope-check",
      as: "LeaveRequest",
    },
  ];

  return (
    <div className="w-full md:mx-8">
      <TitleDashboard
        Title="Attendance"
        Keterangan="Attendance from employees"
      />
      <div className="flex justify-between">
        <div className="my-8 space-x-8 text-gray-500">
          <ul className="flex flex-wrap text-sm text-center ">
            {AttendanceTabs.map((tab, index) => (
              <li key={index} className="mr-2">
                <Link
                  to={tab.link}
                  className={
                    "inline-flex p-4 rounded-t-lg border-b-2 items-center gap-2 border-transparent group" +
                    (active === tab.as
                      ? " border-gray-600 text-gray-900 font-bold"
                      : " text-gray-400 font-semibold hover:border-gray-300 ")
                  }
                >
                  <Icon icon={tab.icon} className="w-4 h-4" />
                  <span>{tab.name}</span>
                </Link>
              </li>
            ))}
          </ul>
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
