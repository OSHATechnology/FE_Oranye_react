import React, { Fragment, useState, useEffect } from "react";
import ButtonNormal from "../ButtonNormal";
import axios from "axios";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";
import Select from "react-select";

const EditFormAllowance = (data) => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState("");
  const [type, setType] = useState("");
  const [nominal, setNominal] = useState("");
  const [dataRole, setDataRole] = useState([]);
  const [dataType, setDataType] = useState([]);

  const loadData = data.handleFetchData ? data.handleFetchData : () => {};
  const closeModal = data.handleCloseModal ? data.handleCloseModal : () => {};
  const showAlert = data.showAlert ? data.showAlert : () => {};

  const fetchDataRole = async () => {
    const data = await axios.get(`/api/roles`, ConfigHeader);
    setDataRole(data.data.data.data);
  };

  const fetchDataType = async () => {
    const data = await axios.get(`/api/type_of_allowance`, ConfigHeader);
    setDataType(data.data.data.data);
  };

  useEffect(() => {
    fetchDataRole();
    fetchDataType();
    setRole(data.data.role ? data.data.role.id : "");
    setType(data?.data?.typeAllowance?.id ? data?.data?.typeAllowance?.id : "");
    setNominal(
      data?.data?.typeAllowance?.nominal
        ? data?.data?.typeAllowance?.nominal
        : ""
    );
  }, [data.data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataEdit = {
      roleId: role,
      typeId: type,
    };
    console.log(dataEdit);
    await axios
      .put(`/api/allowance/${data.data.id}`, dataEdit, ConfigHeader)
      .then((res) => {
        closeModal();
        loadData();
        showAlert("success", res.data.message);
      })
      .catch((err) => {
        showAlert("failed", err.response.data.data);
      });
  };

  // React Select
  const optionsRole = dataRole.map((item) => {
    return {
      value: item.roleId,
      label: item.nameRole,
    };
  });

  const optionsType = dataType.map((item) => {
    return {
      value: item.id,
      label: item.name,
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

  const handleChangeRole = (selectedOption) => {
    setRole(selectedOption.value);
    console.log(selectedOption);
  };

  const handleChangeType = (selectedOption) => {
    setType(selectedOption.value);
    setNominal(
      dataType.find((item) => item.id == selectedOption.value)?.nominal
    );
    console.log(selectedOption);
  };

  return (
    <div className="space-y-2">
      <div className=" space-y-1">
        <form id="allowance_form" onSubmit={handleSubmit}>
          <div className="">
            <p className="text-sm font-extrabold text-gray-600">Jabatan</p>
            <Select
              styles={styleSelect}
              options={optionsRole}
              noOptionsMessage={() => "No data"}
              classNamePrefix={""}
              onChange={handleChangeRole}
            />
          </div>
          <div className="">
            <p className="text-sm font-extrabold text-gray-600">Tunjangan</p>
            <Select
              styles={styleSelect}
              options={optionsType}
              noOptionsMessage={() => "No data"}
              classNamePrefix={""}
              onChange={handleChangeType}
            />
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
          form="allowance_form"
          className="w-16 bg-green-600 rounded text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditFormAllowance;
