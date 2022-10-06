import { Icon } from "@iconify/react";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ConfigHeader from "../Auth/ConfigHeader";

const CardProfileEmployee = () => {
    const [uid, setUid] = useState("");
    const [employee, setEmployee] = useState({});

    const fetchDataEmp = async () => {
        const response = await axios.get(`/api/employee/2`, ConfigHeader);
        setEmployee(response.data.data.data);
    }
    useEffect(() => {
        fetchDataEmp();
    }, []);

    return (
        <div className="">
            <div className="flex flex-col w-full border h-96  border-gray-300 shadow items-center justify-center rounded">
                <div className="md:w-full md:justify-center flex items-center gap-16 md:gap-24">

                <div className="mt-6 mb-4">
                    <img src="assets/PP.png" alt="" />
                </div>
                <div className="text-center ">
                    <p className="text-2xl font-bold text-amber-500">
                        John Doe
                    </p>
                    <p className="text-md font-semibold my-0.5">192390123</p>
                    <p className="text-md font-semibold">Employee</p>
                </div>
                </div>
                <div className="flex flex-row gap-24 my-8">
                    <div className="text-center">
                        <p className="text-md text-black">Total Leave</p>
                        <p className="text-sm text-gray-600 font-medium">0</p>
                    </div>
                    <div className="text-center">
                        <p className="text-md text-black">Total Absent</p>
                        <p className="text-sm text-gray-600 font-medium">0</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
const CardPinjaman = () => {

    return (
        <div className="">
            <div className="flex flex-col w-full md:w-full border border-gray-300 shadow space-y-7  rounded">
               <div className="flex items-center gap-4 justify-start ml-4 mt-5">
                    <div>
                        <Icon className="text-5xl text-white bg-gray-600 rounded-full p-2" icon={"healthicons:money-bag"}></Icon>
                    </div>
                    <div>
                        <p className="font-bold text-gray-600">Pinjaman</p>
                        <p className="text-xs font-medium text-gray-400">{moment().format("dddd, DD MMMM YYYY")}</p>
                    </div>
               </div>
               <div className="flex justify-between mx-8 text-sm font-medium text-gray-600">
                <div className="">
                    <p>Total Pinjaman</p>
                    <p>Telah Bayar</p>
                    <p>Sisa Bayar</p>
                </div>
                <div>
                    <p>300.000</p>
                    <p>100.000</p>
                    <p>200.000</p>
                </div>
               </div>
               <div className="w-full  px-8 text-center py-2">
                    <p className="border-t border-gray-600">Belum Lunas</p>
               </div>
            </div>
        </div>
    );
};

const CardStatusAttendance = () => {
    return (
        <div className="md:mb-8">
            <div className="flex flex-col w-full md:w-full border border-gray-300 shadow rounded p-2">
                <div className="text-center my-4">
                    <p className="text-base text-black">Attendance Status</p>
                </div>
                <div className="w-full text-center mb-4">
                    <table className="w-full ">
                        <thead className="bg-gray-300">
                            <tr>
                                <th className="w-1/2">Attendance</th>
                                <th className="w-1/2">Time</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-50">
                            <tr>
                                <td>in</td>
                                <td>8:30</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const CardRequest = () => {
    return (
        <div className="">
            <div className="container flex flex-col w-full md:w-full border border-gray-300 shadow rounded p-2">
                <div className="text-center my-4">
                    <p className="text-base text-black">
                        Leave & Overtime Request
                    </p>
                </div>
                <div className="w-full text-center mb-4">
                    <table className="w-full ">
                        <thead className="bg-gray-300">
                            <tr>
                                <th className="w-1/4 text-xs md:text-base">Type</th>
                                <th className="w-1/4 text-xs md:text-base">Requested At</th>
                                <th className="w-1/4 text-xs md:text-base">Approved At</th>
                                <th className="w-1/4 text-xs md:text-base">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-50">
                            <tr>
                                <td className="text-xs md:text-base">overtime</td>
                                <td className="text-xs md:text-base">16:50 12/02/2022</td>
                                <td className="text-xs md:text-base"></td>
                                <td className="text-yellow-500 text-xs md:text-base">
                                    waiting for approved
                                </td>
                            </tr>
                            <tr>
                                <td className="text-xs md:text-base">furlough </td>
                                <td className="text-xs md:text-base">08:00 01/02/2022</td>
                                <td className="text-xs md:text-base">08:05 01/02/2022</td>
                                <td className="text-green-500 text-xs md:text-base">approved</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default function Emp_Home() {
    const [dataAttendance, setDataAttendance] = useState({});
    const [dataRequest, setDataRequest] = useState({});

    useEffect(() => {
        setDataAttendance({
            attendance: "in",
            time: "8:30",
        });
        setDataRequest({
            type: "overtime",
            requestedAt: "16:50 12/02/2022",
            approvedAt: "",
            status: "waiting for approved",
        });
    }, []);


    return (

        <div className="flex justify-center ">

            <div className="gap-4 items-start justify-center w-screen md:min-h-1/3  md:w-4/5 mt-4 space-y-2 md:space-y-4">
                    <div className=" md:flex md:flex-row space-y-2 md:space-y-0 gap-4">

                    <div className="w-full md:w-3/5 justify-center ">
                        <CardProfileEmployee />
                    </div>
                    <div className="w-full md:w-2/5 justify-center space-y-2 md:space-y-4">
                        <CardPinjaman />
                        <CardStatusAttendance />
                    </div>
                    </div>
                    
               
                        <CardRequest />
            </div>

        </div>
    );
}
