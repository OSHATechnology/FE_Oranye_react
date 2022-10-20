import React from "react";
import TitleDashboard from "../../Components/TitleDashboard";
import { Link, Outlet } from "react-router-dom";
import { Icon } from "@iconify/react";

const Payroll = () => {

  const location = window.location.pathname;
  const parseLocation = location.split("/");
  const active = parseLocation[parseLocation.length - 1];

  const PayrollTabs = [
    {
      name: "Gross Salary",
      link: "../payroll",
      icon: "healthicons:money-bag-outline",
      as: 'payroll'
    },
    {
      name: "Salary Deductions",
      link: "SalaryDeductions",
      icon: "vaadin:money-exchange",
      as: 'SalaryDeductions'
    },
    {
      name: "NetSalary",
      link: "NetSalary",
      icon: "vaadin:money-deposit",
      as: 'NetSalary'
    },
    {
      name: "Loan",
      link: "Loan",
      icon: "game-icons:receive-money",
      as: 'Loan'
    },
  ];

  return (
    <div className="w-full md:mx-8">
      <TitleDashboard
        Title="Payroll Management"
        Keterangan="Management payroll for employee"
      />
      <div className="flex justify-between">

        {/* <div className="flex my-8 space-x-8 font-semibold text-gray-500">
          <Link to="../payroll" className=" hover:text-black">gross salary</Link>
          <Link to="SalaryDeductions" className=" hover:text-black">salary deductions</Link>
          <Link to="NetSalary" className=" hover:text-black">net salary</Link>
          <Link to="Loan" className=" hover:text-black">loan</Link>
        </div> */}

<div className="my-8 space-x-8 text-gray-500">
          <ul className="flex flex-wrap text-sm text-center ">
            {PayrollTabs.map((tab, index) => (
              <li
                key={index}
                className="mr-2"
              >
                <Link to={tab.link} className={"inline-flex p-4 rounded-t-lg border-b-2 items-center gap-2 border-transparent group" + (active === tab.as ? " border-gray-600 text-gray-900 font-bold" : " text-gray-400 font-semibold hover:border-gray-300 ")}>
                  <Icon icon={tab.icon} className="w-4 h-4" />
                  <span>{tab.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <Outlet />
    </div>
  )
}

export default Payroll