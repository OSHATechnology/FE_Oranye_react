import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import ButtonNormal from "../ButtonNormal";

const ModalFilterAttendance = ({ isOpen, setIsOpen, title }) => {
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
        <div className="items-start bg-white min-h-1-2 w-full md:w-fit p-4 border-2 rounded space-y-4">
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
          <div className="space-y-2">
            <p className="text-sm text-gray-600 font-semibold">Type</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  id="day"
                  name="fav_language"
                  value="day"
                  className="w-3 h-3 border border-gray-500"
                />
                <label for="day">day</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  id="month"
                  name="fav_language"
                  value="month"
                  className="w-3 h-3 border border-gray-500"
                />
                <label for="month">month</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  id="year"
                  name="fav_language"
                  value="year"
                  className="w-3 h-3 border border-gray-500"
                />
                <label for="year">year</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  id="custom"
                  name="fav_language"
                  value="custom"
                  className="w-3 h-3 border border-gray-500"
                />
                <label for="custom">custom</label>
              </div>
            </div>
            <div>
            <p className="text-sm text-gray-600 font-semibold">Date</p>
            <input type="text" className="w-full rounded h-8" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <ButtonNormal
              bg="bg-gray-400 "
              text="Cancel"
              width="w-16"
              onClick={() => setIsOpen(false)}
            />
            <ButtonNormal bg="bg-green-600 " text="Yes" width="w-16" />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ModalFilterAttendance;
