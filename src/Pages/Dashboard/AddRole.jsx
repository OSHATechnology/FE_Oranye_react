import TitleDashboard from "../../Components/TitleDashboard";
import React from "react";
import { Link } from "react-router-dom";
import ButtonNormal from "../../Components/ButtonNormal";
import { Icon } from "@iconify/react";

const AddRole = () => {
    return (
        <div className="w-full md:mx-8 space-y-8">
            <TitleDashboard
                Title="Add a new role"
                Keterangan="create new role area"
            />
            <div>
                <Link to="../role"  className="flex gap-1 items-center text-blue-400 hover:text-blue-700 w-fit">
                <Icon icon="bi:arrow-left" className="text-sm  font-medium"></Icon>
                <p className="text-sm  font-medium hover:font-bold">
                    Back to Role & Permissions
                </p>
                </Link>
            </div>

            <div className="md:w-full border rounded flex flex-col justify-content-center shadow space-y-4 p-4">
                <div className="flex flex-row w-full items-center justify-center md:justify-start">
                    <div className="basis-1/5 ">
                        <p className="text-lg font-semibold text-gray-700">Role Name</p>
                    </div>
                    <div className="basis-4/5 ">
                        <input type="text"  className="w-full rounded h-8"/>
                    </div>
                </div>
                <div className="flex flex-row w-full items-start justify-center md:justify-start">
                    <div className="basis-1/5 ">
                        <p className="text-lg font-semibold text-gray-700 items-start">Permissions</p>
                    </div>
                    <div className="basis-4/5 ">
                        <div className="flex">
                            <div className="basis-1/2 space-y-2">
                                <div>
                                    <div className="flex items-center gap-2 my-1">
                                        <input type="checkbox" className="rounded border border-gray-400"/>
                                        <p className="text-sm font-medium text-gray-600">Attendance Management</p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-6">
                                        <input type="checkbox" className="rounded border border-gray-400"/>
                                        <p className="text-sm font-medium text-gray-600">Can view all attendance data</p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-6">
                                        <input type="checkbox" className="rounded border border-gray-400"/>
                                        <p className="text-sm font-medium text-gray-600">Can manage status attendance employee</p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-6">
                                        <input type="checkbox" className="rounded border border-gray-400"/>
                                        <p className="text-sm font-medium text-gray-600">Can manage status attendance employee</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 my-1">
                                        <input type="checkbox" className="rounded border border-gray-400"/>
                                        <p className="text-sm font-medium text-gray-600">Attendance Management</p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-6">
                                        <input type="checkbox" className="rounded border border-gray-400"/>
                                        <p className="text-sm font-medium text-gray-600">Can view all attendance data</p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-6">
                                        <input type="checkbox" className="rounded border border-gray-400"/>
                                        <p className="text-sm font-medium text-gray-600">Can manage status attendance employee</p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-6">
                                        <input type="checkbox" className="rounded border border-gray-400"/>
                                        <p className="text-sm font-medium text-gray-600">Can manage status attendance employee</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 my-1">
                                        <input type="checkbox" className="rounded border border-gray-400"/>
                                        <p className="text-sm font-medium text-gray-600">Attendance Management</p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-6">
                                        <input type="checkbox" className="rounded border border-gray-400"/>
                                        <p className="text-sm font-medium text-gray-600">Can view all attendance data</p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-6">
                                        <input type="checkbox" className="rounded border border-gray-400"/>
                                        <p className="text-sm font-medium text-gray-600">Can manage status attendance employee</p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-6">
                                        <input type="checkbox" className="rounded border border-gray-400"/>
                                        <p className="text-sm font-medium text-gray-600">Can manage status attendance employee</p>
                                    </div>
                                </div>
                            </div>
                            <div className="basis-1/2">
                            <div>
                                    <div className="flex items-center gap-2 my-1">
                                        <input type="checkbox" className="rounded border border-gray-400"/>
                                        <p className="text-sm font-medium text-gray-600">Attendance Management</p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-6">
                                        <input type="checkbox" className="rounded border border-gray-400"/>
                                        <p className="text-sm font-medium text-gray-600">Can view all attendance data</p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-6">
                                        <input type="checkbox" className="rounded border border-gray-400"/>
                                        <p className="text-sm font-medium text-gray-600">Can manage status attendance employee</p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-6">
                                        <input type="checkbox" className="rounded border border-gray-400"/>
                                        <p className="text-sm font-medium text-gray-600">Can manage status attendance employee</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 my-1">
                                        <input type="checkbox" className="rounded border border-gray-400"/>
                                        <p className="text-sm font-medium text-gray-600">Attendance Management</p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-6">
                                        <input type="checkbox" className="rounded border border-gray-400"/>
                                        <p className="text-sm font-medium text-gray-600">Can view all attendance data</p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-6">
                                        <input type="checkbox" className="rounded border border-gray-400"/>
                                        <p className="text-sm font-medium text-gray-600">Can manage status attendance employee</p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-6">
                                        <input type="checkbox" className="rounded border border-gray-400"/>
                                        <p className="text-sm font-medium text-gray-600">Can manage status attendance employee</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 my-1">
                                        <input type="checkbox" className="rounded border border-gray-400"/>
                                        <p className="text-sm font-medium text-gray-600">Attendance Management</p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-6">
                                        <input type="checkbox" className="rounded border border-gray-400"/>
                                        <p className="text-sm font-medium text-gray-600">Can view all attendance data</p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-6">
                                        <input type="checkbox" className="rounded border border-gray-400"/>
                                        <p className="text-sm font-medium text-gray-600">Can manage status attendance employee</p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-6">
                                        <input type="checkbox" className="rounded border border-gray-400"/>
                                        <p className="text-sm font-medium text-gray-600">Can manage status attendance employee</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                <ButtonNormal
              bg="bg-green-600 "
              text="Create"
             
            />
                </div>
            </div>
        </div>
    );
};

export default AddRole;
