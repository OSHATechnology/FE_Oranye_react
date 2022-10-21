import React, { useEffect, useState } from "react";
import TitleDashboard from "../../Components/TitleDashboard";
import ButtonSmall from "../../Components/ButtonSmall";
import ButtonNormal from "../../Components/ButtonNormal";
import ModalDelete from "../../Components/Modal/ModalDelete";
import ModalImport from "../../Components/Modal/ModalImport";
import ModalAdd from "../../Components/Modal/EmployeeAdd";
import ModalEdit from "../../Components/Modal/ModalEdit";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ConfigHeader from "../Auth/ConfigHeader";
import Search from "../../Components/Search";
import Pagination from "react-js-pagination";
import { AuthData } from "../Auth/AuthProvider";

const Employee = () => {
  const empAuthId = AuthData?.id ? AuthData?.id : 0;
  const [dataEmployee, setDataEmployee] = useState([]);
  const [isModalDeleteOpened, setIsModalDeleteOpened] = useState(false);
  const [isModalImportOpened, setIsModalImportOpened] = useState(false);
  const [modalEmployee, setModalEmployee] = useState(false);
  const [modalEmployeeDelete, setModalEmployeeDelete] = useState(false);
  const paramsData = useParams();
  const [employeeEdit, setEmployeeEdit] = useState([]);
  const [empDeleteData, setEmpDeleteData] = useState("");

  const [isModalAddOpened, setIsModalAddOpened] = useState(false);

  let dataEmployeeId = "";
  const showModalEdit = async (employeeId) => {
    dataEmployeeId = employeeId;
    await fetchDataEmployeeEdit();
  };

  const showModalDelete = async (employeeId) => {
    dataEmployeeId = employeeId;
    setEmpDeleteData(dataEmployeeId);
    setModalEmployeeDelete(true);
  };

  const fetchDataEmployeeEdit = async () => {
    const result = await axios.get(
      `/api/employee/${dataEmployeeId}`,
      ConfigHeader
    );
    setEmployeeEdit(result.data.data);
    setModalEmployee(true);
  };

  const fetchDataEmployee = async (page = 1, search = "", per_page = 10) => {
    try {
      const result = await axios.get(
        `/api/employee?search=${search}&page=${page}&per_page=${per_page}`,
        ConfigHeader
      );
      setDataEmployee(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    try {
      fetchDataEmployee(1, e.target.value);
    } catch (err) {}
  };

  useEffect(() => {
    fetchDataEmployee();
  }, [paramsData]);

  return (
    <div className="w-full md:mx-8 space-y-8">
      <TitleDashboard
        Title="Dashboard Employee"
        Keterangan="Employees From PT.OSHA Technology"
      />

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
              <ModalAdd
                isOpen={isModalAddOpened}
                setIsOpen={setIsModalAddOpened}
                title="Tambah Employee"
                action={fetchDataEmployee}
              />
              <ButtonNormal
                bg="bg-slate-500 "
                icon="bxs:file-import"
                text="Import"
                onClick={() => setIsModalImportOpened(!isModalImportOpened)}
              />

              <ModalImport
                isOpen={isModalImportOpened}
                setIsOpen={setIsModalImportOpened}
                title="Import Data Karyawan"
              />
            </div>

            <Search onChange={handleSearch} />
          </div>
        </div>
        <div className="items-start min-w-screen md:flex md:flex-row md:w-full ">
          <table className=" w-full text-center overflow-x-scroll">
            <thead className="bg-slate-100 border-b-2 border-slate-800 text-xs md:text-sm">
              <tr className="">
                <th className=" py-2">No</th>
                <th className="">Photo</th>
                <th className="">Name</th>
                <th className="">Email</th>
                <th className="">Role</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs md:text-sm font-medium">
              {dataEmployee.data ? (
                Object.keys(dataEmployee.data).map((row, index) => (
                  <tr
                    key={dataEmployee.data[row].employeeId}
                    className=" shadow "
                  >
                    <td>{index + 1}</td>
                    <td>
                      <div className="text-center flex items-center justify-center md:space-x-4">
                        <img
                          src={dataEmployee.data[row].photo}
                          alt={"photo of " + dataEmployee.data[row].name}
                          className="w-10 rounded-full"
                        />
                      </div>
                    </td>
                    <td>{dataEmployee.data[row].name}</td>
                    <td>{dataEmployee.data[row].email}</td>
                    <td>{dataEmployee.data[row].role.role}</td>
                    {/* <td>{moment(dataEmployee.data[row].joinedAt).format("DD MMMM YYYY")}</td> */}
                    <td>
                      <div className="flex justify-center gap-1">
                        <Link
                          to={`../emp/${dataEmployee.data[row].employeeId}`}
                        >
                          <ButtonSmall
                            bg="bg-blue-600"
                            icon="carbon:view"
                            colorIcon="text-white"
                          />
                        </Link>

                        <ButtonSmall
                          bg="bg-yellow-500"
                          icon="fa6-solid:pen-to-square"
                          colorIcon="text-white"
                          onClick={() =>
                            showModalEdit(dataEmployee.data[row].employeeId)
                          }
                        />
                        {dataEmployee.data[row].employeeId !== empAuthId && (

                        <ButtonSmall
                          bg="bg-red-500"
                          icon="ci:trash-full"
                          colorIcon="text-white"
                          onClick={() =>
                            showModalDelete(dataEmployee.data[row].employeeId)
                          }
                        />
                        )}
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
          {modalEmployee && (
            <ModalEdit
              isOpen={modalEmployee}
              setIsOpen={setModalEmployee}
              title="Edit Employee"
              typeData="employee"
              data={employeeEdit}
              action={fetchDataEmployee}
            />
          )}
          {modalEmployeeDelete && (
            <ModalDelete
              isOpen={modalEmployeeDelete}
              setIsOpen={setModalEmployeeDelete}
              title="Delete Employee"
              typeData="employee"
              data={empDeleteData}
              action={fetchDataEmployee}
            />
          )}
        </div>
        <Pagination
          activePage={dataEmployee.current_page ? dataEmployee.current_page : 0}
          itemsCountPerPage={
            dataEmployee?.per_page ? dataEmployee?.per_page : 0
          }
          totalItemsCount={dataEmployee?.total ? dataEmployee?.total : 0}
          onChange={(pageNumber) => {
            fetchDataEmployee(pageNumber);
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

export default Employee;
