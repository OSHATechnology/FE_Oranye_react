import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import RupiahMoneyFormat from "../../../Components/RupiahMoneyFormat";
import Search from "../../../Components/Search";
import Spinner2 from "../../../Components/Spinner2";
import ConfigHeader from "../../Auth/ConfigHeader";

const NetSalary = () => {
  const [month, setMonth] = useState(moment().format("YYYY-MM"));
  const [dataNet, setDataNet] = useState([]);
  const [netData, setNetData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDataNet = async (monthSalary = month, page = 1, search = "") => {
    try {
      const data = await axios.get(`/api/salary?type=net&month=${monthSalary}&search=${search}&page=${page}`, ConfigHeader);
      setDataNet(data.data.data);
      setNetData(data.data.data);
      setIsLoading(false);
    } catch (error) {
      alert(error.response.data.message);
      setDataNet([]);
      setNetData([]);
      setIsLoading(false);
    }
  };

  const handleSalary = async (e) => {
    setMonth(e.target.value);
    fetchDataNet(e.target.value);
    setIsLoading(true);
  };

  const handleSearch = async (e) => {
    try {
      console.log(netData.data);
      const result = netData.data.filter((item) => {
        return item.empName.toLowerCase().includes(e.target.value.toLowerCase());
      });
      setDataNet({ ...netData, data: result });
    } catch (err) { }
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
            id="customMoth"
            className="h-6 rounded border border-gray-400 text-xs text-gray-600"
            max={moment().format("YYYY-MM")}
            value={month}
            onChange={handleSalary}
          />
        </div>
        <Search onChange={handleSearch} />
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
            {isLoading && (
              <tr>
                <td colSpan="5">
                  <Spinner2 />
                </td>
              </tr>
            )}
            {
              dataNet.data && dataNet.data.map((item, index) => {
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
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default NetSalary