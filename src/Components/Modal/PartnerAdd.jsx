import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import ButtonNormal from "../ButtonNormal";

const PartnerAdd = ({ isOpen, setIsOpen, title }) => {
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
        <div className="items-start bg-white h-1/2 w-full md:w-2/5 p-4 border-2 rounded space-y-4">
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
          <div className="w-full h-3/4 overflow-y-scroll space-y-1">
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Company's Name
              </p>
              <input
                type="text"
                placeholder="Company's name"
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>
            <div className="">
              <p className="text-sm font-semibold text-gray-600">Description</p>
              <textarea
                name=""
                id=""
                cols="30"
                rows="5"
                placeholder="Description"
                className="rounded-lg  border w-full border-gray-300 text-xs text-gray-700 font-medium"
              ></textarea>
            </div>
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Responsible by
              </p>
              <input
                type="text"
                placeholder="Responsible by"
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Phone Number
              </p>
              <input
                type="text"
                placeholder="Phone Number"
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Company's Address
              </p>
              <input
                type="text"
                placeholder="Company's Address"
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Assigned By
              </p>
              <input
                type="text"
                placeholder="Assigned By"
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>
            
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Photo
              </p>
              <input
                type="file"
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Joined At
              </p>
              <input
                type="date"
                placeholder="Joined At"
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <ButtonNormal
              bg="bg-gray-400 "
              text="Cancel"
              width="w-16"
              onClick={() => setIsOpen(false)}
            />
            <ButtonNormal bg="bg-green-600 " text="Add" width="w-16" />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default PartnerAdd;
