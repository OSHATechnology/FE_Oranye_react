import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import ButtonNormal from "../ButtonNormal";
import ModalDelete from "../../Components/Modal/ModalDelete";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";
import axios from "axios";
import Select from "react-select";
import { useParams } from "react-router-dom";

const ManageTeam = ({ isOpen, setIsOpen, title, data, action = null, showAlert = null }) => {
  const [nameTeam, setNameTeam] = useState('');
  const [leadById, setLeadById] = useState('');
  const [createdById, setCreatedById] = useState('');
  const [dataEmployee, setDataEmployee] = useState([]);
  const [modalTeamDelete, setModalTeamDelete] = useState(false);
  const [teamDeleteData, setTeamDeleteData] = useState("");
  const paramsData = useParams();
  const [dataTeam, setDataTeam] = useState([]);
  const actionRefresh = action ? action : null;
  let dataTeamId = "";
  const showModalDelete = async (teamId) => {
    dataTeamId = teamId;
    setTeamDeleteData(dataTeamId);
    setModalTeamDelete(true);
  };

  const getDataEmployee = async () => {
    const { data } = await axios.get("api/employee?showAll=1", ConfigHeader);
    setDataEmployee(data.data);
  };

  const fetchDataTeam = async () => {
    const data = await axios.get(`/api/team/${paramsData.id}`, ConfigHeader);
    setDataTeam(data.data.data);
  };

  useEffect(() => {
    setNameTeam(data.name);
    setLeadById(data.leadBy && data.leadBy.id);
    setCreatedById(data.createdBy && data.createdBy.id);
    getDataEmployee();
    fetchDataTeam();
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rslt = await axios.patch(`/api/team/${data.id}`, {
      name: nameTeam,
      leadBy: leadById,
      createdBy: createdById,
    }, ConfigHeader)
      .then((res) => {
        setIsOpen(false);
        actionRefresh !== null && actionRefresh();
        showAlert("success",rslt.data.message);
      }).catch((err) => {
        // alert(err.response.data.message);
        showAlert("failed",err.response.data.data);
      });
  };

  const refresh = () => {
    window.location.reload();
  };

  // React Select
  const options = dataEmployee.map((item) => {
    return {
      value: item.employeeId,
      label: item.firstName + " " + item.lastName,
    };
  });

  const styleSelect = {
    option: (base, state) => ({
      ...base,
      height: "100%",
      fontSize: "10px",
    }),

    control: (base, state) => ({
      ...base,
      height: "20px",
      fontSize: "12px",
    }),
  };

  const handleChangeLeadTeam = (selectedOption) => {
    setLeadById(selectedOption.value);
  };

  const handleChangeTeamMaker = (selectedOption) => {
    setCreatedById(selectedOption.value);
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

              <Select
                styles={styleSelect}
                options={options}
                noOptionsMessage={() => "No data"}
                defaultValue={{ label: dataTeam.leadBy ? dataTeam.leadBy.employee : "", value: dataTeam.leadBy ? dataTeam.leadBy.id : "" }}

                classNamePrefix={""}
                onChange={handleChangeLeadTeam}
                menuPortalTarget={
                  document.querySelector("#team_form")
                }
              />
            </div>
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">Team Maker</p>
              <Select
                styles={styleSelect}
                options={options}
                noOptionsMessage={() => "No data"}
                classNamePrefix={""}
                defaultValue={{ label: dataTeam.createdBy ? dataTeam.createdBy.employee : "", value: dataTeam.createdBy ? dataTeam.createdBy.id : "" }}
                onChange={handleChangeTeamMaker}
                menuPortalTarget={
                  document.querySelector("#team_form")
                }
              />
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
              action={refresh}
            />
          )}
        </div>
      </Dialog>
    </>
  );
};

export default ManageTeam;
