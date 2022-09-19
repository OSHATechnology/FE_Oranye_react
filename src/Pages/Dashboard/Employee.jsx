import React, { useState } from "react";
import TitleDashboard from "../../Components/TitleDashboard";
import ButtonSmall from "../../Components/ButtonSmall";
import ButtonNormal from "../../Components/ButtonNormal";
import Modal from "../../Components/Modal/ModalDelete";
import ModalImport from "../../Components/Modal/ModalImport";
import ModalAdd from "../../Components/Modal/EmployeeAdd";
import ModalEdit from "../../Components/Modal/EmployeeEdit";
import { Link } from "react-router-dom";

const Employee = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isModalImportOpened, setIsModalImportOpened] = useState(false);
    const [isModalAddOpened, setIsModalAddOpened] = useState(false);
    const [isModalEditOpened, setIsModalEditOpened] = useState(false);
    const dataEmp = [
        // Pages
        {
            id: 1,
            img: "assets/PP.png",
            name: "Arunika",
            email: "zain280401@gmail.com",
            role: "Admin",
        },
        {
            id: 2,
            img: "assets/Logo.png",
            name: "zae",
            email: "zae@gmail.com",
            role: "Employee",
        },
    ];
    return (
        <div className="w-full md:mx-8">
            <TitleDashboard
                Title="Dashboard Employee"
                Keterangan="Employees From PT.OSHA Technology"
            />

            <div className="flex justify-center mt-8 mb-2">
                <div className="justify-between items-center md:min-h-1/3 md:flex md:flex-row md:w-full">
                    <div className="flex gap-4">
                        <ButtonNormal bg="bg-green-600 " icon="bi:plus" text="Add" onClick={() => setIsModalAddOpened(!isModalAddOpened)}/>
                        <ModalAdd isOpen={isModalAddOpened} setIsOpen={setIsModalAddOpened} title="Tambah Karyawan"/>
                        <ButtonNormal bg="bg-gray-500 " icon="bxs:file-import" text="Import"  onClick={() => setIsModalImportOpened(!isModalImportOpened)}/>
                        
                        <ModalImport isOpen={isModalImportOpened} setIsOpen={setIsModalImportOpened} title="Import Data Karyawan"/>
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
                                <tr key={row.id} className=" shadow ">
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="text-center flex items-center justify-center md:space-x-4">
                                            <img
                                                src={row.img}
                                                alt=""
                                                className="w-10"
                                            />
                                        </div>
                                    </td>
                                    <td>{row.name}</td>
                                    <td>{row.email}</td>
                                    <td>{row.role}</td>
                                    <td>
                                        <div className="flex justify-center gap-1">
                                            <Link to="../detail">
                                                <ButtonSmall
                                                bg="bg-blue-600"
                                                icon="carbon:view"
                                                colorIcon="text-white"
                                            /></Link>
                                            
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
                                            {/* <button className="w-64 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                    onClick={() => setIsOpen(!isOpen)}>
					Open Modal
				</button> */}
                <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Delete Karyawan"/>
                <ModalEdit isOpen={isModalEditOpened} setIsOpen={setIsModalEditOpened} title="Edit Karyawan"/>
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
