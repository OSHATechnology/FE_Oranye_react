import React, { Fragment, useState, useEffect } from "react";
import ButtonNormal from "../ButtonNormal";
import axios from "axios";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";

const FormEditMember = (data) => {
    const [isOpen, setIsOpen] = useState(false);
    const [empId, setEmpId] = useState("");
    const [joinedAt, setJoinedAt] = useState("");
    const [team, setTeam] = useState("");

    const [dataEmployee, setDataEmployee] = useState([]);
    const loadData = data.handleFetchData ? data.handleFetchData : () => {};
  const closeModal = data.handleCloseModal ? data.handleCloseModal : () => {};
  const fetchDataEmployee = async () => {
    const data = await axios.get(`/api/employee`, ConfigHeader);
    setDataEmployee(data.data.data.data);
  };

  useEffect(() => {
    fetchDataEmployee();
    setTeam(data?.data?.team?.id ? data?.data?.team?.id : "");
    setEmpId(data?.data?.employee?.id ? data?.data?.employee?.id : "");
    setJoinedAt(data.joinedAt);
  }, [data.data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataEdit = {
      team: team,
      employee: empId,
      joinedAt: joinedAt,
    };
    await axios
      .put(`/api/team_member/${data.data.id}`, dataEdit, ConfigHeader)
      .then((res) => {
        console.log("berhasil");
        closeModal()
        loadData()
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div className="space-y-2">
      <div className=" space-y-1">
        <form id="member_form" onSubmit={handleSubmit}>
          {/* <div className="">
            <p className="text-sm font-extrabold text-gray-600">Jabatan</p>
            <select
              defaultValue={role}
              value={role}
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
          </div> */}
          <div className="">
                <p className="text-sm font-extrabold text-gray-600">
                  Team Name
                </p>
                <input
                  type="text"
                  value={team.name ? team.name : ""}
                  disabled
                  className="rounded-lg w-full bg-gray-100 border border-gray-300 text-xs text-gray-700 font-semibold"
                />
              </div>
          {/* <div className="">
            <p className="text-sm font-extrabold text-gray-600">Tunjangan</p>
            <select
              defaultValue={type}
              value={type}
              name="allowance"
              id=""
              className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              onChange={(e) => {
                setType(e.target.value);
                setNominal(
                  dataType.find((item) => item.id == e.target.value)?.nominal
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
              defaultValue={nominal}
              value={nominal}
            />
          </div> */}
        </form>
      </div>

      <div className="flex justify-end gap-2">
        <ButtonNormal
          bg="bg-gray-400 "
          text="Cancel"
          width="w-16"
          onClick={closeModal}
        />
        <button
          type="submit"
          form="member_form"
          className="w-16 bg-green-600 rounded text-white"
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default FormEditMember