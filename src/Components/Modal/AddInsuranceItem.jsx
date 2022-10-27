import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import ButtonNormal from "../ButtonNormal";
import axios from "axios";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";

const AddInsuranceItem = ({ isOpen, setIsOpen, title, action = null, ...data }) => {
    const [insuranceId, setInsuranceId] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [percent, setPercent] = useState("");
    
  const [dataRole, setDataRole] = useState([]);
    const [dataInsuranceItem, setDataInsuranceItem] = useState({});
    const [dataInsurance, setDataInsurance] = useState({});
    const actionRefresh = action ? action : null;

    function changeDataToNull() {
        setInsuranceId("");
        setName("");
        setType("");
        setPercent("");
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
          insuranceId: dataInsurance.id,
          name: name,
          type: type,
          percent: percent,
        };
    
        try {
          const rslt = await axios.post(`/api/insurance_item`, data, ConfigHeader);
          console.log(rslt);
          setIsOpen(false);
          actionRefresh !== null && actionRefresh();
          changeDataToNull();
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        setDataInsurance(data.data);
        const fetchDataRole = async () => {
          const data = await axios.get(`/api/roles`, ConfigHeader);
          setDataRole(data.data.data.data);
        };
        fetchDataRole();
      }, [data]);

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
        <div className="items-start bg-white h-fit w-full md:w-2/5 p-4 border-2 rounded space-y-4">
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
              id="insurance_item_form"
              onSubmit={handleSubmit}
             
            >
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">
                  Insurance Name
                </p>
                <input
                  type="text"
                  value={dataInsurance.name ? dataInsurance.name : ""}
                  disabled
                  className="rounded-lg w-full bg-gray-100 border border-gray-300 text-xs text-gray-700 font-semibold"
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Service Name</p>
                <input
                  type="text"
                  placeholder="name"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Service Type</p>
                <select
                  name="type"
                  id=""
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="allowance" disabled selected>-- Select Type --</option>
                  <option value="allowance" >Allowance</option>
                  <option value="deduction">Deduction</option>
                </select>
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Percent</p>
                <input
                  type="number"
                  placeholder="percent"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  value={percent}
                  onChange={(e) => setPercent(e.target.value)}
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Role</p>
                <div className="flex gap-4">
                  {dataRole &&
                    dataRole.map((item, index) => {
                      return (
                        <div>
                          <div className="flex items-center gap-1">
                            <input
                              type="checkbox"
                              id={"role" + item.roleId}
                              value={item.roleId}
                              className={
                                "rounded border border-gray-400 item-permission-"
                              }
                            />
                            <label
                              htmlFor={"role" + item.roleId}
                              className="text-sm font-medium text-gray-600"
                            >{item.nameRole}</label>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </form>
          </div>

          <div className="flex justify-end gap-2">
            <ButtonNormal
              bg="bg-gray-400 "
              text="Cancel"
              width="w-16"
              onClick={() => setIsOpen(false)}
            />
            <button type="submit" form="insurance_item_form" className="bg-green-500 text-white rounded px-2">
              submit
            </button>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default AddInsuranceItem