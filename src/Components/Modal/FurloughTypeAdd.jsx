import { Dialog } from "@headlessui/react";
import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";
import ButtonNormal from "../ButtonNormal";

const FurloughAdd = ({ isOpen, setIsOpen, title, action = null }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [max, setMax] = useState("");
  const actionRefresh = action ? action : null;

  function changeDataToNull() {
    setName("");
    setType("");
    setMax("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      'name': name,
      'type': type,
      'max': max
    };
  

  try {
    let formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    const rslt = await axios.post('/api/furlough_type', formData, ConfigHeader);
    console.log(rslt);
    setIsOpen(false);
    actionRefresh !== null && actionRefresh();
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
              id="furlough_type_form"
              onSubmit={handleSubmit}
            >
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Name</p>
                <input
                  type="text"
                  placeholder="Name"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  name="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Duration</p>
                <input
                  type="number"
                  name="lastName"
                  placeholder="Max"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Type</p>
                <select
                  name="type"
                  id=""
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="-" disabled selected>-- Select Type --</option>
                  <option value="daily">daily</option>
                  <option value="weekly">Week</option>
                  <option value="monthly">Month</option>
                </select>
              </div>
            </form>
          </div>

          <div className="flex justify-end gap-2">
            <ButtonNormal bg="bg-gray-400 " text="Cancel" width="w-16" />
            <button
              type="submit"
              form="furlough_type_form"
              className="bg-green-600 rounded text-white px-2"
            >
              submit
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default FurloughAdd;
