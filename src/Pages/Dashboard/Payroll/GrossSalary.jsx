import moment from "moment";
import React from "react";
import Search from "../../../Components/Search";

const GrossSalary = () => {
  return (
    <div className="w-full space-y-8">
      <div className="md:flex justify-between items-center space-y-4 md:space-y-0">
        <Search />
        <div>
          <button
            className="rounded-xl bg-white text-center px-4 py-2 border border-gray-500 text-xs font-bold hover:bg-gray-100"
            onClick={() => alert("modal")}
          >
            {moment().format("MMMM YYYY")}
          </button>
        </div>
      </div>

      <div>
        <table className="w-full">
          <thead className="font-bold border-b-2 border-gray-600">
            <tr>
              <th>No</th>
              <th>Employee</th>
              <th>Gaji Pokok</th>
              <th>Overtime</th>
              <th>Insentif</th>
              <th>Bonus</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium text-gray-600 text-center">
            <tr>
                <td>1</td>
                <td className="text-start">
                    <div className="w-fit">
                        <p className="text-xs text-gray-400">10119065</p>
                        <p>Employee 1</p>
                    </div>
                </td>
                <td>8.000.000</td>
                <td>16 Hours</td>
                <td>600.000</td>
                <td>2.000.000</td>
                <td>14.250.000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GrossSalary;
