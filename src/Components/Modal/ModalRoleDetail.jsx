import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import ButtonNormal from "../ButtonNormal";

const ModalRoleDetail = ({ isOpen, setIsOpen, title }) => {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={setIsOpen}
        as="div"
        className={
          "fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-800/25"
        }
      >
        <div className="items-start bg-white h-full md:h-3/5 w-full md:w-1/2 p-4 border-2 rounded space-y-4">
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
          <div className="w-full h-3/4 space-y-1">
            <div className="flex ">
              <div className="basis-1/4 ">
                <p className="font-medium text-gray-600">Role Name</p>
              </div>
              <div className="basis-3/4 ">
                <p className="font-bold text-gray-800">Supervisor</p>
              </div>
            </div>
            <div className="flex overflow-y-auto h-4/5">
              <div className="basis-1/4">
                <p className="font-medium text-gray-600">Permissions</p>
              </div>
              <div className="basis-3/4 ">
                <table className="w-full">
                  <thead className="font-semibold text-sm">
                    <tr>
                      <td>#</td>
                      <td>Permissions</td>
                      <td>details</td>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-medium">
                    <tr>
                      <td>1</td>
                      <td>Attendance management</td>
                      <td>
                        <ul className="list-disc">
                          <li>can view all attendance data</li>
                          <li>can view all attendance data</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Users management</td>
                      <td>
                        <ul className="list-disc">
                          <li>can manage user data</li>
                          <li>can create user data</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-2">
            <ButtonNormal
              bg="bg-yellow-400 "
              icon="akar-icons:edit"
              text="Edit"
              width="w-20"
              onClick={() => setIsOpen(false)}
            />
            <ButtonNormal
              bg="bg-red-600 "
              icon="bx:trash"
              text="Delete"
              width="w-20"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ModalRoleDetail;
