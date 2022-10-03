import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import ButtonNormal from "../../../Components/ButtonNormal";
import ButtonSmall from "../../../Components/ButtonSmall";
import Search from "../../../Components/Search";

const Kredit = () => {
  return (
    <div className="w-full space-y-8">
      <div className=" space-y-2 border rounded shadow p-2">
      <div className="md:flex justify-between items-center space-y-4 md:space-y-0">
        <ButtonNormal bg="bg-green-600 " icon="bi:plus" text="Add" />
        <Search />
      </div>
        <div className="items-start min-w-screen md:flex md:flex-row md:w-full ">
          <table className=" w-full text-center overflow-x-scroll">
            <thead className="bg-slate-200 h-10 border-b border-slate-500 text-xs md:text-sm">
              <tr className="">
                <th className=" py-2">No</th>
                <th className="">Nama Employee</th>
                <th className="">Tanggal Pinjam</th>
                <th className="">Status Lunas</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs md:text-sm font-medium">
              <tr>
                <td>1</td>
                <td>Fachrian</td>
                <td>{moment().format("MMMM YYYY")}</td>
                <td>Lunas</td>
                <td>
                  <div className="flex justify-center gap-1">
                    <Link to={"../LoanPayment"}>
                    <ButtonSmall
                      bg="bg-blue-600"
                      icon="carbon:view"
                      colorIcon="text-white"
                      />
                      </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Kredit;
