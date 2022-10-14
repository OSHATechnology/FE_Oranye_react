import { Dialog } from "@headlessui/react";
import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";
import ButtonNormal from "../ButtonNormal";

const AddAllowance = ({ isOpen, setIsOpen, title, action = null }) => {
  const [role, setRole] = useState("");
  const [type, setType] = useState("");
  const [nominal, setNominal] = useState("");
  const [dataRole, setDataRole] = useState([]);
  const [dataType, setDataType] = useState([]);
  const actionRefresh = action ? action : null;

  useEffect(() => {
    const fetchDataRole = async () => {
      const data = await axios.get(`/api/roles`, ConfigHeader);
      setDataRole(data.data.data.data);
    };

    const fetchDataType = async () => {
      const data = await axios.get(`/api/type_of_allowance`, ConfigHeader);
      setDataType(data.data.data.data);
    };

    fetchDataRole();
    fetchDataType();
  }, []);

  function changeDataToNull() {
    setRole("");
    setType("");
    setNominal("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      roleId: role,
      typeId: type,
    };

    try {
      let formData = new FormData();
      for (let key in data) {
        formData.append(key, data[key]);
      }
      const rslt = await axios.post("/api/allowance", formData, ConfigHeader);
      console.log(rslt);
      //   setIsOpen(false);
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
            <form id="allowance_form" onSubmit={handleSubmit}>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Jabatan</p>
                <select
                  name="role"
                  id=""
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="-" selected disabled>
                    -- select role --
                  </option>
                  {dataRole.map((row, index) => (
                    <option value={row.roleId} key={index}>
                      {row.nameRole}
                    </option>
                  ))}
                </select>
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">
                  Tunjangan
                </p>
                <select
                  name="allowance"
                  id=""
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  onChange={(e) => {
                    setType(e.target.value);
                    setNominal(
                      dataType.find((item) => item.id == e.target.value)
                        ?.nominal
                    );
                  }}
                >
                  <option value="-" selected disabled>
                    -- select Allowance --
                  </option>
                  {dataType.map((row, index) => (
                    <option value={row.id} key={index}>
                      {row.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Nominal</p>
                <input
                  type="text"
                  disabled
                  placeholder="nominal"
                  className="rounded-lg w-full border border-gray-300 bg-gray-100 text-xs text-gray-700 font-medium"
                  name="Status"
                  value={nominal}
                  onChange={(e) => setNominal(e.target.value)}
                />
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
