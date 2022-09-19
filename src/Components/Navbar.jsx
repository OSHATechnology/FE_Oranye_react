import React, { Fragment } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";

import NavbarMobile from "@/Components/NavbarMobile";

export default function Navbar() {
    return (
        <>
            <nav className="bg-white px-2 sm:px-4 py-2.5 sticky w-full z-20 top-0 left-0 drop-shadow ">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <a href="#" className="flex items-center">
                        <img
                            src="assets/Logo.png"
                            className="mr-3 h-6 sm:h-9"
                            alt="Logo OSHA"
                        />
                        {/* <span className="self-center text-xl font-semibold whitespace-nowrap">
                            Flowbite
                        </span> */}
                    </a>
                    <div className="flex md:order-2">
                        <button
                            type="button"
                            className="hidden place-content-center text-gray-900 bg-white border  border-gray-900 hover:bg-gray-900 hover:text-white focus:ring-2 focus:outline-none font-medium rounded text-sm py-2.5 text-center mr-3 md:mr-0 md:flex w-40"
                        >
                            <Icon
                                icon="mdi-light:logout"
                                className="text-xl mr-1"
                            />
                            Logout
                        </button>
                        {/* <button
                            data-collapse-toggle="navbar-sticky"
                            type="button"
                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                            aria-controls="navbar-sticky"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </button> */}
                        <div className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                            <div className="fixed right-2 w-full text-right">
                                <Menu
                                    as="div"
                                    className="relative inline-block text-left"
                                >
                                    <div>
                                        <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-800 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-opacity-75">
                                            <Icon
                                                icon="charm:menu-hamburger"
                                                className="text-xl mr-1"
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="px-1 py-1 ">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link to="/">
                                                            <button
                                                                className={`${
                                                                    active
                                                                        ? "bg-violet-500 text-white"
                                                                        : "text-gray-900"
                                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 bg-white  hover:bg-gray-900 hover:text-white focus:ring-2 focus:outline-none font-medium`}
                                                            >
                                                                <Icon
                                                                    icon="clarity:home-solid"
                                                                    className="text-xl mx-3"
                                                                />
                                                                Home
                                                            </button>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                            <div className="px-1 py-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link to="profile">
                                                            <button
                                                                className={`${
                                                                    active
                                                                        ? "bg-violet-500 text-white"
                                                                        : "text-gray-900"
                                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 bg-white  hover:bg-gray-900 hover:text-white focus:ring-2 focus:outline-none font-medium`}
                                                            >
                                                                <Icon
                                                                    icon="carbon:user-avatar-filled"
                                                                    className="text-xl mx-3"
                                                                />
                                                                Profile
                                                            </button>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                            <div className="px-1 py-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link to='Attendance'>
                                                            <button
                                                                className={`${
                                                                    active
                                                                        ? "bg-violet-500 text-white"
                                                                        : "text-gray-900"
                                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 bg-white  hover:bg-gray-900 hover:text-white focus:ring-2 focus:outline-none font-medium`}
                                                            >
                                                                <Icon
                                                                    icon="bx:calendar-check"
                                                                    className="text-xl mx-3"
                                                                />
                                                                Attendance
                                                            </button>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                            <div className="px-1 py-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`${
                                                                active
                                                                    ? "bg-violet-500 text-white"
                                                                    : "text-gray-900"
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 bg-white  hover:bg-gray-900 hover:text-white focus:ring-2 focus:outline-none font-medium`}
                                                        >
                                                            <Icon
                                                                icon="fa6-solid:chart-column"
                                                                className="text-xl mx-3"
                                                            />
                                                            Performance
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                            <div className="px-1 py-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`${
                                                                active
                                                                    ? "bg-violet-500 text-white"
                                                                    : "text-gray-900"
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm place-content-center text-gray-900 bg-white border border-gray-900 hover:bg-gray-900 hover:text-white focus:ring-2 focus:outline-none font-medium  text-center mr-3 md:mr-0 `}
                                                        >
                                                            <Icon
                                                                icon="mdi-light:logout"
                                                                className="text-xl mr-1"
                                                            />
                                                            Logout
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <div
                        className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
                        id="navbar-sticky"
                    >
                        <ul className="flex flex-colbg-white rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
                            <li>
                                <Link to="/">
                                    <button
                                        type="button"
                                        className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900  bg-white rounded-lg  hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white w-40"
                                    >
                                        <a href="#" aria-current="page">
                                            Home
                                        </a>
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <Link to="Profile">
                                    <button
                                        type="button"
                                        className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900  bg-white rounded-lg  hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white w-40"
                                    >
                                        <a href="#" aria-current="page">
                                            Profile
                                        </a>
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <Link to="Attendance">
                                    <button
                                        type="button"
                                        className="py-2.5 px-5 mr-2  text-sm font-medium text-gray-900  bg-white rounded-lg  hover:bg-gray-900 hover:text-white w-40"
                                    >
                                        <a href="#">Attendance</a>
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className="py-2.5 px-5 mr-2  text-sm font-medium text-gray-900  bg-white rounded-lg  hover:bg-gray-900 hover:text-white w-40"
                                >
                                    <a href="#">Performance</a>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
