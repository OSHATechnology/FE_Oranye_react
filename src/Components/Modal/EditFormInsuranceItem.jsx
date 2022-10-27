import React, { Fragment, useState, useEffect } from "react";
import ButtonNormal from "../ButtonNormal";
import axios from "axios";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";

const EditFormInsuranceItem = (data) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [dataRole, setDataRole] = useState([]);
  const [percent, setPercent] = useState("");
  const loadData = data.handleFetchData ? data.handleFetchData : () => {};
  const closeModal = data.handleCloseModal ? data.handleCloseModal : () => {};

  useEffect(() => {
    setName(data.data.name);
    setType(data.data.type);
    setPercent(data.data.percent);

    const fetchDataRole = async () => {
      const data = await axios.get(`/api/roles`, ConfigHeader);
      setDataRole(data.data.data.data);
    };
    fetchDataRole();
  }, [data.data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataEdit = {
      name: name,
      type: type,
      percent: percent,
    };
    await axios
      .put(`/api/insurance_item/${data.data.id}`, dataEdit, ConfigHeader)
      .then((res) => {
        console.log("berhasil");
        closeModal();
        loadData();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
console.log(dataRole)
  return (
    <div className="space-y-2">
      <div className=" space-y-1 mb-4">
        <form id="insurance_item_form" onSubmit={handleSubmit}>
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
              defaultValue={type}
              value={type}
              name="type"
              id=""
              className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="allowance" disabled selected>
                -- Select Type --
              </option>
              <option value="allowance">Allowance</option>
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
          onClick={closeModal}
        />
        <button
          type="submit"
          form="insurance_item_form"
          className="w-16 bg-green-600 rounded text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditFormInsuranceItem;
