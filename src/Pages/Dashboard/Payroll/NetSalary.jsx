import axios from "axios";
import React, { useEffect, useState } from "react";
import RupiahMoneyFormat from "../../../Components/RupiahMoneyFormat";
import Search from "../../../Components/Search";
import Spinner2 from "../../../Components/Spinner2";
import ConfigHeader from "../../Auth/ConfigHeader";

const NetSalary = () => {
  const [dataNet, setDataNet] = useState([]);

  const fetchDataNet = async (page = 1, search = "") => {
    try {
      const data = await axios.get(`/api/salary?type=net&search=${search}&page=${page}`, ConfigHeader);
      setDataNet(data.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDataNet();
  }, []);

  return (
    <div className="w-full space-y-2 border rounded shadow p-2">
      <div className="md:flex justify-between items-center space-y-4 md:space-y-0">
        <div className="px-2 flex items-center gap-2">
          <input
            type="month"
            name=""
            id="customDate"
            className="h-6 rounded border border-gray-400 text-xs text-gray-600"
          />
        </div>
        <Search />
      </div>

      <div>
        <table className="w-full">
          <thead className="bg-slate-200 h-10 border-b border-slate-500 font-bold ">
            <tr>
              <th>No</th>
              <th>Employee</th>
              <th>Gross Salary</th>
              <th>Salary Deduction</th>
              <th>Net Salary</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium text-slate-600 text-center">
            {
              dataNet.data ? dataNet.data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="text-start">
                      <div className="w-fit">
                        <p className="text-xs text-slate-400">{item.empId}</p>
                        <p>{item.empName}</p>
                      </div>
                    </td>
                    <td><RupiahMoneyFormat num={item.gross_salary} /></td>
                    <td><RupiahMoneyFormat num={item.salary_deduction} /></td>
                    <td><RupiahMoneyFormat num={item.net_salary} /></td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan="5"><Spinner2 /></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default NetSalary