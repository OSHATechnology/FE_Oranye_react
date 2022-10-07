import { Dialog } from "@headlessui/react";
import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";
import ButtonNormal from "../ButtonNormal";

const AttendanceStatusAdd = ({ isOpen, setIsOpen, title }) => {
    const [status, setStatus] = useState("");
    
    function changeDataToNull() {
      setStatus("");
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = {
        'status': status,
      };
    
  
    try {
      let formData = new FormData();
      for (let key in data) {
        formData.append(key, data[key]);
      }
      const rslt = await axios.post('/api/attendance_status', formData, ConfigHeader);
      console.log(rslt);
      setIsOpen(false);
  
      changeDataToNull();
    } catch (error) {
      console.log(error);
    }
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
          <div className="items-start bg-white h-fit w-full md:w-1/5 p-4 border-2 rounded space-y-4">
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
              <form
                id="attendance_status_form"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <div className="">
                  <p className="text-sm font-extrabold text-gray-600">Status</p>
                  <input
                    type="text"
                    placeholder="status"
                    className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                    name="Status"
                    value={status}
                  onChange={(e) => setStatus(e.target.value)}
                
                  />
                </div>
              </form>
            </div>
  
            <div className="flex justify-end gap-2">
              <ButtonNormal bg="bg-gray-400 " text="Cancel" width="w-16" />
              <button
                type="submit"
                form="attedance_status_form"
                className="bg-green-600 rounded text-white px-2"
              >
                submit
              </button>
            </div>
          </div>
        </Dialog>
      </>
  )
}

export default AttendanceStatusAdd