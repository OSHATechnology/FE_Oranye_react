import ButtonSmall from "../../../Components/ButtonSmall";
import SimpleCard from "../../../Components/SimpleCard";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import Modal from "../../../Components/Modal/ModalAttendance";

const Today = () => {
    const [isOpen, setIsOpen] = useState(false)
    const dataToday = [
        {
            id: "1",
            img: "../assets/PP.png",
            name: "Tatang Suherman",
            icon: "bi:airplane-engines-fill",
            type: "furlough",
            email: "suherman77@gmail.com",
        },
        {
            id: "2",
            img: "../assets/Logo.png",
            name: "Arunika",
            icon: "ic:baseline-work",
            type: "Work",
            email: "arunika28@gmail.com",
        },
    ];

    return (
        <div className="w-full space-y-4">
            <div className="flex gap-8">
                <SimpleCard
                    bgColor="bg-orange-100"
                    Title="Active"
                    Icon="clarity:assign-user-solid"
                    Count="7"
                />
                <SimpleCard
                    bgColor="bg-orange-100"
                    Title="Furlough"
                    Icon="bxs:plane"
                    Count="7"
                />
            </div>
            <div className="md:flex justify-between space-y-4 md:space-y-0">
                <div>
                    <p>Sunday, 28 August 2022</p>
                </div>
                <div className="flex gap-2 justify-end">
                    <input
                        type="text"
                        placeholder="Search"
                        className="rounded h-9 border border-gray-300"
                    />
                    <ButtonSmall icon="akar-icons:search" />
                    <ButtonSmall icon="ant-design:filter-outlined" />
                </div>
            </div>
            <div>
                <table className="w-full text-center overflow-x-scroll">
                    <thead className="bg-gray-200 h-10 border-b border-gray-500">
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Type</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs font-medium text-gray-700 md:text-sm">
                        {dataToday.map((row, index) => (
                            <tr key={row.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center justify-center">
                                        <img
                                            src={row.img}
                                            alt=""
                                            className="w-8"
                                        />
                                        <span>{row.name}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center justify-center">
                                        <Icon
                                            icon={row.icon}
                                            className="text-xl mr-1"
                                        />
                                        <span>{row.type}</span>
                                        {/* <Icon icon="bxs:plane" className= "text-xl"></Icon> */}
                                    </div>
                                </td>
                                <td>{row.email}</td>
                                <td>
                                    <ButtonSmall
                                        bg="bg-blue-500"
                                        icon="carbon:view"
                                        onClick={() => setIsOpen(!isOpen)}
                                    />
                                    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Info Detail"/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Today;
