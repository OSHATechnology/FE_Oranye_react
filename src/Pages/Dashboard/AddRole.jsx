import TitleDashboard from "../../Components/TitleDashboard";
import React from "react";
import { Link } from "react-router-dom";

const AddRole = () => {
    return (
        <div className="w-full md:mx-8 space-y-8">
            <TitleDashboard
                Title="Employee Details"
                Keterangan="Detailed information of employees"
            />
            <div>
                <Link to="../emp">
                <p className="text-sm text-blue-600 font-medium">
                    Back to Employee Management
                </p>
                </Link>
            </div>
            <div className="md:flex md:flex-row w-full">
                <div className="flex basis-1/4 items-center justify-center">
                    <img src="assets/PP.png" alt="" />
                </div>

                <div className="basis-3/4 m-4 text-center md:text-start">
                    <div className="md:flex md:justify-between items-center">
                        <div>
                            <h3 className="text-2xl text-orange-500 font-extrabold">
                                Fachriansyah Nur I
                            </h3>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">
                                Joined at, 21 Sept 202
                            </p>
                        </div>
                    </div>
                    <h4 className="text-2xl">TI00004</h4>
                    <table className="mt-5 text-start">
                        <tbody>
                            <tr>
                                <td>
                                    <p className="text-sm">Status</p>
                                </td>
                                <td>
                                    <p className="text-sm">:</p>
                                </td>
                                <td>
                                    <p className="text-sm text-orange-500">
                                        on duty / active
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="text-sm">Role</p>
                                </td>
                                <td>
                                    <p className="text-sm">:</p>
                                </td>
                                <td>
                                    <p className="text-sm">Employee</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="bg-gray-50 md:w-full border m-3 rounded flex flex-col justify-content-center">
                <div className="flex flex-row w-full justify-center md:justify-start">
                    <h3 className="text-md md:text-xl font-extrabold ml-4 text-center">
                        Employee Information
                    </h3>
                </div>
                <div className="md:flex md:flex-row w-full items-start m-4">
                    <div className="md:flex md:basis-2/5 items-center ">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <p className="text-xs md:text-sm w-20 md:w-auto">
                                            First Name
                                        </p>
                                    </td>
                                    <td>
                                        <p className="text-xs md:text">:</p>
                                    </td>
                                    <td>
                                        <p className="text-xs md:text">Ahmad</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="text-xs md:text">
                                            Last Name
                                        </p>
                                    </td>
                                    <td>
                                        <p className="text-xs md:text">:</p>
                                    </td>
                                    <td>
                                        <p className="text-xs md:text">
                                            Subagja
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="text-xs md:text">
                                            Birth Date
                                        </p>
                                    </td>
                                    <td>
                                        <p className="text-xs md:text">:</p>
                                    </td>
                                    <td>
                                        <p className="text-xs md:text">
                                            28 June 1985
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="text-xs md:text">
                                            Address
                                        </p>
                                    </td>
                                    <td>
                                        <p className="text-xs md:text">:</p>
                                    </td>
                                    <td>
                                        <p className="text-xs md:text">
                                            Jl. Sekeloa Utara no.22, RT/RW 10/52
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="md:basis-3/5 ">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <p className="text-xs md:text w-20 md:w-auto">
                                            City
                                        </p>
                                    </td>
                                    <td>
                                        <p className="text-xs md:text">:</p>
                                    </td>
                                    <td>
                                        <p className="text-xs md:text">
                                            Bandung
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="text-xs md:text">
                                            Nation
                                        </p>
                                    </td>
                                    <td>
                                        <p className="text-xs md:text">:</p>
                                    </td>
                                    <td>
                                        <p className="text-xs md:text">
                                            Indonesia
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="text-xs md:text">Email</p>
                                    </td>
                                    <td>
                                        <p className="text-xs md:text">:</p>
                                    </td>
                                    <td>
                                        <p className="text-xs md:text">
                                            ahmad.subagja77@gmail.com
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRole;
