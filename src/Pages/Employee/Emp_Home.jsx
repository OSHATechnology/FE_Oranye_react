import { Icon } from "@iconify/react";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ConfigHeader from "../Auth/ConfigHeader";

const CardProfileEmployee = () => {
    const [employee, setEmployee] = useState({});

    const fetchDataEmp = async () => {
        const response = await axios.get(`/api/employee/2`, ConfigHeader);
        setEmployee(response.data.data);
    }
    useEffect(() => {
        fetchDataEmp();
    }, []);

    return (
        <div className="">
            {(Object.keys(employee).length !== 0) ? (
                <div className="flex flex-col w-full border h-96  border-gray-300 shadow items-center justify-center rounded">
                    <div className="md:w-full md:justify-center flex items-center gap-5">

                        <div className="mt-6 mb-4">
                            {employee?.photo ? (
                                <img src={employee?.photo} alt="" />
                            ) : ".."}
                        </div>
                        <div className="text-center ">
                            <p className="text-2xl font-bold text-amber-500">
                                {employee?.name}
                            </p>
                            <p className="text-md font-semibold my-0.5">{employee?.employeeId}</p>
                            <p className="text-md font-semibold">{employee?.role?.role}</p>
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
            ) : (
                <div className="flex flex-col w-full border h-96  border-gray-300 shadow items-center justify-center rounded">
                    <div className="animate-pulse flex flex-col w-full border h-96  border-gray-300 shadow items-center justify-center rounded">
                        <div className="md:w-full md:justify-center flex items-center gap-16 md:gap-24">
                            <div className="rounded-full bg-slate-700 h-40 w-40"></div>
                        </div>
                        <div className="flex flex-row gap-24 my-2">
                            <div className="h-2 bg-slate-700 rounded"></div>
                        </div>
                    </div>
                </div>
            )}
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

const CardStatusAttendance = (props) => {
    // const empId = props.employee?.employeeId ? props.employee?.employeeId : 0;
    const empId = 2;

    const [attendanceToday, setAttendanceToday] = useState({});

    const fetchDataAttendance = async () => {
        const response = await axios.get(`/api/attendance/employee/${empId}/today`, ConfigHeader);
        setAttendanceToday(response.data.data);
    }

    useEffect(() => {
        fetchDataAttendance();
    }, []);

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
                            {attendanceToday?.data?.length === 0 && (
                                <tr>
                                    <td colSpan="2" className="text-center">
                                        -
                                    </td>
                                </tr>
                            )}
                            {(Object.keys(attendanceToday).length !== 0) ?
                                attendanceToday?.data?.map((item, index) => (
                                    <tr key={index}>
                                        <td className="text-center">{item?.typeInOut}</td>
                                        <td className="text-center">{
                                            moment(item?.timeAttend).format("HH:mm")
                                        }</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={2}>no data</td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const CardRequest = () => {
    const [leaveRequest, setLeaveRequest] = useState([]);

    const fetchDataLeaveRequest = async () => {
        try {
            const response = await axios.get(`/api/my/leave-requests`, ConfigHeader);
            setLeaveRequest(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.log("failed fetch data leave request");
        }
    }

    useEffect(() => {
        fetchDataLeaveRequest();
    }, []);

    return (
        <div className="flex flex-col border border-gray-300 shadow rounded p-2">
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
                            <th className="w-1/4 text-xs md:text-base">Confirmed At</th>
                            <th className="w-1/4 text-xs md:text-base">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-50">
                        {
                            leaveRequest?.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        -
                                    </td>
                                </tr>
                            )
                        }
                        {
                            leaveRequest?.map((item, index) => (
                                <tr key={index}>
                                    <td className="text-xs font-medium md:text-base">{item?.type}</td>
                                    <td className="text-xs text-gray-500 md:text-base">{item?.requestAt && item?.requestAt}</td>
                                    <td className="text-xs text-gray-500 md:text-base">{item?.confirmedAt && item?.confirmedAt}</td>
                                    {item?.status === "Confirmed" && (
                                        <td className="text-xs md:text-base text-green-500">{item?.status}</td>
                                    )}
                                    {item?.status === "Rejected" && (
                                        <td className="text-xs md:text-base text-red-500">{item?.status}
                                            <button className="ml-3 rounded-md border border-gray-300 bg-white py-1 px-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none ">
                                                <Icon className="text-red-500" icon={"bx:message-alt-error"}></Icon>
                                            </button>
                                        </td>
                                    )}
                                    {item?.status === "Waiting For Approved" && (
                                        <td className="text-xs md:text-base text-yellow-500">{item?.status}</td>
                                    )}
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
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
