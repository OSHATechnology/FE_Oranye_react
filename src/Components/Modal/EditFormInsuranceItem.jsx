import React, { useState, useEffect } from "react";
import ButtonNormal from "../ButtonNormal";
import axios from "axios";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";

const EditFormInsuranceItem = (data) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [dataRole, setDataRole] = useState([]);
  const [percent, setPercent] = useState("");
  const [listRoleInsurance, setListRoleInsurance] = useState([]);
  const loadData = data.handleFetchData ? data.handleFetchData : () => { };
  const closeModal = data.handleCloseModal ? data.handleCloseModal : () => { };
  const showAlert = data.showAlert ? data.showAlert : () => {};

  const fetchDataRole = async () => {
    try {
      const data = await axios.get(`/api/roles`, ConfigHeader);
      setDataRole(data.data.data.data);
    } catch (error) {

    }
  };

  useEffect(() => {
    setName(data.data.name);
    setType(data.data.type);
    setPercent(data.data.percent);
    setListRoleInsurance(data.data.roles ? data.data.roles.map((item) => item.roleId) : []);
    fetchDataRole().then(() => {
    });
  }, [data.data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataEdit = {
      name: name,
      type: type,
      percent: percent,
      roles: listRoleInsurance,
    };
    console.log(dataEdit);
    await axios
      .put(`/api/insurance_item/${data.data.id}`, dataEdit, ConfigHeader)
      .then(async (res) => {
        try {
          await axios.delete(`/api/insurance_item_role/detachAll`, {
            data: {
              insuranceItemId: data.data.id
            },
          }, ConfigHeader);
          dataEdit.roles.map((item) => {
            axios.post(`/api/insurance_item_role`, { insuranceItemId: data.data.id, roleId: item }, ConfigHeader);
          });
        } catch (error) {
          console.log(error);
        } finally {
          loadData();
          closeModal();
          showAlert("success",res.data.message); 
        }
      })
      .catch((err) => {
        // console.log(err.response);
        showAlert("failed",err.response.data.data);
      });
  };
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
              <option value="-" disabled selected>
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
            <div className="flex gap-4 flex-wrap">
              {(dataRole && listRoleInsurance) &&
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
                          checked={listRoleInsurance.includes(item.roleId)}
                          onClick={(e) => {
                            setListRoleInsurance(
                              listRoleInsurance.includes(item.roleId) ? listRoleInsurance.filter(
                                (item) => item !== parseInt(e.target.value)
                              )
                                : [...listRoleInsurance, parseInt(e.target.value)]
                            );
                            console.log(listRoleInsurance);
                          }}
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
