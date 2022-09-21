import React, { useEffect, useState } from "react";
import TitleDashboard from "../../Components/TitleDashboard";
import ButtonSmall from "../../Components/ButtonSmall";
import ButtonNormal from "../../Components/ButtonNormal";
import Modal from "../../Components/Modal/ModalDelete";
import ModalImport from "../../Components/Modal/ModalImport";
import ModalAdd from "../../Components/Modal/EmployeeAdd";
import ModalEdit from "../../Components/Modal/EmployeeEdit";
import { Link } from "react-router-dom";
import axios from "axios";
import ConfigHeader from "../Auth/ConfigHeader";

const Employee = () => {
  const [dataEmp, setDataEmp] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalImportOpened, setIsModalImportOpened] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/employee`, ConfigHeader)
      .then((res) => {
        setDataEmp(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [isModalAddOpened, setIsModalAddOpened] = useState(false);
  const [isModalEditOpened, setIsModalEditOpened] = useState(false);

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
              {dataEmp.map((row, index) => (
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
                        onClick={() => setIsModalEditOpened(!isModalEditOpened)}
                      />
                      <ButtonSmall
                        bg="bg-red-500"
                        icon="ci:trash-full"
                        colorIcon="text-white"
                        onClick={() => setIsOpen(!isOpen)}
                      />
                      <Modal
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        title="Delete Karyawan"
                      />
                      <ModalEdit
                        isOpen={isModalEditOpened}
                        setIsOpen={setIsModalEditOpened}
                        title="Edit Karyawan"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employee;
