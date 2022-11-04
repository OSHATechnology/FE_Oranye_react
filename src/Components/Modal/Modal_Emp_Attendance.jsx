import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Dialog, Transition } from "@headlessui/react";

const Modal_Emp_Attendance = () => {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div className="flex justify-center items-center rounded-lg">
      <div className="items-start min-h-1-2 w-72 border-2 rounded space-y-4">
        <Icon
          icon="eva:close-outline"
          className="text-lg text-gray-500 float-right "
        />
        <div className="text-center text-base font-bold">Detail</div>
        <div className="w-full text-center  ">
          <table className="w-4/5 mx-12 text-xs font-semibold text-start  mb-4">
            <tr>
              <td>ID</td>
              <td>:</td>
              <td>KS76J09</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>:</td>
              <td>Tatang Suherman</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>:</td>
              <td>06 September2022</td>
            </tr>
            <tr>
              <td>Type</td>
              <td>:</td>
              <td>Furlough</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>:</td>
              <td>Pending</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Modal_Emp_Attendance;
