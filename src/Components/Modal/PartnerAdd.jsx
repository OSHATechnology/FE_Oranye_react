import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import ButtonNormal from "../ButtonNormal";
import axios from "axios";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";
import Select from "react-select";

const PartnerAdd = ({ isOpen, setIsOpen, title, action = null }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [resposibleBy, setResposibleBy] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("");
  const [joinedAt, setJoinedAt] = useState("");
  const [assignedBy, setAssignedBy] = useState("");

  const [dataEmployee, setDataEmployee] = useState([]);
  const actionRefresh = action ? action : null;

  function changeDataToNull() {
    setName("");
    setDescription("");
    setAddress("");
    setResposibleBy("");
    setPhone("");
    setPhoto({});
    setJoinedAt("");
    setAssignedBy("");
  }

  useEffect(() => {
    const fetchDataEmployee = async () => {
      const data = await axios.get(`/api/employee`, ConfigHeader);
      setDataEmployee(data.data.data.data);
    };
    fetchDataEmployee();
  }, []);

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

  const handleSubmitPartner = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      description: description,
      address: address,
      resposibleBy: resposibleBy,
      phone: phone,
      photo: photo,
      joinedAt: joinedAt,
      assignedBy: assignedBy,
    };
    console.log(data);

    try {
      let formData = new FormData();
      for (let key in data) {
        formData.append(key, data[key]);
      }
      const rslt = await axios.post("/api/partners", formData, ConfigHeader);
      setIsOpen(false);
      actionRefresh !== null && actionRefresh();
      changeDataToNull();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (selectedOption) => {
    setAssignedBy(selectedOption.value);
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
        <div className="items-start bg-white h-1/2 w-full md:w-2/5 p-4 border-2 rounded space-y-4">
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
              id="partner_form"
              onSubmit={handleSubmitPartner}
              encType="multipart/form-data"
            >
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">
                  Company's Name
                </p>
                <input
                  type="text"
                  placeholder="Company's name"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="">
                <p className="text-sm font-semibold text-gray-600">
                  Description
                </p>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  placeholder="Description"
                  className="rounded-lg  border w-full border-gray-300 text-xs text-gray-700 font-medium"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">
                  Responsible by
                </p>
                <input
                  type="text"
                  placeholder="Responsible by"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  value={resposibleBy}
                  onChange={(e) => setResposibleBy(e.target.value)}
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">
                  Phone Number
                </p>
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">
                  Company's Address
                </p>
                <input
                  type="text"
                  placeholder="Company's Address"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">
                  Assigned By
                </p>
                <Select
                  styles={styleSelect}
                  options={options}
                  noOptionsMessage={() => "No data"}
                  classNamePrefix={""}
                  onChange={handleChange}
                  menuPortalTarget={
                    document.querySelector("#partner_form")
                  }
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Photo</p>
                <input
                  type="file"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">
                  Joined At
                </p>
                <input
                  type="date"
                  placeholder="Joined At"
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
            <button
              type="submit"
              form="partner_form"
              className="bg-green-600 text-white rounded px-2"
            >
              submit
            </button>
            {/* <ButtonNormal bg="bg-green-600 " text="Add" width="w-16" /> */}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default PartnerAdd;
