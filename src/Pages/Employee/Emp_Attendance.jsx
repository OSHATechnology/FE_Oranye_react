import React from "react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const FurloughCard = () => {
    return (
        <div className="">
            <div className="flex flex-row w-full">
                <div className="flex basis-1/4 items-center justify-center">
                    <img src="assets/Logo.png" alt="" />
                </div>
                <div className="basis-3/4 m-4">
                    <form action="">
                        <table className="w-full">
                            <tr>
                                <td className="w-24">
                                    <p className="mr-2 text-md">ID</p>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Id Employee"
                                        className="rounded w-full border border-gray-300"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="mr-2 text-md">Name</p>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Name Employee"
                                        className="rounded w-full border border-gray-300"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="mr-2 text-md">Type</p>
                                </td>
                                <td>
                                    <select
                                        name=""
                                        id=""
                                        className="rounded w-full border border-gray-300"
                                    >
                                        <option value="">Cuti Hamil</option>
                                        <option value="">Cuti Nikah</option>
                                        <option value="">Cuti We</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="mr-2 text-md">Start Date</p>
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        name=""
                                        id=""
                                        placeholder="Start Date"
                                        className="rounded w-full border border-gray-300"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="mr-2 text-md">End Date</p>
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        name=""
                                        id=""
                                        placeholder="End Date"
                                        className="rounded w-full border border-gray-300"
                                    />
                                </td>
                            </tr>
                        </table>
                        <div className="flex justify-end">
                            <button class="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300 mt-2">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const WorkPermitCard = () => {
    return (
        <div className="flex">
            <div className="flex flex-row w-full">
                <div className="flex basis-1/4 items-center justify-center">
                    <img src="assets/Logo.png" alt="" />
                </div>
                <div className="basis-3/4 m-4">
                    <form action="">
                        <table className="w-full">
                            <tr>
                                <td className="w-24">
                                    <p className="mr-2 text-md">ID</p>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Id Employee"
                                        className="rounded w-full border border-gray-300"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="mr-2 text-md">Name</p>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Name Employee"
                                        className="rounded w-full border border-gray-300"
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <p className="mr-2 text-md">Start Date</p>
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        name=""
                                        id=""
                                        placeholder="Start Date"
                                        className="rounded w-full border border-gray-300"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="mr-2 text-md">End Date</p>
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        name=""
                                        id=""
                                        placeholder="End Date"
                                        className="rounded w-full border border-gray-300"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="mr-2 text-md">Picture</p>
                                </td>
                                <td colSpan="2">
                                    <input
                                        type="file"
                                        name=""
                                        id=""
                                        placeholder="End Date"
                                        className="rounded w-full border border-gray-300"
                                    />
                                </td>
                            </tr>
                        </table>
                        <div className="flex justify-end">
                            <button class="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300 mt-2">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default function KaryawanKehadiran() {
    const actionType = [
        {
            id: 1,
            name: "Furlough",
            component: <FurloughCard />,
        },
        {
            id: 2,
            name: "Work Permit",
            component: <WorkPermitCard />,
        },
    ];

    return (
        <div className="">
            <div className="flex justify-center mt-8 mb-2">
                <div className="justify-end flex md:w-4/5 ">
                    <button className="w-fit h-fit bg-yellow-500 rounded p-1">
                <Icon icon="akar-icons:bell" className="text-center text-lg text-black" />
                    </button>
                </div>
            </div>
            <div className="flex justify-center ">
                <div className=" items-start justify-center md:min-h-1/3 md:flex md:flex-row md:w-4/5 md:gap-4 space-y-8 md:space-y-0">
                    <div className="flex w-full basis-1/2 min-h-max md:min-h-full shadow-xl items-center justify-center rounded-xl border-2 border-gray-100 md:border-0 mt-4 md:mt-0">
                        <div className="w-full py-4 sm:px-0 ml-4">
                            <Tab.Group>
                                <Tab.List className="flex space-x-1 rounded-xl">
                                    {actionType.map((type) => (
                                        <Tab
                                            key={type.id}
                                            className={({ selected }) =>
                                                classNames(
                                                    "focus:outline-none hover:text-orange-500 mr-2",
                                                    selected
                                                        ? "border-b-2 border-orange-500"
                                                        : " "
                                                )
                                            }
                                        >
                                            <p className="text-md font-semibold">
                                                {type.name}
                                            </p>
                                        </Tab>
                                    ))}
                                </Tab.List>
                                <Tab.Panels className="mt-2">
                                    {actionType.map((type) => (
                                        <Tab.Panel
                                            key={type.id}
                                            className={classNames(
                                                "rounded-xl bg-white",
                                                "ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2"
                                            )}
                                        >
                                            {type.component}
                                        </Tab.Panel>
                                    ))}
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
                    <div className="flex w-full basis-1/2 md:min-h-full shadow-xl items-start justify-center rounded-xl pr-4 border-2 border-gray-100 md:border-0">
                        <div class="w-full py-4 sm:px-0 ml-4">
                            <div className="flex space-x-1 rounded-xl p-1 mt-1">
                                <p className="text-md font-semibold">
                                    Overtime
                                </p>
                            </div>
                            <div className="mt-6">
                                <form action="">
                                    <table className="w-full">
                                        <tr>
                                            <td>
                                                <p className="mr-2 text-md">
                                                    ID
                                                </p>
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name=""
                                                    id=""
                                                    placeholder="Id Employee"
                                                    className="rounded w-full border border-gray-300"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="mr-2 text-md">
                                                    ID Assigned
                                                </p>
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name=""
                                                    id=""
                                                    placeholder="ID Assigned"
                                                    className="rounded w-full border border-gray-300"
                                                />
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <p className="mr-2 text-md">
                                                    Start
                                                </p>
                                            </td>
                                            <td>
                                                <input
                                                    type="date"
                                                    name=""
                                                    id=""
                                                    placeholder="Start Date"
                                                    className="rounded w-full border border-gray-300"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="mr-2 text-md">
                                                    End
                                                </p>
                                            </td>
                                            <td>
                                                <input
                                                    type="date"
                                                    name=""
                                                    id=""
                                                    placeholder="End Date"
                                                    className="rounded w-full border border-gray-300"
                                                />
                                            </td>
                                        </tr>
                                    </table>
                                    <div className="flex justify-end">
                                        <button class="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300 mt-2">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-8 mb-2">
                <div className=" items-start md:flex md:flex-row md:w-4/5">
                    <p className="text-lg font-semibold">History</p>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="items-start md:min-h-1/3 md:flex md:flex-row md:w-4/5">
                    <table className=" w-full text-center overflow-x-scroll">
                        <thead className="bg-gray-100 border-b-2 border-gray-800 text-xs md:text-sm">
                            <tr className="">
                                <th className=" py-2">No</th>
                                <th className="">Name</th>
                                <th className="">Date</th>
                                <th className="">Type</th>
                                <th className="">Status</th>
                                <th className="">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs md:text-sm font-medium">
                            <tr className=" shadow ">
                                <td>1</td>
                                <td>
                                    <div className="text-center flex items-center justify-center md:space-x-4">
                                        <img
                                            src="assets/PP.png"
                                            alt=""
                                            className="w-10"
                                        />
                                        <span>Tatang Suherman</span>
                                    </div>
                                </td>
                                <td>06 Sept 2022</td>
                                <td>
                                    <div className="flex items-center justify-center py-4">
                                        <Icon
                                            icon="bi:airplane-engines-fill"
                                            className="text-xl mr-1"
                                        />
                                        <span>Furlough</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-green-800">
                                        Pending
                                    </span>
                                </td>
                                <td>
                                    <button className="bg-blue-600 rounded p-1"><Icon icon="carbon:view" className="text-white"></Icon></button>
                                </td>
                            </tr>
                           
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
