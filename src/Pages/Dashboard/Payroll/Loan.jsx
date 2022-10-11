import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import ButtonNormal from "../../../Components/ButtonNormal";
import ButtonSmall from "../../../Components/ButtonSmall";
import Search from "../../../Components/Search";
import ConfigHeader from "../../Auth/ConfigHeader";
import ModalAddLoan from "../../../Components/Modal/AddLoan";

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

  const handleSearch = (e) => {
    try {
      fetchDataLoan(1, e.target.value);
    } catch (err) {}
  };
  console.log(dataLoan);
  // Add Loan
  const [isModalAddOpened, setIsModalAddOpened] = useState(false);

  return (
    <div className="w-full space-y-8">
      <div className=" space-y-2 border rounded shadow p-2">
        <div className="md:flex justify-between items-center space-y-4 md:space-y-0">
          <ButtonNormal
            bg="bg-green-600 "
            icon="bi:plus"
            text="Add"
            onClick={() => setIsModalAddOpened(!isModalAddOpened)}
          />

          <ModalAddLoan
            isOpen={isModalAddOpened}
            setIsOpen={setIsModalAddOpened}
            title="Tambah Allowance"
          />

          <Search onChange={handleSearch} />
        </div>
        <div className="items-start min-w-screen md:flex md:flex-row md:w-full ">
          <table className=" w-full text-center overflow-x-scroll">
            <thead className="bg-slate-200 h-10 border-b border-slate-500 text-xs md:text-sm">
              <tr className="">
                <th className=" py-2">No</th>
                <th className="">Employee Name</th>
                <th className="">Loan Date</th>
                <th className="">Paid Status</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs md:text-sm font-medium">
              {dataLoan.data ? (
                Object.keys(dataLoan.data).map((row, index) => (
                  <tr key={dataLoan.data[row].loanId}>
                    <td>{index + 1}</td>
                    <td>{dataLoan.data[row].employee.name}</td>
                    <td>{dataLoan.data[row].loanDate}</td>
                    <td>{(dataLoan.data[row].status)?'Lunas' : 'Belum Lunas'}</td>
                    <td className="w-24">
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
                ))
              ) : (
                <tr>
                  <td colSpan="5">Loading</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          activePage={dataLoan.current_page ? dataLoan.current_page : 0}
          itemsCountPerPage={dataLoan?.per_page ? dataLoan?.per_page : 0}
          totalItemsCount={dataLoan?.total ? dataLoan?.total : 0}
          onChange={(pageNumber) => {
            fetchDataLoan(pageNumber);
          }}
          innerClass="flex justify-center items-center gap-2 my-8 "
          pageRangeDisplayed={8}
          itemClass="text-sm font-semibold text-slate-600 rounded-full px-2 hover:bg-slate-100 "
          linkClass="page-link"
          activeClass="bg-slate-100 font-bold"
        />
      </div>
    </div>
  );
};

export default Kredit;
