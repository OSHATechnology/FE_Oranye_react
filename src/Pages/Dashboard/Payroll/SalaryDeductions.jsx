import moment from "moment";
import React from "react";
import Search from "../../../Components/Search";

const SalaryDeductions = () => {
  return (
    <div className="w-full space-y-8">

    <div className="space-y-2 border rounded shadow p-2">
    <div className="md:flex justify-between items-center space-y-4 md:space-y-0">
      <div>
        <button
          className="rounded-xl bg-white text-center px-4 py-2 border border-slate-500 text-xs font-bold hover:bg-slate-100"
          onClick={() => alert("modal")}
        >
          {moment().format("MMMM YYYY")}
        </button>
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
          <tr>
              <td>1</td>
              <td className="text-start">
                  <div className="w-fit">
                      <p className="text-xs text-slate-400">10119065</p>
                      <p>Employee 1</p>
                  </div>
              </td>
              <td>100%</td>
              <td>300.000</td>
              <td>5 %</td>
              <td>150.000</td>
              <td>1.162.500</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default SalaryDeductions