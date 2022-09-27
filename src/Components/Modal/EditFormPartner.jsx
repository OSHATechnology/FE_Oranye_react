import React, { Fragment, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import ButtonNormal from "../ButtonNormal";
import axios from "axios";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";
import moment from "moment";
const EditFormPartner = ({ isOpen, setIsOpen, title, ...data }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [resposibleBy, setResposibleBy] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [assignedById, setAssignedById] = useState('');
  const [photo, setPhoto] = useState("");
  const [joinedAt, setJoinedAt] = useState("");
  const [dataEmployee, setDataEmployee] = useState([]);

  const fetchDataEmp = async () => {
    try {
      const {data} = await axios.get("api/employee", ConfigHeader);
      setDataEmployee(data.data.data);
    } catch (error) {
      
    }
  };

  function setContent(){
    setName(data.name);
    setDescription(data.description);
    setResposibleBy(data.resposibleBy);
    setPhone(data.phone);
    setAddress(data.address);
    setAssignedById(data.assignedBy ? data.assignedBy.empId : '');
    setPhoto(data.photo);
    setJoinedAt(data.joinedAt);
  };

  useEffect(() => {
    // setContent();
    setName(data.name);
    setDescription(data.description);
    setResposibleBy(data.resposibleBy);
    setPhone(data.phone);
    setAddress(data.address);
    setAssignedById(data.assignedBy ? data.assignedBy.empId : '');
    setJoinedAt(data.joinedAt);
    fetchDataEmp();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .patch(
        `/api/team/${data.id}`,
        {
          name: name,
          description: description,
          resposibleBy: resposibleBy,
          phone: phone,
          address: address,
          assignedBy: assignedById,
          photo: photo,
          joinedAt: joinedAt,
        },
        ConfigHeader
      )
      .then((res) => {
        setIsOpen(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div>
      <div className="w-full h-3/4 overflow-y-auto space-y-1">
        <div className="">
          <p className="text-sm font-extrabold text-gray-600">Company's Name</p>
          <input
            type="text"
            placeholder="Company's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <p className="text-sm font-extrabold text-gray-600">Responsible by</p>
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
          <select
            name="assignedBy"
            placeholder="Assigned By"
            id=""
            className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
            onChange={(e) => setAssignedById(e.target.value)}
            defaultValue={assignedById}
          >
            {dataEmployee.map((item, index) => (
              <option value={item.employeeId} key={index}>
                {item.name}
              </option>
            ))}
          </select>
          {/* <input
            type="text"
            placeholder="Assigned By"
            className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
          /> */}
        </div>

        <div className="">
          <p className="text-sm font-extrabold text-gray-600">Photo</p>
          <input
            type="file"
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
      </div>
      <div className="flex justify-end gap-2">
        <ButtonNormal
          bg="bg-gray-400 "
          text="Cancel"
          width="w-16"
          onClick={() => setIsOpen(false)}
        />
        <ButtonNormal
          bg="bg-green-600 "
          onClick={handleSubmit}
          text="Save"
          width="w-16"
        />
      </div>
    </div>
  );
};

export default EditFormPartner;
