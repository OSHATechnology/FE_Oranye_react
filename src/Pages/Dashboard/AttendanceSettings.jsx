import TitleDashboard from "../../Components/TitleDashboard";
import React from "react";
import { Link } from "react-router-dom";
import ButtonNormal from "../../Components/ButtonNormal";
import { Icon } from "@iconify/react";
import ButtonSmall from "../../Components/ButtonSmall";

const AttendanceSettings = () => {
  return (
    <div className="w-full md:mx-8 space-y-8">
            <TitleDashboard
                Title="Attendance Settings"
                Keterangan="Manage company attendance settings "
            />
            <div>
                <Link to="../hadir" className="flex gap-1 items-center text-blue-400 hover:text-blue-700 w-fit">
                    <Icon icon="bi:arrow-left" className="text-sm  font-medium"></Icon>
                     <p className="text-sm font-medium hover:font-bold">
                    Back to Attendance
                </p>
                </Link>
            </div>

            <div className="md:flex gap-8 mt-8 space-y-4 md:space-y-0">
                <div className="basis-1/2 h-fit border border-gray-200 rounded-xl space-y-4 p-4">
                    <div>
                        <p className="text-xl font-bold">Furlough Type</p>
                    </div>
                    <div className="flex justify-between items-center ">
                        <div>
                            <Link to="#">
                                <ButtonNormal
                                    bg="bg-green-600 "
                                    icon="akar-icons:plus"
                                    text="Add"
                                />
                            </Link>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="text" placeholder="search" className="text-center rounded h-9 border border-gray-300" />
                            <ButtonSmall icon="akar-icons:search" />
                        </div>
                    </div>
                    <div>
                        <table className="w-full text-center overflow-x-scroll rounded">
                            <thead className="bg-gray-100 border-b-2 border-gray-700">
                                <tr>
                                    <th>#</th>
                                    <th>Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-medium text-gray-600">
                                {/* {dataRole.map((row, index) => (

                                    <tr key={row.roleId}>
                                        <td>{index + 1}</td>
                                        <td className="text-start">{row.nameRole}</td>
                                        <td>
                                            <div className="flex justify-center text-center">
                                                <ButtonNormal
                                                    bg="bg-blue-500 "
                                                    text="details"
                                                    onClick={() => setIsOpen(!isOpen)}
                                                />
                                                <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Role Detail" />
                                            </div>
                                        </td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="basis-1/2 h-fit border border-gray-200 rounded-xl space-y-4 p-4">
                    <div>
                        <p className="text-xl font-bold">Attendance Status</p>
                    </div>

                    <div className="flex justify-end items-center gap-2">
                        <input type="text" placeholder="search" className="text-center rounded h-9 border border-gray-300" />
                        <ButtonSmall icon="akar-icons:search" />
                    </div>

                    <div>
                        <table className="w-full text-center overflow-x-scroll rounded">
                            <thead className="bg-gray-100 border-b-2 border-gray-700">
                                <tr>
                                    <th>#</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-medium text-gray-600">
                                {/* {dataPermissions.map((row, index) => (

                                    <tr key={row.namePermissionId}>
                                        <td>{index + 1}</td>
                                        <td className="text-start">{row.namePermission}</td>
                                        <td>
                                            <div className="flex justify-center text-center">
                                                <ButtonNormal
                                                    bg="bg-blue-500 "
                                                    text="admin"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
  )
}

export default AttendanceSettings