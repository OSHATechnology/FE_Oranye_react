import { Dialog } from "@headlessui/react";
import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";
import ButtonNormal from "../ButtonNormal";

const AddAllowance = ({ isOpen, setIsOpen, title }) => {
  const [role, setRole] = useState("");
  const [type, setType] = useState("");
  const [nominal, setNominal] = useState("");
  const [dataRole, setDataRole] = useState([]);
  const [dataType, setDataType] = useState([]);

  useEffect(() => {
    const fetchDataRole = async () => {
      const data = await axios.get(`/api/roles`, ConfigHeader);
      setDataRole(data.data.data.data);
    };

    const fetchType = async () => {
      const data = await axios.get(`/api/type_of_allowance`, ConfigHeader);
      setDataType(data.data.data.data);
    };

    fetchDataRole();
  }, []);

  function changeDataToNull() {
    setRole("");
    setType("");
    setNominal("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      role: role,
      type: type,
      nominal: nominal,
    };

    try {
      let formData = new FormData();
      for (let key in data) {
        formData.append(key, data[key]);
      }
      const rslt = await axios.post("/api/allowance", formData, ConfigHeader);
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
            <form id="allowance_form" onSubmit={handleSubmit}>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Status</p>
                <input
                  type="text"
                  placeholder="status"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  name="Status"
                //   value={status}
                //   onChange={(e) => setStatus(e.target.value)}
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Status</p>
                <select
                  name="role"
                  id=""
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value='-' selected disabled>-- select role --</option>
                  {dataRole.map((row, index) => (
                    <option value={row.roleId} key={index}>
                      {row.nameRole}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>

          <div className="flex justify-end gap-2">
            <ButtonNormal bg="bg-gray-400 " text="Cancel" width="w-16" />
            <button
              type="submit"
              form="allowance_form"
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

export default AddAllowance;
