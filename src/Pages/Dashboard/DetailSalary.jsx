import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import RupiahMoneyFormat from "../../Components/RupiahMoneyFormat";
import TitleDashboard from "../../Components/TitleDashboard";
import ConfigHeader from "../Auth/ConfigHeader";

const DetailSalary = () => {
  const paramsData = useParams();
  const [detailSalary, setDetailSalary] = useState([]);
  // const [dataEmp, setDataEmp] = useState([
  //   {
  //     employeeId: "",
  //     name: "",
  //     photo: "",
  //     birthDate: "",
  //     gender: "",
  //     role: "",
  //     email: "",
  //     phone: "",
  //     address: "",
  //     isActive: "",
  //     emailVerifiedAt: "",
  //     joinedAt: "",
  //     resignedAt: "",
  //     statusHire: {
  //       id: "",
  //       status: "",
  //     },
  //   },
  // ]);

  const fetchDataDetailSalary = async () => {
    const data = await axios.get(`/api/salary/${paramsData.id}`, ConfigHeader);
    setDetailSalary(data.data.data);
  };


  useEffect(() => {
    fetchDataDetailSalary()

  }, [paramsData]);
  // console.log(detailSalary)
  return (
    <div className="w-full md:mx-8 space-y-8">
      <TitleDashboard
        Title="Detail Salary from Employee"
        Keterangan="Slip Gaji"
      />

      <div className="flex gap-2 items-center">
        <Link
          to={`../emp/${detailSalary.employee && detailSalary.employee.id}/salary`}
          className="flex gap-1 items-center text-blue-400 hover:text-blue-700 w-fit"
        >
          <Icon icon="bi:arrow-left" className="text-sm  font-medium"></Icon>
          <p className="text-sm  font-medium hover:font-bold">
            Back to Salary Employee
          </p>
        </Link>
      </div>

      <div className="border border-slate-100 rounded shadow p-2 space-y-2">
        <div className="flex justify-between text-xs font-semibold border-b border-slate-400">
          <p>Project Oranye</p>
          <p>SALARY SLIP</p>
        </div>

        <div>
          <table className="text-sm font-semibold text-slate-800">
            <tbody>
              <tr>
                <td>Name</td>
                <td className="px-2">:</td>
                <td>{detailSalary.employee && detailSalary.employee.name}</td>
              </tr>
              <tr>
                <td>Role</td>
                <td className="px-2">:</td>
                <td>{detailSalary.employee && detailSalary.employee.role}</td>
                {/* <td>{dataEmp.role && dataEmp.role.role}</td> */}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="md:flex md:space-y-0 space-y-2 gap-8">
          <div className="basis-1/2  ">
            <div className=" border-b border-t border-slate-800">
              <p className="text-bold font-bold text-slate-800">Gross Salary</p>
            </div>
            <div className="flex">
              <div className="basis-3/5 text-xs md:text-sm text-slate-800 font-medium">
                <p>Basic Salary</p>
                {/* <p className="font-semibold">Allowance</p>
                <p className="text-xs text-gray-400 list-none ml-2">
                  <li>Allowance 1</li>
                  <li>Allowance 2</li>
                </p> */}
                <p>Overtime fee</p>
                <p className="font-semibold">Allowance & Insurance</p>
                <p className="text-xs text-gray-400 list-none ml-2">
                  {detailSalary.allowance_item && detailSalary.allowance_item.map((item) => (
                    <li>{item.name}</li>
                  ))}
                </p>
                <p>Bonus</p>
                <p className="font-bold ">Total</p>
            </div>
            <div className="basis-2/5  text-xs md:text-sm text-slate-800 font-medium text-right">
                <p>{detailSalary.basic_salary}</p>
                {/* <p className="font-semibold">300.000</p>
                <p className="text-xs text-gray-400 list-none ml-2" >
                  <li>100.000</li>
                  <li>200.000</li>
                </p> */}
                <p>{detailSalary.overtime_fee}</p>
                <p className="font-semibold">&nbsp;</p>
                <p className="text-xs text-gray-400 list-none ml-2">
                  {detailSalary.allowance_item && detailSalary.allowance_item.map((item) => (
                    <>
                    <li>{item.fee}</li>
                    </>
                  ))}
                </p>
                <p>{detailSalary.bonus}</p>
                <p className="font-bold">{detailSalary.gross}</p>
            </div>
            </div>
          </div>
          <div className="basis-1/2 ">
            <div className="border-b border-t border-slate-800 text-bold font-bold text-slate-800">
              <p>Salary Deductions</p>
            </div>
            <div className="flex ">
              <div className="basis-3/5 text-xs md:text-sm text-slate-800 font-medium">
                <p>Attendance</p>
                <p>Loan</p>
                <p>Tax</p>
                <p>Insurance</p>

                <p className="font-bold ">Total</p>
              </div>
              <div className="basis-2/5  text-xs md:text-sm text-slate-800 font-medium">
                <p>5%</p>
                <p>0</p>
                <p>5%</p>
                <p>0</p>

                <p>23023</p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:flex w-full border-b border-t border-slate-600">
          <div className="w-full  ">
            <div className="flex ">
              <div className="basis-3/5 text-xs md:text-sm text-slate-800 font-medium">
                <p className="font-bold ">Take Home Pay</p>
              </div>
              <div className="basis-2/5 text-right  text-xs md:text-sm text-slate-800 font-medium">
                <p className="font-bold ">Rp. 10.00,-</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSalary;
