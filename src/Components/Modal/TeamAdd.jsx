import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import ButtonNormal from "../ButtonNormal";

const TeamAdd = ({ isOpen, setIsOpen, title }) => {
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
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Team Name
              </p>
              <input
                type="text"
                placeholder="Team Name"
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>

            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Leader Team
              </p>
              <input
                type="text"
                placeholder="Leader Team"
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Team Maker
              </p>
              <input
                type="text"
                placeholder="Team Maker"
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

export default TeamAdd;
