import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import ButtonNormal from "../ButtonNormal";
import ModalDelete from "../../Components/Modal/ModalDelete";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";
import axios from "axios";
import Select from "react-select";
import { useParams } from "react-router-dom";

const ManageSalaryByEmployee = ({
  isOpen,
  setIsOpen,
  title,
  data,
  action = null,
}) => {
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
        <div className="items-start bg-white h-fit w-full md:w-2/5 p-4 border-2 rounded space-y-4">
          <div className="flex text-center text-xl font-bold justify-between ">
            {title}
            <button className=" float-right" onClick={() => setIsOpen(false)}>
              {" "}
              <Icon
                icon="eva:close-outline"
                className="text-lg text-gray-500 "
              />
            </button>
          </div>
          <div className="w-full h-3/4 overflow-y-auto space-y-1">
        <div className="flex items-end gap-2">
            <div className="w-full">
              <p className="text-sm font-extrabold text-gray-600">
                Set Salary for Employee
              </p>
              <input
                type="text"
                placeholder="Salary Employee"
                autoFocus
                className="rounded w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>
          
          <div className="flex justify-center">
            {/* <ButtonNormal bg="bg-red-500 " text="Delete Team" width="w-30" /> */}
            <ButtonNormal bg="bg-green-500 " text="Save" width="w-16" />
          </div>
          </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ManageSalaryByEmployee;
