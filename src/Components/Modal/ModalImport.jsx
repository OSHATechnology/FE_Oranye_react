import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import ButtonNormal from "../ButtonNormal";

const Modal = ({ isOpen, setIsOpen, title }) => {
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
        <div className="items-start bg-white min-h-1-2  p-4 border-2 rounded space-y-4">
          <div className="flex text-center text-base font-bold justify-between ">
            {title}
            <button className=" float-right" onClick={() => setIsOpen(false)}>
              {" "}
              <Icon
                icon="eva:close-outline"
                className="text-lg text-gray-500 "
              />
            </button>
          </div>
          <div className="l">
            <input type="file" className="rounded border border-gray-600" />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
                <Icon icon="bi:download" className="text-blue-500 text-xs font-extrabold"></Icon>
              <p className="text-sm text-blue-500">Download Format</p>
            </div>
            <div className=" flex gap-2">
              <ButtonNormal
                bg="bg-gray-400 "
                text="Cancel"
                width="w-16"
                onClick={() => setIsOpen(false)}
              />
              <ButtonNormal bg="bg-green-600 " text="Import" width="w-16" />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;
