import { Icon } from "@iconify/react";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TitleDashboard from "../../Components/TitleDashboard";
import ConfigHeader from "../Auth/ConfigHeader";

const LoanPayment = () => {
  const paramsData = useParams();
  const [datainstalment, setDataInstalment] = useState([]);

  const [dataLoan, setDataLoan] = useState([
    {
      loanId: "",
      name: "",
      employee: {
        id: "",
        name: "",
      },
      createdBy: {
        id: "",
        employee: "",
      },
      nominal: "",
      loanDate: "",
      paymentDate: "",
      status: "",
    },
  ]);

  const fetchInstalmentData = async () => {
    try {
      const res = await axios.get(`/api/instalment_by_loan/${paramsData.id}`, ConfigHeader);
      setDataInstalment(res.data.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    const fetchDataLoan = async () => {
      const data = await axios.get(`/api/loan/${paramsData.id}`, ConfigHeader);
      setDataLoan(data.data.data);
    };
    fetchDataLoan().catch((err) => {
      console.log(err.message);
    });
    fetchInstalmentData();
  }, [paramsData]);

  console.log(datainstalment)

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
                        <td>{dataLoan.employee ? dataLoan.employee.name : ""}</td>
                    </tr>
                    <tr>
                        <td>Jenis Pinjaman</td>
                        <td className="px-3">:</td>
                        <td>{dataLoan.name}</td>
                    </tr>
                    <tr>
                        <td>Jumlah Pinjaman</td>
                        <td className="px-3">:</td>
                        <td>{dataLoan.nominal}</td>
                    </tr>
                    <tr>
                        <td>Tanggal Pinjaman</td>
                        <td className="px-3">:</td>
                        <td>{moment(dataLoan.loanDate).format("DD MMMM YYYY")}</td>
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
            {
                datainstalment.data ? Object.keys(datainstalment.data).map((row, index) => (
                  <tr key={datainstalment.data[row].id} className=" shadow ">
                    <td>{index + 1}</td>
                    <td>{moment(datainstalment.data[row].date).format("DD MMMM YYYY")}</td>
                    <td>{datainstalment.data[row].nominal}</td>
                    <td>{datainstalment.data[row].remainder}</td>
                    {/* <td>
                      <ButtonSmall
                        bg="bg-red-500"
                        icon="bi:trash"
                        onClick={() => showModalDelete(datainstalment.data[row].id)}
                      />
                    </td> */}
                  </tr> 
                )) : <tr><td colSpan="5">Loading</td></tr>
              }
              {/* <tr>
                <td>1</td>
                <td>{moment().format("MMMM YYYY")}</td>
                <td>100.000</td>
                <td>200.000</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default LoanPayment;
