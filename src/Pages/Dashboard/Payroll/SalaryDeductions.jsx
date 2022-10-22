import axios from "axios";
import React, { useEffect, useState } from "react";
import Search from "../../../Components/Search";
import ConfigHeader from "../../Auth/ConfigHeader";
import Spinner2 from "../../../Components/Spinner2";
import RupiahMoneyFormat from "../../../Components/RupiahMoneyFormat";
import moment from "moment";

const SalaryDeductions = () => {
  const [month, setMonth] = useState(moment().format("YYYY-MM"));
  const [dataDeduction, setDataDeduction] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDataDeduction = async (monthSalary = month, page = 1, search = "") => {
    try {
      const data = await axios.get(`/api/salary?type=deduction&month=${monthSalary}&search=${search}&page=${page}`, ConfigHeader);
      setDataDeduction(data.data.data);
      setIsLoading(false);
    } catch (error) {
      alert(error.response.data.message);
      setDataDeduction([]);
      setIsLoading(false);
    }
  };

  const handleSalary = async (e) => {
    setMonth(e.target.value);
    fetchDataDeduction(e.target.value);
    setIsLoading(true);
  }

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
              name=""
              id="customDate"
              max={moment().format("YYYY-MM")}
              onChange={handleSalary}
              value={month}
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
              isLoading ? (
                <tr>
                  <td colSpan="7" className="p-2"><Spinner2 /></td>
                </tr>
              ) : (
                dataDeduction.data ?
                  dataDeduction?.data?.length > 0 ? (
                    dataDeduction.data.map((item, index) => {
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
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="p-2">No data</td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan="7" className="p-2"><Spinner2 /></td>
                    </tr>
                  )
              )
            }
            {/* {
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
            } */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SalaryDeductions