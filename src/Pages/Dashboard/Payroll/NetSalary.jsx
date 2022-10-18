import React from "react";
import Search from "../../../Components/Search";

const NetSalary = () => {
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
            <tr>
              <td>1</td>
              <td className="text-start">
                <div className="w-fit">
                  <p className="text-xs text-slate-400">10119065</p>
                  <p>Employee 1</p>
                </div>
              </td>
              <td>14.250.000</td>
              <td>1.162.500</td>
              <td>13.087.500</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default NetSalary