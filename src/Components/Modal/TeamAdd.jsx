import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import ButtonNormal from "../ButtonNormal";
import axios from "axios";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";

const TeamAdd = ({ isOpen, setIsOpen, title, action = null }) => {
  const [name, setName] = useState("");
  const [leadBy, setLeadBy] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [dataEmployee, setDataEmployee] = useState([]);
  const actionRefresh = action ? action : null;

  useEffect(() => {

    const fetchDataEmployee = async () => {
      
      const data = await axios.get(`/api/employee`, ConfigHeader);
      setDataEmployee(data.data.data.data);
    }
    fetchDataEmployee()
  }, []);
  function changeDataToNull() {
    setName("");
    setLeadBy("");
    setCreatedBy("");
  }

  const handleSubmitPartner = async (e) => {
    e.preventDefault();
    const data = {
      'name': name,
      'leadBy' : leadBy,
      'createdBy' :createdBy
    };

    try {
      console.log(data);
      const rslt = await axios.post('/api/team',data ,ConfigHeader);
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
          <form id="team_form" onSubmit={handleSubmitPartner} encType="multipart/form-data">
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Team Name
              </p>
              <input
                type="text"
                placeholder="Team Name"
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                value={name}
                  onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Leader Team
              </p>
              <select
                  name="Employee"
                  id=""
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  onChange={(e) => setLeadBy(e.target.value)}
                >
                  <option value='-' selected disabled>-- select Leader Team --</option>
                  {dataEmployee.map((row, index) => (
                    <option value={row.employeeId} key={index}>
                      {row.name}
                    </option>
                  ))}
                </select>
             
            </div>
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Team Maker
              </p>
              <select
                  name="Employee"
                  id=""
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  onChange={(e) => setCreatedBy(e.target.value)}
                >
                  <option value='-' selected disabled>-- select Team Maker --</option>
                  {dataEmployee.map((row, index) => (
                    <option value={row.employeeId} key={index}>
                      {row.name}
                    </option>
                  ))}
                </select>
             
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
            <button type="submit" form="team_form" className="bg-green-600 rounded text-white px-2">
              submit
            </button>

          </div>
        </div>
      </Dialog>
    </>
  );
};

export default TeamAdd;
