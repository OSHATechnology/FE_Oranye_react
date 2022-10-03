import { Icon } from "@iconify/react";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import TitleDashboard from "../../Components/TitleDashboard";

const LoanPayment = () => {
  return (
    <div className="w-full md:mx-8 space-y-8">
      <TitleDashboard
        Title="Loan Payment"
        Keterangan="Detailed information loan payment"
      />

      <div className="flex gap-2 items-center">
        <Link
          to="../payroll/Loan"
          className="flex gap-1 items-center text-blue-400 hover:text-blue-700 w-fit"
        >
          <Icon icon="bi:arrow-left" className="text-sm  font-medium"></Icon>
          <p className="text-sm  font-medium hover:font-bold">
            Back to Loan Management
          </p>
        </Link>
      </div>

        <div>
            <table className="text-sm font-semibold text-slate-600">
                <tbody>
                    <tr>
                        <td>Nama</td>
                        <td className="px-3">:</td>
                        <td>Fachrian</td>
                    </tr>
                    <tr>
                        <td>Jenis Pinjaman</td>
                        <td className="px-3">:</td>
                        <td>Kesehatan</td>
                    </tr>
                    <tr>
                        <td>Jumlah Pinjaman</td>
                        <td className="px-3">:</td>
                        <td>300.000</td>
                    </tr>
                    <tr>
                        <td>Tanggal Pinjaman</td>
                        <td className="px-3">:</td>
                        <td>{moment().format("DD MMMM YYYY")}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div className="flex justify-center">
        <div className="items-start min-w-screen md:flex md:flex-row md:w-full ">
          <table className=" w-full text-center overflow-x-scroll">
            <thead className="bg-gray-100 border-b-2 border-gray-800 text-xs md:text-sm">
              <tr className="">
                <th className=" py-2">No</th>
                <th className="">Tanggal Pembayaran</th>
                <th className="">Nominal</th>
                <th className="">Sisa Pembayaran</th>
              </tr>
            </thead>
            <tbody className="text-xs md:text-sm font-medium">
              <tr>
                <td>1</td>
                <td>{moment().format("MMMM YYYY")}</td>
                <td>100.000</td>
                <td>200.000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default LoanPayment;
