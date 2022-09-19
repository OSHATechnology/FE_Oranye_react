import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import ButtonNormal from "../ButtonNormal";

const ModalDetailPartner = ({ isOpen, setIsOpen, title }) => {
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
                <div className="items-start bg-white min-h-1-2 w-fit p-4 border-2 rounded space-y-4">
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
                        <table className=" text-sm font-medium text-gray-700">


                            <tr>
                                <td>Partner Name</td>
                                <td>:</td>
                                <td>Tatang Suherman</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>:</td>
                                <td>description about partner</td>
                            </tr>
                            <tr>
                                <td className="align-top">Address</td>
                                <td className="align-top">:</td>
                                <td>Kp.Pasekon Jl.SDN Cipanas 04 Cianjur</td>
                            </tr>
                            <tr>
                                <td className="w-28">Responsible by</td>
                                <td className="w-2">:</td>
                                <td className="w-48">Arunika</td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td>:</td>
                                <td>083817327542</td>
                            </tr>
                            <tr>
                                <td>Joined At</td>
                                <td>:</td>
                                <td>15 September 2022</td>
                            </tr>
                            <tr>
                                <td>Assigned By</td>
                                <td>:</td>
                                <td>Admin OSHA</td>
                            </tr>

                        </table>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default ModalDetailPartner;
