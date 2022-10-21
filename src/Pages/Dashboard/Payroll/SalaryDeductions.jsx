import axios from "axios";
import React, { useEffect, useState } from "react";
import Search from "../../../Components/Search";
import ConfigHeader from "../../Auth/ConfigHeader";
import Spinner2 from "../../../Components/Spinner2";
import RupiahMoneyFormat from "../../../Components/RupiahMoneyFormat";

const SalaryDeductions = () => {
  const [dataDeduction, setDataDeduction] = useState([]);

  const fetchDataDeduction = async (page = 1, search = "") => {
    try {
      const data = await axios.get(`/api/salary?type=deduction&search=${search}&page=${page}`, ConfigHeader);
      setDataDeduction(data.data.data);
      console.log(data.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDataDeduction();
  }, []);

  return (
    <div className="w-full space-y-8">

      <div className="space-y-2 border rounded shadow p-2">
        <div className="md:flex justify-between items-center space-y-4 md:space-y-0">
          <div className="px-2 flex items-center gap-2">
            <input
              type="month"
              // defaultValue={now}
              name=""
              id="customDate"
              className="h-6 rounded border border-gray-400 text-xs text-gray-600"
            />
          </div>
          <Search />
        </div>
        <table className="w-full">
          <thead className="bg-slate-200 h-10 border-b border-slate-500 font-bold ">
            <tr>
              <th>No</th>
              <th>Employee</th>
              <th>Kehadiran</th>
              <th>Pinjaman</th>
              <th>Pajak</th>
              <th>BPJS</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium text-slate-600 text-center">
            {
              dataDeduction.data ? dataDeduction.data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="text-start">
                      <div className="w-fit">
                        <p className="text-xs text-slate-400">{item.empId}</p>
                        <p>{item.empName}</p>
                      </div>
                    </td>
                    <td>{item.percentAttendance} %</td>
                    <td><RupiahMoneyFormat num={item.totalLoan} />{ }</td>
                    <td>{item.totalTax} %</td>
                    <td><RupiahMoneyFormat num={item.totalInsurance} /></td>
                    <td><RupiahMoneyFormat num={item.totalDeduction} /></td>
                  </tr>
                )
              }
              ) : (
                <tr>
                  <td colSpan="7" className="p-2"><Spinner2 /></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SalaryDeductions