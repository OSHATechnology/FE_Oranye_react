import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import ButtonNormal from "../ButtonNormal";
import ModalDelete from "../../Components/Modal/ModalDelete";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";
import axios from "axios";

const ManageTeam = ({ isOpen, setIsOpen, title, data }) => {
  const [nameTeam, setNameTeam] = useState('');
  const [leadById, setLeadById] = useState('');
  const [createdById, setCreatedById] = useState('');
  const [dataEmployee, setDataEmployee] = useState([]);
  const [modalTeamDelete, setModalTeamDelete] = useState(false);
  const [teamDeleteData, setTeamDeleteData] = useState("");
  // console.log(data);
  let dataTeamId = "";
  const showModalDelete = async (teamId) => {
    dataTeamId = teamId;
    setTeamDeleteData(dataTeamId);
    setModalTeamDelete(true);
  };

  const getDataEmployee = async () => {
    const { data } = await axios.get("api/employee", ConfigHeader);
    setDataEmployee(data.data.data);
  };

  useEffect(() => {
    setNameTeam(data.name);
    setLeadById(data.leadBy && data.leadBy.id);
    setCreatedById(data.createdBy && data.createdBy.id);
    getDataEmployee();
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.patch(`/api/team/${data.id}`, {
      name: nameTeam,
      leadBy: leadById,
      createdBy: createdById,
    }, ConfigHeader)
    .then((res) => {
      setIsOpen(false);
    }).catch((err) => {
      alert(err.response.data.message);
    });
  };

  const [isModalDeleteOpened, setIsModalDeleteOpened] = useState(false);
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
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">Team Name</p>
              <input
                type="text"
                placeholder="Team Name"
                value={nameTeam}
                onChange={(e) => setNameTeam(e.target.value)}
                autoFocus
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>

            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Leader Team
              </p>
              <select
                defaultValue={leadById}
                name="leadBy"
                placeholder="Leader Team"
                id=""
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                onChange={(e) => setLeadById(e.target.value)}
              >
                {dataEmployee.map((item, index) => (
                  <option value={item.employeeId} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">Team Maker</p>
              <select
                defaultValue={createdById}
                name="createdBy"
                placeholder="Leader Team"
                id=""
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                onChange={(e) => setCreatedById(e.target.value)}
              >
                {dataEmployee.map((item, index) => (
                  <option value={item.employeeId} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between">
            <ButtonNormal
              bg="bg-red-500 "
              text="Delete Team"
              width="w-30"
              onClick={() =>
                showModalDelete(data.id)}
            />
            {/* <ModalDelete
              isOpen={isModalDeleteOpened}
              setIsOpen={setIsModalDeleteOpened}
              title="Delete Member Team"
            /> */}
            <ButtonNormal
              bg="bg-yellow-500 "
              onClick={handleSubmit}
              text="Save"
              width="w-16"
              
            />
          </div>
          {modalTeamDelete && (
            <ModalDelete
              isOpen={modalTeamDelete}
              setIsOpen={setModalTeamDelete}
              title="Delete Team"
              typeData="team"
              data={teamDeleteData}
            />
          )}
        </div>
      </Dialog>
    </>
  );
};

export default ManageTeam;
