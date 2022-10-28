import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import RupiahMoneyFormat from "../../../Components/RupiahMoneyFormat";
import Search from "../../../Components/Search";
import Spinner2 from "../../../Components/Spinner2";
import ConfigHeader from "../../Auth/ConfigHeader";

const GrossSalary = () => {
  const [month, setMonth] = useState(moment().format("YYYY-MM"));
  const [dataGross, setDataGross] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGrossSalary = async (monthSalary = month) => {
    try {
      const response = await axios.get(`api/salary?type=gross&month=${monthSalary}`, ConfigHeader);
      setDataGross(response.data);
      setIsLoading(false);
    } catch (error) {
      alert(error.response.data.message);
      setDataGross([]);
      setIsLoading(false);
    }
  };

  const handleSalary = async (e) => {
    setMonth(e.target.value);
    fetchGrossSalary(e.target.value);
    setIsLoading(true);
  }

  useEffect(() => {
    fetchGrossSalary();
  }, []);
  return (
    <div className="w-full space-y-2 border rounded shadow p-2">
      <div className="md:flex justify-between items-center space-y-4 md:space-y-0">
        <div className="px-2 flex items-center gap-2">
          <input
            type="month"
            name=""
            id="month"
            className="h-6 rounded border border-gray-400 text-xs text-gray-600"
            max={moment().add(1, 'M').format("YYYY-MM")}
            value={month}
            onChange={handleSalary}
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
              <th>Basic Salary</th>
              <th>Overtime</th>
              <th>Overtime Fee</th>
              <th>Allowance</th>
              <th>Bonus</th>
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
                dataGross ? (
                  dataGross?.data?.data?.length > 0 ? (
                    dataGross?.data?.data?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="text-start">
                          <div className="w-fit">
                            <p className="text-xs text-slate-400">{item.empId}</p>
                            <p>{item.empName}</p>
                          </div>
                        </td>
                        <td><RupiahMoneyFormat num={item.basicSalary} /></td>
                        <td>{item.totalOvertime !== 0 ? item.totalOvertime + ' Hrs' : '-'}</td>
                        <td><RupiahMoneyFormat num={item.overtimeFee} /></td>
                        <td><RupiahMoneyFormat num={item.totalAllowance} /></td>
                        <td><RupiahMoneyFormat num={item.totalBonus} /></td>
                        <td><RupiahMoneyFormat num={item.total} /></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="p-2">No data for "
                        <strong>
                          {moment(month).format("MMMM YYYY")}
                        </strong>
                        "
                      </td>
                    </tr>
                  )
                ) : (
                  <tr>
                    <td colSpan="7"><Spinner2 /></td>
                  </tr>
                )
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GrossSalary;
