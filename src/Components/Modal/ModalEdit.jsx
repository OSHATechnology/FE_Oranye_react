import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import EditFormEmployee from "./EditFormEmp";
import EditFormPartner from "./EditFormPartner";
import EditFormFurloughType from "./EditFormFurloughType";
import EditFormAttendanceStatus from "./EditFormAttendanceStatus";
import EditFormAllowance from "./EditFormAllowance";
import EditFormInsuranceItem from "./EditFormInsuranceItem";
import FormEditMember from "./FormEditMember";
import EditFormFamily from "./EditFormFamily";

const ModalEdit = (props) => {
  const { isOpen, setIsOpen } = props;

  const [data, setData] = useState([]);

  // baru
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleFetchData = props.action;

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const typeData = props.typeData ? props.typeData : "default";

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
        aria-hidden="true"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800/50" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="items-start bg-white h-1/2 w-full md:w-2/5 p-4 border-2 rounded space-y-4">
            <button className=" float-right" onClick={() => setIsOpen(false)}>
              {" "}
              <Icon
                icon="eva:close-outline"
                className="text-lg text-gray-500 "
              />
            </button>

            <div className="text-center text-base font-bold">{props.title}</div>
            <div className="w-full overflow-y-auto h-3/4">
              {typeData === "employee" && (
                <EditFormEmployee
                  data={data}
                  handleCloseModal={handleCloseModal}
                  handleFetchData={handleFetchData}
                />
              )}
              {typeData === "partner" && (
                <EditFormPartner
                  data={data}
                  handleCloseModal={handleCloseModal}
                  handleFetchData={handleFetchData}
                />
              )}
              {typeData === "furlough_type" && (
                <EditFormFurloughType
                  data={data}
                  handleCloseModal={handleCloseModal}
                  handleFetchData={handleFetchData}
                />
              )}
              {typeData === "attendance_status" && (
                <EditFormAttendanceStatus
                  data={data}
                  handleCloseModal={handleCloseModal}
                  handleFetchData={handleFetchData}
                />
              )}
              {typeData === "allowance" && (
                <EditFormAllowance
                  data={data}
                  handleCloseModal={handleCloseModal}
                  handleFetchData={handleFetchData}
                />
              )}
              {typeData === "insurance_item" && (
                <EditFormInsuranceItem
                  data={data}
                  handleCloseModal={handleCloseModal}
                  handleFetchData={handleFetchData}
                />
              )}
              {typeData === "family" && (
                <EditFormFamily
                  data={data}
                  handleCloseModal={handleCloseModal}
                  handleFetchData={handleFetchData}
                
                />
              )}
              
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default ModalEdit;
