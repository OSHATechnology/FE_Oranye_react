import TitleDashboard from "../../Components/TitleDashboard";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ConfigHeader from "../Auth/ConfigHeader";
import moment from 'moment';
import env from "react-dotenv";

const EmployeeDetail = () => {
    const paramsData = useParams();
    const [dataEmp, setDataEmp] = useState([
        {
            employeeId: "",
            name: "",
            photo: "",
            birthDate: "",
            gender: "",
            role: "",
            email: "",
            phone: "",
            address: "",
            isActive: "",
            emailVerifiedAt: "",
            joinedAt: "",
            resignedAt: "",
            statusHire: {
                id: "",
                status: ""
            }
        }]);

    useEffect(() => {
        const fetchDataEmp = async () => {
            const data = await axios.get(`${env.API_URL}/api/employee/${paramsData.id}`, ConfigHeader);
            setDataEmp(data.data.data);
        }

        fetchDataEmp().catch(err => {
            console.log(err.message);
        });
    }, [paramsData])

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
                                {dataEmp.name}
                            </h3>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">
                                Joined at, {moment(dataEmp.joinedAt).format('DD MMMM YYYY')}
                            </p>
                        </div>
                    </div>
                    <h4 className="text-2xl">{dataEmp.employeeId}</h4>
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
                                    <p className={`text-sm text-orange-500`}>
                                        {(dataEmp.statusHire) ? dataEmp.statusHire.status : ""}
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
                                    <p className="text-sm">{(dataEmp.role) ? dataEmp.role.role : ''}</p>
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
                                            Name
                                        </p>
                                    </td>
                                    <td>
                                        <p className="text-xs md:text">:</p>
                                    </td>
                                    <td>
                                        <p className="text-xs md:text">{dataEmp.name}</p>
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
                                            {moment(dataEmp.birthDate).format('DD MMMM YYYY')}
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
                                            {dataEmp.address}
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
                                            {dataEmp.city}
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
                                            {dataEmp.nation}
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
                                            {dataEmp.email}
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

export default EmployeeDetail;
