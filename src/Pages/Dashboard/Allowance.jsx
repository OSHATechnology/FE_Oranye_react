import React, { useState, useEffect } from "react";
import ButtonNormal from "../../Components/ButtonNormal";
import ButtonSmall from "../../Components/ButtonSmall";
import Search from "../../Components/Search";
import SimpleCard from "../../Components/SimpleCard";
import TitleDashboard from "../../Components/TitleDashboard";
import ModalDelete from "../../Components/Modal/ModalDelete";
import axios from "axios";
import ConfigHeader from "../Auth/ConfigHeader";
import Pagination from "react-js-pagination";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import ModalAddAllowance from "../../Components/Modal/AddAllowance";
import ModalEdit from "../../Components/Modal/ModalEdit";

const Allowance = () => {
  const [totalAllowance, setTotalAllowance] = useState(0);
  const [dataAllowance, setDataAllowance] = useState([]);
  const [modalAllowanceDelete, setModalAllowanceDelete] = useState(false);
  const [allowanceDeleteData, setAllowanceDeleteData] = useState("");
  const paramsData = useParams();
  const [searchValue, setSearchValue] = useState("");

  const fetchDataAllowance = async (page = 1, search = "") => {
    const result = await axios.get(
      `/api/allowance?search=${search}&page=${page}`,
      ConfigHeader
    );
    setDataAllowance(result.data.data);
  };

  const fecthTotalAllowance = async () => {
    try {
      const result = await axios.get(`api/count?type=allowance`, ConfigHeader);
      setTotalAllowance(result.data.data);
    } catch (error) {
      console.log("failed to fetch total allowance");
    }
  };

  useEffect(() => {
    fetchDataAllowance();
    fecthTotalAllowance();
  }, [paramsData]);

  const handleSearchAllowance = (e) => {
    try {
      fetchDataAllowance(1, e.target.value);
      setSearchValue(e.target.value);
    } catch (err) {}
  };

  let dataAllowanceId = "";
  const showModalDelete = async (allowanceId) => {
    dataAllowanceId = allowanceId;
    setAllowanceDeleteData(dataAllowanceId);
    setModalAllowanceDelete(true);
  };

  // Add Allowance
  const [isModalAddOpened, setIsModalAddOpened] = useState(false);

  // Edit Allowance
  const [modalAllowanceEdit, setModalAllowanceEdit] = useState(false);
  const [allowanceEdit, setAllowanceEdit] = useState([]);
  const fetchDataAllowanceEdit = async () => {
    const result = await axios.get(
      `/api/allowance/${dataAllowanceId}`,
      ConfigHeader
    );
    setAllowanceEdit(result.data.data);
    setModalAllowanceEdit(true);
  };
  const setModalEditAllowance = async (allowanceId) => {
    dataAllowanceId = allowanceId;
    await fetchDataAllowanceEdit();
  };
  console.log(totalAllowance)
  return (
    <div className="w-full md:mx-8 space-y-8">
      <TitleDashboard
        Title="Allowance Management"
        Keterangan="Manage Allowance PT.OSHA Technology"
      />
      <div className="flex justify-between">
        <SimpleCard
          bgColor=""
          Title="Number of Allowance"
          Icon="fa-solid:hand-holding-usd"
          Count={totalAllowance}
        />

        <div className="flex my-8 text-sm font-semibold text-gray-600">
          <Link to="../allowanceAdd">
            <button>
              <Icon
                icon="ant-design:setting-filled"
                className="text-lg text-gray-400 hover:text-gray-800"
              ></Icon>
            </button>
          </Link>
        </div>
      </div>

      <div className="space-y-2 border rounded shadow p-2">
        <div className="flex justify-center">
          <div className="justify-between items-center md:min-h-1/3 md:flex md:flex-row md:w-full">
            <div className="flex gap-4">
              <ButtonNormal
                bg="bg-green-600 "
                icon="bi:plus"
                text="Add"
                onClick={() => setIsModalAddOpened(!isModalAddOpened)}
              />
              <ModalAddAllowance
                isOpen={isModalAddOpened}
                setIsOpen={setIsModalAddOpened}
                title="Add Allowance"
                action={fetchDataAllowance}
              />
            </div>
            <Search onChange={handleSearchAllowance} />
          </div>
        </div>

        <div className="flex justify-center mt-2">
          <div className="items-start min-w-screen md:flex md:flex-row md:w-full ">
            <table className=" w-full text-center overflow-x-scroll">
              <thead className="bg-slate-100 border-b-2 border-slate-800 text-xs md:text-sm">
                <tr className="">
                  <th className=" py-2">No</th>
                  <th className="">Jabatan</th>
                  <th className="">Nama Tunjangan</th>
                  <th className="">Nominal Tunjangan</th>
                  <th className="">Action</th>
                </tr>
              </thead>
              <tbody className="text-xs md:text-sm font-medium">
                {dataAllowance.data ? (
                  Object.keys(dataAllowance.data).map((row, index) => (
                    <tr key={dataAllowance.data[row].id}>
                      <td>{parseInt(row) + 1}</td>
                      <td >
                        {dataAllowance.data[row].role.role}
                      </td>
                      <td >
                        {dataAllowance.data[row].typeAllowance.type}
                      </td>
                      <td >
                        {dataAllowance.data[row].typeAllowance.nominal}
                      </td>
                      <td className="w-24">
                        <div className="flex justify-center gap-1">
                          <ButtonSmall
                            bg="bg-yellow-500"
                            icon="fa6-solid:pen-to-square"
                            colorIcon="text-white"
                            onClick={() =>
                              setModalEditAllowance(dataAllowance.data[row].id)
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
          {modalAllowanceEdit && (
            <ModalEdit
              isOpen={modalAllowanceEdit}
              setIsOpen={setModalAllowanceEdit}
              title="Edit Allowance"
              typeData="allowance"
              data={allowanceEdit}
              action={fetchDataAllowance}
            />
          )}
          {modalAllowanceDelete && (
            <ModalDelete
              isOpen={modalAllowanceDelete}
              setIsOpen={setModalAllowanceDelete}
              title="Delete Allowance"
              typeData="allowance"
              data={allowanceDeleteData}
              action={fetchDataAllowance}
            />
          )}
        </div>
        <Pagination
          activePage={
            dataAllowance.current_page ? dataAllowance.current_page : 0
          }
          itemsCountPerPage={
            dataAllowance?.per_page ? dataAllowance?.per_page : 0
          }
          totalItemsCount={dataAllowance?.total ? dataAllowance?.total : 0}
          onChange={(pageNumber) => {
            fetchDataAllowance(pageNumber, searchValue);
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

export default Allowance;
