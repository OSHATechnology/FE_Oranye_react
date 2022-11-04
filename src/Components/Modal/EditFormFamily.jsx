import React, { Fragment, useState, useEffect } from "react";
import ButtonNormal from "../ButtonNormal";
import axios from "axios";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";

const EditFormFamily = (data) => {
  const [dataEmployee, setDataEmployee] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [isAlive, setIsAlive] = useState("");
  const loadData = data.handleFetchData ? data.handleFetchData : () => {};
  const closeModal = data.handleCloseModal ? data.handleCloseModal : () => {};
  const showAlert = data.showAlert ? data.showAlert : () => {};
  useEffect(() => {
    setIdentityNumber(data.data.identityNumber);
    setName(data.data.name);
    setStatus(data.data.status && data.data.status.id);
    setIsAlive(data.data.isAlive);
  }, [data.data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataEdit = {
      identityNumber: identityNumber,
      name: name,
      statusId: status,
      isAlive: isAlive,
    };
    console.log(dataEdit);
    await axios
      .put(`/api/employee_family/${data.data.id}`, dataEdit, ConfigHeader)
      .then((res) => {
        closeModal();
        loadData();
        showAlert("success", res.data.message);
      })
      .catch((err) => {
        showAlert("failed", err.response.data.data);
      });
  };

  return (
    <div className="space-y-2">
      <div className=" space-y-1">
        <form id="family_form" onSubmit={handleSubmit}>
          <div className="">
            <p className="text-sm font-extrabold text-gray-600">Name</p>
            <input
              type="text"
              placeholder="percent"
              className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="">
            <p className="text-sm font-extrabold text-gray-600">
              Identify Number
            </p>
            <input
              type="number"
              placeholder="percent"
              className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              value={identityNumber}
              onChange={(e) => setIdentityNumber(e.target.value)}
            />
          </div>
          <div className="">
            <p className="text-sm font-extrabold text-gray-600">Name</p>
            <select
              defaultValue={status}
              value={status}
              name="status"
              id=""
              className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="1" disabled selected>
                -- Select Status --
              </option>
              <option value="1">Husband</option>
              <option value="2">Wife</option>
              <option value="3">The first child</option>
              <option value="4">The second child</option>
              <option value="5">The third child</option>
              <option value="6">Other child</option>
            </select>
          </div>
          <div className="flex gap-2 items-center my-1">
            <p className="text-sm font-extrabold text-gray-600">isAlive</p>
            <input
              type="checkbox"
              placeholder="Is Alive"
              checked={isAlive ? true : false}
              className="rounded  border border-gray-300 text-xs text-gray-700 font-medium"
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
          onClick={closeModal}
        />
        <button
          type="submit"
          form="family_form"
          className="w-16 bg-green-600 rounded text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditFormFamily;
