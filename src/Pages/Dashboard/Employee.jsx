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
    console.log(employeeEdit);
  }
  
  useEffect(() => {
    const fetchDataEmployee = async () => {
      const result = await axios.get(`/api/employee`, ConfigHeader);
      setDataEmployee(result.data.data.data);
    };

    fetchDataEmployee().catch((err) => {
      console.log(err.message);
    });
  }, []);

  useEffect(() => {
    const fetchDataEmployee= async () => {
      const data = await axios.get(`/api/employeeId/${paramsData.id}`, ConfigHeader);
      setDataEmployee(data.data.data);
    };

    fetchDataEmployee().catch((err) => {
      console.log(err.message);
    });
  }, [paramsData]);

  // useEffect(() => {
  //   axios
  //     .get(`/api/employee`, ConfigHeader)
  //     .then((res) => {
  //       setDataEmployee(res.data.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
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
          <div className="flex space-x-2 items-center">
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
          </div>
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
              {dataEmployee.map((row, index) => (
                <tr key={row.employeeId} className=" shadow ">
                  <td>{index + 1}</td>
                  <td>
                    <div className="text-center flex items-center justify-center md:space-x-4">
                      <img src="https://i.pinimg.com/474x/a7/e3/d4/a7e3d4c86710a6a9cf70b39c97ec8c55.jpg" alt={row.photo} className="w-10 rounded-full" />
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
                      {/* <ModalDelete
                        isOpen={isModalDeleteOpened}
                        setIsOpen={setIsModalDeleteOpened}
                        title="Delete Karyawan"
                        type="employee"
                        dataId={row.employeeId}
                      /> */}
                      {/* <ModalEdit
                        isOpen={isModalEditOpened}
                        setIsOpen={setIsModalEditOpened}
                        title={"Edit Karyawan" + row.employeeId}
                        data={row.employeeId}
                      /> */}
                    </div>
                  </td>
                </tr>
              ))}
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
    </div>
  );
};

export default Employee;
