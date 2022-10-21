import axios from "axios";
import React, { useEffect, useState } from "react";
import ConfigHeader from "../Auth/ConfigHeader";
import { AuthData } from "../Auth/AuthProvider";
import moment from "moment";

export default function KaryawanProfile(props) {
    const empAuthId = AuthData?.id ? AuthData?.id : 0;
    const [employee, setEmployee] = useState([]);

    const fetchDataEmp = async () => {
        const response = await axios.get(`/api/employee/` + empAuthId, ConfigHeader);
        setEmployee(response.data.data);
        console.log(response.data.data);
    }
    useEffect(() => {
        fetchDataEmp();
    }, []);

console.log(employee)
    return (
        <div className="flex justify-center">
            <div className=" items-start justify-center w-screen md:min-h-1/3 md:flex md:flex-row md:w-4/5">
                {employee?.length !== 0 ? (
                    <div className="bg-gray-50 md:w-full border m-3 rounded flex flex-col justify-content-center">
                        <div className="md:flex md:flex-row w-full">
                            <div className="flex basis-1/4 items-center justify-center">
                            {employee?.photo ? (
                                <img src={employee?.photo} alt="" className="w-36"/>
                            ) : ".."}
                                {/* <img src="assets/PP.png" alt="" /> */}
                            </div>

                            <div className="basis-3/4 m-4 text-center md:text-start">
                                <div className="md:flex md:justify-between items-center">
                                    <div>
                                        <h3 className="text-2xl text-orange-500 font-extrabold">{employee?.name}</h3>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Joined at, {moment(employee?.joinedAt).format("DD MMMM YYYY")}</p>
                                    </div>
                                </div>
                                <h4 className="text-2xl">{employee?.employeeId}</h4>
                                <table className="mt-5 text-start">
                                    <tr>
                                        <td><p className="text-sm">Status</p></td>
                                        <td><p className="text-sm">:</p></td>
                                        <td><p className="text-sm text-orange-500">{employee?.statusHire.status}</p></td>
                                    </tr>
                                    <tr>
                                        <td><p className="text-sm">Role</p></td>
                                        <td><p className="text-sm">:</p></td>
                                        <td><p className="text-sm">{employee?.role.role}</p></td>
                                    </tr>
                                </table>

                            </div>
                        </div>
                        <div className="flex flex-row w-full justify-center md:justify-start">
                            <h3 className="text-md md:text-xl font-extrabold ml-4 text-center">Employee Information</h3>
                        </div>
                        <div className="md:flex md:flex-row w-full items-start m-4">
                            <div className="md:flex md:basis-2/5 items-center ">
                                <table>
                                    <tr>
                                        <td><p className="text-xs md:text-sm w-20 md:w-auto">First Name</p></td>
                                        <td><p className="text-xs md:text">:</p></td>
                                        <td><p className="text-xs md:text">{employee?.firstName}</p></td>
                                    </tr>
                                    <tr>
                                        <td><p className="text-xs md:text">Last Name</p></td>
                                        <td><p className="text-xs md:text">:</p></td>
                                        <td><p className="text-xs md:text">{employee?.lastName}</p></td>
                                    </tr>
                                    <tr>
                                        <td><p className="text-xs md:text">Birth Date</p></td>
                                        <td><p className="text-xs md:text">:</p></td>
                                        <td><p className="text-xs md:text">{moment(employee?.birthDate).format("dddd, DD MMMM YYYY")}</p></td>
                                    </tr>
                                    <tr>
                                        <td><p className="text-xs md:text">Address</p></td>
                                        <td><p className="text-xs md:text">:</p></td>
                                        <td><p className="text-xs md:text">{employee?.address}</p></td>
                                    </tr>
                                </table>
                            </div>
                            <div className="md:basis-3/5 ">
                                <table>
                                    <tr>
                                        <td><p className="text-xs md:text w-20 md:w-auto">City</p></td>
                                        <td><p className="text-xs md:text">:</p></td>
                                        <td><p className="text-xs md:text">{employee?.city}</p></td>
                                    </tr>
                                    <tr>
                                        <td><p className="text-xs md:text">Nation</p></td>
                                        <td><p className="text-xs md:text">:</p></td>
                                        <td><p className="text-xs md:text">{employee?.nation}</p></td>
                                    </tr>
                                    <tr>
                                        <td><p className="text-xs md:text">Email</p></td>
                                        <td><p className="text-xs md:text">:</p></td>
                                        <td><p className="text-xs md:text">{employee?.email}</p></td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    "Loading"
                )}
            </div>
        </div>
    );
}
