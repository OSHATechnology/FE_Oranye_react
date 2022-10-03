import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import ButtonNormal from "../ButtonNormal";
import axios from "axios";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";

const Modal = ({ isOpen, setIsOpen, title }) => {
  const [file, setFile] = useState();
  const downloadFormat = (type) => {
    let url;
    switch (type) {
      default:
        url = "format-import-employee.xlsx";
        break;
    }

    axios.get(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("file", file);
    await axios
      .post(`/api/employee/import`, formData, ConfigHeader)
      .then((res) => {
        console.log(res);
        setIsOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        <form
          id="employee_import"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
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
            <input
              type="file"
              className="rounded border border-gray-600"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-700 hover:font-bold">
              <Icon
                icon="bi:download"
                className="text-blue-700 text-xs font-extrabold"
              ></Icon>
              <a
                href="#download-format"
                onClick={downloadFormat("emp")}
                className=""
              >
                Download Format
              </a>
            </div>
            <div className=" flex gap-2">
              <ButtonNormal
                bg="bg-gray-400 "
                text="Cancel"
                width="w-16"
                onClick={() => setIsOpen(false)}
              />
              <ButtonNormal type="submit" bg="bg-green-600 " text="Import" width="w-16" />
            </div>
          </div>
        </div>
        </form>
      </Dialog>
    </>
  );
};

export default Modal;
