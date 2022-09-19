import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import ButtonNormal from "../ButtonNormal";

const ModalAttendance = ({ isOpen, setIsOpen, title }) => {
    return (
        <>
            <Dialog
                open={isOpen}
                onClose={setIsOpen}
                as="div"
                className={
                    "fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-800/50"
                }
            >
                <div className="items-start bg-white min-h-1-2 w-80 p-4 border-2 rounded space-y-4">
                    <button
                        className=" float-right"
                        onClick={() => setIsOpen(false)}
                    >
                        {" "}
                        <Icon
                            icon="eva:close-outline"
                            className="text-lg text-gray-500 "
                        />
                    </button>
                    <div className="flex text-center items-center gap-1 text-base font-bold justify-center ">
                        <Icon
                            icon="bxs:plane"
                            className="text-lg text-gray-500 "
                        />
                        <p className="text-gray-800">{title}</p>
                    </div>
                    <div className="justify-center flex">
                        <img src="../assets/PP.png" alt="" className="w-24 " />
                    </div>
                    <p className="text-center font-semibold text-gray-700">
                        ID : KS76J09
                    </p>
                    <div className="flex justify-center">
                        <table className="  text-sm font-medium text-gray-700">
                            <tr>
                                <td>Name</td>
                                <td>:</td>
                                <td>Tatang Suherman</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>:</td>
                                <td>suherman@gmail.com</td>
                            </tr>
                            <tr>
                                <td className="w-20">Start Date</td>
                                <td>:</td>
                                <td>30 August 2022</td>
                            </tr>
                            <tr>
                                <td>End Date</td>
                                <td>:</td>
                                <td>15 September 2022</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default ModalAttendance;
