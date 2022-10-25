import React, { Fragment, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import ButtonNormal from "../ButtonNormal";
import axios from "axios";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";
import moment from "moment";
import Select from "react-select";

const EditFormPartner = (data) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [namePartner, setNamePartner] = useState("");
  const [description, setDescription] = useState("");
  const [resposibleBy, setResposibleBy] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [assignedById, setAssignedById] = useState("");
  const [photo, setPhoto] = useState();
  const [joinedAt, setJoinedAt] = useState("");
  const [dataEmployee, setDataEmployee] = useState([]);
  // baru
  const loadData = data.handleFetchData ? data.handleFetchData : () => {};
  const closeModal = data.handleCloseModal ? data.handleCloseModal : () => {};
  
  const fetchDataEmp = async () => {
    try {
      const result = await axios.get("api/employee", ConfigHeader);
      setDataEmployee(result.data.data.data);
    } catch (error) {}
  };

  // const fetchDataTeam = async () => {
  //   const data = await axios.get(`/api/partner/${paramsData.id}`, ConfigHeader);
  //   setDataTeam(data.data.data);
  // };

  useEffect(() => {
    fetchDataEmp();
    setNamePartner(data.data.name);
    
    setDescription(data.data.description);
    setResposibleBy(data.data.resposibleBy);
    setPhone(data.data.phone);
    setAddress(data.data.address);
    setAssignedById(data.data.assignedBy ? data.data.assignedBy.empId : "");
    setPhoto(data.data.photo);
    setJoinedAt(data.data.joinedAt);
  }, [data.data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataEdit = {
      name: namePartner,
      description: description,
      resposibleBy: resposibleBy,
      phone: phone,
      address: address,
      assignedBy: assignedById,
      joinedAt: joinedAt,
      photo: photo,
    };
    // console.log(dataEdit)
    let formData = new FormData();
    for (let key in dataEdit) {
      formData.append(key, dataEdit[key]);
    }
    await axios
      .post(`/api/partners/${data.data.id}`, formData, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer 19|NddCRKTaiRGXgPr5C6XnahjadTa6c2KI6RlJzMzT`,
      })
      .then((res) => {
        closeModal();
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
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

  };

  const handleChange = (selectedOption) => {
    setAssignedById(selectedOption.value);
  };
  const selectAssignedBy = data.data;
  console.log(selectAssignedBy && selectAssignedBy.assignedBy && selectAssignedBy.assignedBy.name)
  return (
    <div>
      <div className="w-full h-3/4 overflow-y-auto space-y-1">
        <form
          id="partner_form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="">
            <p className="text-sm font-extrabold text-gray-600">
              Company's Name
            </p>
            <input
              type="text"
              placeholder="Company's name"
              value={namePartner}
              onChange={(e) => setNamePartner(e.target.value)}
              className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
            />
          </div>
          <div className="">
            <p className="text-sm font-semibold text-gray-600">Description</p>
            <textarea
              name=""
              id=""
              cols="30"
              rows="5"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-lg  border w-full border-gray-300 text-xs text-gray-700 font-medium"
            ></textarea>
          </div>
          <div className="">
            <p className="text-sm font-extrabold text-gray-600">
              Responsible by
            </p>
            <input
              type="text"
              placeholder="Responsible by"
              value={resposibleBy}
              onChange={(e) => setResposibleBy(e.target.value)}
              className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
            />
          </div>
          <div className="">
            <p className="text-sm font-extrabold text-gray-600">Phone Number</p>
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
            />
          </div>
          <div className="">
            <p className="text-sm font-extrabold text-gray-600">
              Company's Address
            </p>
            <input
              type="text"
              placeholder="Company's Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
            />
          </div>
          <div className="">
            <p className="text-sm font-extrabold text-gray-600">Assigned By</p>
            <Select
              styles={styleSelect}
              options={options}
              noOptionsMessage={() => "No data"}
              classNamePrefix={""}
              onChange={handleChange}
              defaultValue={{ label: "selected" , value: selectAssignedBy && selectAssignedBy.assignedBy && selectAssignedBy.assignedBy.empId }}
              // menuPortalTarget={document.querySelector("#partner_form")}
            />

          </div>

          <div className="">
            <p className="text-sm font-extrabold text-gray-600">Photo</p>
            <input
              type="file"
              name="photo"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
            />
          </div>
          <div className="">
            <p className="text-sm font-extrabold text-gray-600">Joined At</p>
            <input
              type="date"
              placeholder="Joined At"
              value={moment(joinedAt).format("yyyy-MM-DD")}
              onChange={(e) => setJoinedAt(e.target.value)}
              className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
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
          form="partner_form"
          className="w-16 bg-green-600 rounded text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditFormPartner;
