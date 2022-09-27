import React from "react";
import TitleDashboard from "../../Components/TitleDashboard";
import { Link, Outlet } from "react-router-dom";
import { Icon } from "@iconify/react";

const Payroll = () => {
  return (
    <div className="w-full md:mx-8">
      <TitleDashboard
        Title="Payroll Management"
        Keterangan="Management payroll for employee"
      />
      <div className="flex justify-between">
        {/* <div>
                Tes1
            </div> */}

        <div className="flex my-8 space-x-8 font-semibold text-gray-500">
          <Link to="../payroll" className=" hover:text-black">gross salary</Link>
          <Link to="SalaryDeductions" className=" hover:text-black">salary deductions</Link>
        </div>
        {/* <div className="flex my-8 text-sm font-semibold text-gray-600">
        <Link to="../attendanceSettings">
          <button>
            <Icon
              icon="ant-design:setting-filled"
              className="text-lg text-gray-400 hover:text-gray-800"
            ></Icon>
          </button>
          </Link>
        </div> */}
      </div>

      <Outlet />
    </div>
  )
}

export default Payroll