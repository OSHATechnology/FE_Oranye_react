import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

export default function NavbarMobile() {
    return (
        <div className="flex flex-between m-2">
            <div>
                <img src="assets/Logo.png" alt="" className="w-24" />
            </div>
            <div className="fixed right-2 w-full text-right">
                <Menu as="div" className="relative inline-block text-left">
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
                                                icon="carbon:user-avatar-filled"
                                                className="text-xl mx-3"
                                            />
                                            Profile
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
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 bg-white  hover:bg-gray-900 hover:text-white focus:ring-2 focus:outline-none font-medium`}
                                        >
                                            <Icon
                                                icon="bx:calendar-check"
                                                className="text-xl mx-3"
                                            />
                                            Attendance
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
    );
}
