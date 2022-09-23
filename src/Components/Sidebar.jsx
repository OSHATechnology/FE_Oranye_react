import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginImg from "../assets/Logo.png";

const Sidebar = () => {
    const navigate = useNavigate()
    const [isActive, setActive] = useState(false);

    const location = useLocation();
    const handleToggle = () => {
        setActive(!isActive);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const dataMenu = [
        // Pages
        {
            id: 1,
            icon: "ic:round-space-dashboard",
            title: "Dashboard",
            link: "",
            isActive: false,
            classAddon: "",
        },
        {
            id: 2,
            icon: "fa-solid:user-cog",
            title: "Role & Permissions",
            link: "role",
            isActive: false,
            classAddon: "",
        },
        {
            id: 3,
            icon: "fa6-regular:calendar-check",
            title: "Attendance",
            link: "hadir",
            isActive: false,
            classAddon: "",
        },
        {
            id: 4,
            icon: "bxs:user",
            title: "Employee",
            link: "emp",
            isActive: false,
            classAddon: "",
        },
        {
            id: 5,
            icon: "fa-solid:users",
            title: "Partner",
            link: "mitra",
            isActive: false,
            classAddon: "",
        },
        {
            id: 5,
            icon: "fluent:people-team-toolbox-20-filled",
            title: "Teams",
            link: "team",
            isActive: false,
            classAddon: "",
        },
        // {
        //     id: 6,
        //     icon: "carbon:update-now",
        //     title: "Detail Employee",
        //     link: "detail",
        //     isActive: false,
        //     classAddon: "",
        // },
    ];

    return (
        <div className="relative">
            <button
                className={(!isActive ? "hidden" : "") + " text-gray-800 text-4xl cursor-pointer rounded-md"}
                onClick={handleToggle}
            >
                <Icon className=" px-2" icon="charm:menu-hamburger" />
            </button>

            <div
                className={
                    "sidebar h-screen lg:left-0 p-2 w-[300px] overflow-y-auto text-center shadow bg-white " +
                    (isActive ? "hidden" : "")
                }
            >
                <div className="text-gray-800 text-xl">
                    <div className="p-2.5 mt-1 flex items-center justify-between">
                        <div className="flex items-center justify-center text-center">

                            <img src={LoginImg} alt="" className="w-32" />

                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={handleToggle}
                                className="text-xl text-gray-800 mr-1"
                            >
                                <Icon icon="carbon:close" />
                            </button>
                        </div>
                    </div>
                    <div className="my-2 bg-gray-600 h-[1px]"></div>
                </div>

                {dataMenu.map((item) => (
                    <Link to={item.link} key={item.id}
                        className={
                            "p-2.5 mt-6 flex items-center rounded-md px-4 duration-300 cursor-pointer text-gray-800  hover:bg-gray-200 " +
                            ((location.pathname === '/' + item.link) ? "bg-gray-200 text-white" : "")
                        }
                    >
                        <Icon icon={item.icon} className="text-xl mr-1" />
                        <span className="text-[15px] ml-4 text-gray-800 font-bold ">
                            {item.title}
                        </span>
                    </Link>
                ))}


                <div className="p-2.5 mt-3 flex items-center rounded-md px-4 border border-gray-800 duration-300 cursor-pointer hover:bg-gray-200  text-gray-800 " onClick={handleLogout}>
                    <Icon icon="mdi-light:logout" className="text-xl mr-1" />
                    <span className="text-[15px] ml-4 text-gray-800 font-bold">
                        Logout
                    </span>
                </div>

            </div>
        </div>
    );
};

export default Sidebar;
