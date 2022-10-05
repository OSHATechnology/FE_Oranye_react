import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";
import TitleDashboard from "../../Components/TitleDashboard";

const DetailSalary = () => {
  return (
    <div className="w-full md:mx-8 space-y-8">
      <TitleDashboard
        Title="Detail Salary from Employee"
        Keterangan="Slip Gaji"
      />

      <div className="flex gap-2 items-center">
        <Link
          to="../emp"
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
            <p>SLIP GAJI</p>
        </div>

      <div>
        <table className="text-sm font-semibold text-slate-800">
          <tbody>
            <tr>
              <td>Nama</td>
              <td className="px-2">:</td>
              <td>Fachrian</td>
            </tr>
            <tr>
              <td>Role</td>
              <td className="px-2">:</td>
              <td>Admin</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="md:flex md:space-y-0 space-y-2 ">
        <div className="basis-1/2  ">
          <div className=" border-b border-t border-slate-800">
            <p className="text-bold font-bold text-slate-800">Penerimaan</p>
          </div>
          <div className="flex ">
            <div className="basis-3/5 text-xs md:text-sm text-slate-800 font-medium">
                <p>Gaji Pokok</p>
                <p>Tunjangan</p>
                <p>Lembur</p>
                <p>Asuransi</p>
                <p>Bonus</p>
                <p className="font-bold ">Total Penghasilan</p>
                {/* <p className="font-bold ">Take Home Pay</p> */}
            </div>
            <div className="basis-2/5  text-xs md:text-sm text-slate-800 font-medium">
                <p>8.000.000</p>
                <p>300.000</p>
                <p>200.000</p>
                <p>120.000</p>
                <p>230.000</p>
                <p>8.850.000</p>
                {/* <p className="font-bold ">Rp. 0.00,-</p> */}
            </div>
          </div>
        </div>
        <div className="basis-1/2 ">
          <div className="border-b border-t border-slate-800 text-bold font-bold text-slate-800">
            <p>Potongan</p>
          </div>
          <div className="flex ">
          <div className="basis-3/5 text-xs md:text-sm text-slate-800 font-medium">
                <p>Cicilan Pinjaman</p>
                <p>Asuransi</p>
                <p>Lain-lain</p>

                <p className="font-bold ">Total Potongan</p>
            </div>
            <div className="basis-2/5  text-xs md:text-sm text-slate-800 font-medium">
                <p>8.000.000</p>
                <p>850.000</p>
                <p>0</p>

                <p>8.850.000</p>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex w-full border-b border-t border-slate-600">
      <div className="basis-1/2  ">
          <div className="flex ">
            <div className="basis-3/5 text-xs md:text-sm text-slate-800 font-medium">
                <p className="font-bold ">Take Home Pay</p>
            </div>
            <div className="basis-2/5  text-xs md:text-sm text-slate-800 font-medium">

                <p className="font-bold ">Rp. 0.00,-</p>
            </div>
          </div>
        </div>
      </div>
        </div>
    </div>
  );
};

export default DetailSalary;
