import { Dialog } from "@headlessui/react";
import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";
import ButtonNormal from "../ButtonNormal";

const ModalAddMember = ({ isOpen, setIsOpen, title, action = null , ...data }) => {
    const [dataEmployee, setDataEmployee] = useState({});
    const [identityNumber, setIdentityNumber] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [isAlive, setIsAlive] = useState("");
    const actionRefresh = action ? action : null;

    function changeDataToNull() {
        setDataEmployee("");
        setIdentityNumber("");
        setName("");
        setStatus("");
        setIsAlive("");
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
          empId: dataEmployee.employeeId,
          identityNumber: identityNumber,
          name: name,
          statusId: status,
          isAlive: isAlive ? 1 : 0,
        }; 
        try {
          let formData = new FormData();
          for (let key in data) {
            formData.append(key, data[key]);
          }
          const rslt = await axios.post("/api/employee_family", formData, ConfigHeader);
          console.log(rslt);
          //   setIsOpen(false);
          setIsOpen(false);
          actionRefresh !== null && actionRefresh();
          changeDataToNull();
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        setDataEmployee(data.data);
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
              id="member_form"
              onSubmit={handleSubmit}
             
            >
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">
                  Employee Name
                </p>
                <input
                  type="text"
                  value={dataEmployee.name ? dataEmployee.name : ""}
                  disabled
                  className="rounded-lg w-full bg-gray-100 border border-gray-300 text-xs text-gray-700 font-semibold"
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Name</p>
                <input
                  type="text"
                  placeholder="name"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Identify Number</p>
                <input
                  type="text"
                  placeholder="Identify Number"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  value={identityNumber}
                  onChange={(e) => setIdentityNumber(e.target.value)}
                />
              
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Status</p>
                <select
                  name="type"
                  id=""
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="1" disabled selected>-- Select Status --</option>
                  <option value="1" >Husband</option>
                  <option value="2">Wife</option>
                  <option value="3">The first child</option>
                  <option value="4">The second child</option>
                  <option value="5">The third child</option>
                  <option value="6">Other child</option>
                </select>
              </div>
              <div className="flex gap-2 items-center my-1">
                <p  className="text-sm font-extrabold text-gray-600">isAlive</p>
                <input
                  type="checkbox"
                  placeholder="Is Alive"
                  checked={isAlive ? true : false}
                  className="rounded  border border-gray-300 text-xs text-gray-700 font-medium"
                  // value={isAlive}
                  onChange={(e) => setIsAlive(!isAlive)}
                />
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
            <button type="submit" form="member_form" className="bg-green-500 text-white rounded px-2">
              submit
            </button>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default ModalAddMember