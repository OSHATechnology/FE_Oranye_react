import React, { useState } from "react";
import TitleDashboard from "../../Components/TitleDashboard";
import ButtonNormal from "../../Components/ButtonNormal";
import ButtonSmall from "../../Components/ButtonSmall";
import Modal from "../../Components/Modal/ModalRoleDetail";

const RolePermissions = () => {
    const [isOpen, setIsOpen] = useState(false)
    const dataRole = [
        {
            id: "1",
            role: "Employee"
        },
        {
            id: "2",
            role: "Admin"
        },
        {
            id: "3",
            role: "Supervisor"
        },
        {
            id: "4",
            role: "Staff"
        }
    ]

    return (
        <div className="w-full md:mx-8">
            <TitleDashboard
                Title="Role & Permissions Management"
                Keterangan="Create, Read, and Delete Roles"
            />

            <div className="md:flex gap-8 mt-8 space-y-4 md:space-y-0">
                <div className="basis-1/2 h-fit border border-gray-200 rounded-xl space-y-4 p-4">
                    <div>
                        <p className="text-xl font-bold">List Role</p>
                    </div>
                    <div className="flex justify-between items-center ">
                        <div>
                            <ButtonNormal
                                bg="bg-green-600 "
                                icon="akar-icons:plus"
                                text="Add"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="text" placeholder="search" className="text-center rounded h-9 border border-gray-300"/>
                            <ButtonSmall icon="akar-icons:search" />
                        </div>
                    </div>
                    <div>
                        <table className="w-full text-center overflow-x-scroll rounded">
                            <thead className="bg-gray-100 border-b-2 border-gray-700">
                                <tr>
                                    <th>#</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-medium text-gray-600">
                                {dataRole.map((row, index) =>(

                                <tr key={row.id}>
                                    <td>{index + 1}</td>
                                    <td className="text-start">{row.role}</td>
                                    <td>
                                        <div className="flex justify-center text-center">
                                            <ButtonNormal
                                                bg="bg-blue-500 "
                                                text="details"
                                                onClick={() => setIsOpen(!isOpen)}
                                            />
                                            <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Role Detail"/>
                                        </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="basis-1/2 h-fit border border-gray-200 rounded-xl space-y-4 p-4">
                <div>
                        <p className="text-xl font-bold">List Permissions</p>
                    </div>
                    
                        <div className="flex justify-end items-center gap-2">
                            <input type="text" placeholder="search" className="text-center rounded h-9 border border-gray-300"/>
                            <ButtonSmall icon="akar-icons:search" />
                        </div>
                    
                    <div>
                        <table className="w-full text-center overflow-x-scroll rounded">
                            <thead className="bg-gray-100 border-b-2 border-gray-700">
                                <tr>
                                    <th>#</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-medium text-gray-600">
                                {dataRole.map((row, index) =>(

                                <tr key={row.id}>
                                    <td>{index + 1}</td>
                                    <td className="text-start">{row.role}</td>
                                    <td>
                                        <div className="flex justify-center text-center">
                                            <ButtonNormal
                                                bg="bg-blue-500 "
                                                text="admin"
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
        </div>
    );
};

export default RolePermissions;
