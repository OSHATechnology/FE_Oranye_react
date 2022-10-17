import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import ButtonNormal from "../ButtonNormal";
import axios from "axios";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";
import moment from "moment";

const MemberAdd = ({ isOpen, setIsOpen, title, action = null , ...data}) => {
  const [teamName, setTeamName] = useState("");
  const [empId, setEmpId] = useState("");
  const [assignedBy, setAssignedBy] = useState("");
  const [joinedAt, setJoinedAt] = useState("");
  const [dataTeam, setDataTeam] = useState({});

  const [dataEmployee, setDataEmployee] = useState([]);
  const actionRefresh = action ? action : null;

  function changeDataToNull() {
    setEmpId("");
    setAssignedBy("");
    // setJoinedAt(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
    setJoinedAt(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate());
  }

  useEffect(() => {
    const fetchDataEmployee = async () => {
      const data = await axios.get(`/api/employee`, ConfigHeader);
      setDataEmployee(data.data.data.data);
    };
    fetchDataEmployee();
  }, []);

  const handleSubmitMember = async (e) => {
    e.preventDefault();
    const data = {
      teamId: dataTeam.id,
      empId: empId,
      assignedBy: 1,
      joinedAt: joinedAt,
    };

    try {
      const rslt = await axios.post(`/api/team_member`, data, ConfigHeader);
      console.log(rslt);
      setIsOpen(false);
      actionRefresh !== null && actionRefresh();

      changeDataToNull();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setDataTeam(data.data);
  }, [data]);
  console.log(dataTeam)
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
              onSubmit={handleSubmitMember}
              encType="multipart/form-data"
            >
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">
                  Team Name
                </p>
                <input
                  type="text"
                  value={dataTeam.name ? dataTeam.name : ""}
                  disabled
                  className="rounded-lg w-full bg-gray-100 border border-gray-300 text-xs text-gray-700 font-semibold"
                />
              </div>

              <div className="">
                <p className="text-sm font-extrabold text-gray-600">
                  Employee Name
                </p>
                <select
                  name="Employee"
                  id=""
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  onChange={(e) => setEmpId(e.target.value)}
                >
                  <option value="-" selected disabled>
                    -- Select Member --
                  </option>
                  {dataEmployee.map((row, index) => (
                    <option value={row.employeeId} key={index}>
                      {row.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Join At</p>
                <input
                  type="date"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  value={joinedAt}
                  onChange={(e) => setJoinedAt(e.target.value)}
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
  );
};

export default MemberAdd;
