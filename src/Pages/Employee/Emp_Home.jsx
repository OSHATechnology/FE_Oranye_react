import React from "react";

const CardProfileEmployee = () => {
    return (
        <div className="">
            <div className="flex flex-col w-full md:w-4/5 border border-gray-300 shadow items-center justify-center rounded">
                <div className="mt-6 mb-4">
                    <img src="assets/PP.png" />
                </div>
                <div className="text-center ">
                    <p className="text-2xl font-bold text-amber-500">
                        John Doe
                    </p>
                    <p className="text-md font-semibold my-0.5">192390123</p>
                    <p className="text-md font-semibold">Employee</p>
                </div>
                <div class="flex flex-row gap-24 my-8">
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
    return (

        <div className="flex justify-center">
            <div className=" items-start justify-center w-screen md:min-h-1/3 md:flex md:flex-row md:w-4/5 mt-4">
            <div className="md:grid md:grid-cols-2 space-y-4 md:space-y-0">
                <div className="w-full justify-center ">
                    <CardProfileEmployee />
                </div>
                <div className="w-full justify-center space-y-4 md:space-y-0">
                    <CardStatusAttendance />
                    <CardRequest />
                </div>
                </div>
            </div>
            </div>
    );
}
