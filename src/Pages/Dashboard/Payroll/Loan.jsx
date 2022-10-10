import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ButtonNormal from "../../../Components/ButtonNormal";
import ButtonSmall from "../../../Components/ButtonSmall";
import Search from "../../../Components/Search";
import ConfigHeader from "../../Auth/ConfigHeader";

const Kredit = () => {
  const [dataLoan, setDataLoan] = useState([]);
  const fetchDataLoan = async (page = 1, search = "") => {
    const result = await axios.get(
      `/api/loan?search=${search}&page=${page}`,
      ConfigHeader
    );
    
    setDataLoan(result.data.data);
  };

  useEffect(() => {
    fetchDataLoan();
  }, []);
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
              {/* <tr>
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
              </tr> */}
              {dataLoan.data ? (
                  Object.keys(dataLoan.data).map((row, index) => (
                    <tr key={dataLoan.data[row].loanId}>
                      <td>{index + 1}</td>
                      <td >
                        {dataLoan.data[row].name}
                      </td>
                      <td >
                        {dataLoan.data[row].loanDate}
                      </td>
                      <td >
                        {dataLoan.data[row].status}
                      </td>
                      <td className="w-24">
                        {/* <div className="flex justify-center gap-1">
                          <ButtonSmall
                            bg="bg-yellow-500"
                            icon="fa6-solid:pen-to-square"
                            colorIcon="text-white"
                            onClick={() =>
                              setModalEditAllowance(dataLoan.data[row].id)
                            }
                          />
                          <ButtonSmall
                            bg="bg-red-500"
                            icon="ci:trash-full"
                            colorIcon="text-white"
                            onClick={() =>
                              showModalDelete(dataAllowance.data[row].id)
                            }
                          />
                        </div> */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Loading</td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Kredit;
