import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import RupiahMoneyFormat from "../../../Components/RupiahMoneyFormat";
import Search from "../../../Components/Search";
import Spinner2 from "../../../Components/Spinner2";
import ConfigHeader from "../../Auth/ConfigHeader";

const GrossSalary = () => {
  const [dataGross, setDataGross] = useState([]);

  const fetchGrossSalary = async (search) => {
    const response = await axios.get('api/salary?type=gross', ConfigHeader);
    setDataGross(response.data);
  };

  useEffect(() => {
    fetchGrossSalary();
  }, []);

  return (
    <div className="w-full space-y-2 border rounded shadow p-2">
      <div className="md:flex justify-between items-center space-y-4 md:space-y-0">
        {/* <div>
          <button
            className="rounded-xl bg-white text-center px-4 py-2 border border-slate-500 text-xs font-bold hover:bg-slate-100"
            onClick={() => alert("modal")}
          >
            {moment().format("MMMM YYYY")}
          </button>
        </div> */}
        <div className="px-2 flex items-center gap-2">
          {/* <label htmlFor="month">{moment().format("MMMM")}</label> */}
          <input
            type="month"
            // defaultValue={moment().format("MMMM")}
            name=""
            id="month"
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
              <th>Gaji Pokok</th>
              <th>Overtime</th>
              <th>Overtime Fee</th>
              <th>Bonus</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium text-slate-600 text-center">
            {dataGross ? (
              dataGross?.data?.data.map((item, index) => (
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
                  <td><RupiahMoneyFormat num={item.totalBonus} /></td>
                  <td><RupiahMoneyFormat num={item.total} /></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7"><Spinner2 /></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GrossSalary;
