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

const Employee = () => {
  const [dataEmployee, setDataEmployee] = useState([]);
  const [isModalDeleteOpened, setIsModalDeleteOpened] = useState(false);
  const [isModalImportOpened, setIsModalImportOpened] = useState(false);
  const [modalEmployee, setModalEmployee] = useState(false);
  const [modalEmployeeDelete, setModalEmployeeDelete] = useState(false);
  const paramsData = useParams();
  const [employeeEdit, setEmployeeEdit] = useState([]);
  const [empDeleteData, setEmpDeleteData] = useState("");

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
    const result = await axios.get(`/api/employee/${dataEmployeeId}`, ConfigHeader);
    setEmployeeEdit(result.data.data);
    setModalEmployee(true);
  }
  
  // const fetchDataEmployee = async () => {
  //   const result = await axios.get(`/api/employee`, ConfigHeader);
  //   setDataEmployee(result.data.data.data);
  // };

  // useEffect(() => {
  //   fetchDataEmployee()
  //   .then(() => {
  //     console.log(dataEmployee);
  //   })
  //   .catch((err) => {
  //     console.log(err.message);
  //   });
  // }, []);

  const fetchDataEmployee = async (page = 1,search = null) => {
    try {
      const result = await axios.get(`/api/employee?page=${page}`, ConfigHeader);
      setDataEmployee(result.data.data);
      // setDataEmployee(result.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const fetchEmpDetails= async (id) => {
  //   const data = await axios.get(`/api/employee/${id}`, ConfigHeader);
  //   setDataEmployee(data.data.data);
  // };
  useEffect(() => {

    fetchDataEmployee();
    // fetchEmpDetails().catch((err) => {
    //   console.log(err.message);
    // });
  }, [paramsData]);
  // useEffect(() => {
  //   axios
  //   .get(`/api/employee`, ConfigHeader)
  //   .then((res) => {
  //     setDataEmployee(res.data.data.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }, []);
  const [isModalAddOpened, setIsModalAddOpened] = useState(false);
  return (
    <div className="w-full md:mx-8">
      <TitleDashboard
        Title="Dashboard Employee"
        Keterangan="Employees From PT.OSHA Technology"
      />

      <div className="flex justify-center mt-8 mb-2">
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
              title="Tambah Karyawan"
            />
            <ButtonNormal
              bg="bg-gray-500 "
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
          {/* <div className="flex space-x-2 items-center">
            <input
              type="text"
              placeholder="Search"
              className="rounded text-center w-72 border border-gray-300 h-9"
            />
            <ButtonSmall
              bg="bg-gray-400"
              icon="akar-icons:search"
              colorIcon="text-white"
            />
          </div> */}
          <Search />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="items-start min-w-screen md:flex md:flex-row md:w-full ">
          <table className=" w-full text-center overflow-x-scroll">
            <thead className="bg-gray-100 border-b-2 border-gray-800 text-xs md:text-sm">
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
              {/* {dataEmployee.map((row, index) => (
                <tr key={row.employeeId} className=" shadow ">
                  <td>{index + 1}</td>
                  <td>
                    <div className="text-center flex items-center justify-center md:space-x-4">
                      <img src={row.photo} alt={"photo of "+row.name} className="w-10 rounded-full" />
                    </div>
                  </td>
                  <td>
                    {row.name}
                  </td>
                  <td>{row.email}</td>
                  <td>{row.role.role}</td>
                  <td>
                    <div className="flex justify-center gap-1">
                      <Link to={`../emp/${row.employeeId}`}>
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
                        onClick={() => showModalEdit(row.employeeId)}
                      />
                      <ButtonSmall
                        bg="bg-red-500"
                        icon="ci:trash-full"
                        colorIcon="text-white"
                        onClick={() => showModalDelete(row.employeeId)}
                        
                      />

                    </div>
                  </td>
                </tr>
              ))} */}
              
               {
                dataEmployee.data ? Object.keys(dataEmployee.data).map((row, index) =>
                (
                  <tr key={dataEmployee.data[row].employeeId} className=" shadow ">
                    <td>{index + 1}</td>
                    <td>
                      <div className="text-center flex items-center justify-center md:space-x-4">
                        <img src={dataEmployee.data[row].photo} alt={"photo of "+ dataEmployee.data[row].name} className="w-10" />
                      </div>
                      
                      </td>
                    <td>{dataEmployee.data[row].name}</td>
                    <td>{dataEmployee.data[row].email}</td>
                    <td>{dataEmployee.data[row].role.role}</td>
                    {/* <td>{moment(dataEmployee.data[row].joinedAt).format("DD MMMM YYYY")}</td> */}
                    <td>
                    <div className="flex justify-center gap-1">
                    <Link to={`../emp/${dataEmployee.data[row].employeeId}`}>
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
                        onClick={() => showModalEdit(dataEmployee.data[row].employeeId)}
                      />
                      <ButtonSmall
                        bg="bg-red-500"
                        icon="ci:trash-full"
                        colorIcon="text-white"
                        onClick={() =>
                          showModalDelete(dataEmployee.data[row].employeeId)}
                      />
                      </div>
                    </td>
                  </tr> 
                )) : <tr><td colSpan="5">Loading</td></tr>
              }
            </tbody>
          </table>
          {modalEmployee && (
            <ModalEdit
              isOpen={modalEmployee}
              setIsOpen={setModalEmployee}
              title="Edit Employee"
              typeData="employee"
              data={employeeEdit}
            />
          )}
          {modalEmployeeDelete && (
            <ModalDelete
              isOpen={modalEmployeeDelete}
              setIsOpen={setModalEmployeeDelete}
              title="Delete Employee"
              typeData="employee"
              data={empDeleteData}
            />
          )}
        </div>
      </div>
      <Pagination 
          activePage={dataEmployee.current_page ? dataEmployee.current_page : 0}
          itemsCountPerPage={dataEmployee?.per_page ? dataEmployee?.per_page : 0 }
          totalItemsCount={dataEmployee?.total ? dataEmployee?.total : 0}
          onChange={(pageNumber) => {
            fetchDataEmployee(pageNumber)
          }}
          innerClass="flex justify-center items-center gap-2 my-8 "
          pageRangeDisplayed={8}
          itemClass="text-sm font-semibold text-slate-600 rounded-full px-2 hover:bg-slate-100 "
          linkClass="page-link"
          activeClass="bg-slate-100 font-bold"
        />
    </div>
  );
};

export default Employee;
