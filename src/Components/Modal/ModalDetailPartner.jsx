import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import ButtonNormal from "../ButtonNormal";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";
import moment from "moment";

const ModalDetailPartner = ({ isOpen, setIsOpen, title, ...data }) => {

    const [partnerData, setPartnerData] = useState({});
    // console.log(data.data);
    // async function fetchDataPartner() {
    //     const response = await fetch(`http://localhost:8000/api/partners/${data.id}`, ConfigHeader);
    //     const jsonData = await response.json();
    //     setPartnerData(jsonData.data);
    // }
    useEffect(() => {
        // fetchDataPartner();

        setPartnerData(data.data);
    }, []);
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
                        ID : {partnerData.id}
                    </p>
                    <div className="flex justify-center">
                        <table className=" text-sm font-medium text-gray-700">
                            <tbody>
                                <tr>
                                    <td>Partner Name</td>
                                    <td>:</td>
                                    <td>{partnerData.name}</td>
                                </tr>
                                <tr>
                                    <td>Description</td>
                                    <td>:</td>
                                    <td>{partnerData.description}</td>
                                </tr>
                                <tr>
                                    <td className="align-top">Address</td>
                                    <td className="align-top">:</td>
                                    <td>{partnerData.address}</td>
                                </tr>
                                <tr>
                                    <td className="w-28">Responsible by</td>
                                    <td className="w-2">:</td>
                                    <td className="w-48">{partnerData.resposibleBy}</td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>:</td>
                                    <td>{partnerData.phone}</td>
                                </tr>
                                <tr>
                                    <td>Joined At</td>
                                    <td>:</td>
                                    <td>{moment(partnerData.joinedAt).format("DD MMMM YYYY")}</td>
                                </tr>
                                <tr>
                                    <td>Assigned By</td>
                                    <td>:</td>
                                    <td>{(partnerData.assignedBy) ? partnerData.assignedBy.name : "-"}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default ModalDetailPartner;
