import React, { Fragment, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import ButtonNormal from "../ButtonNormal";
import axios from "axios";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";

const EditFormEmployee = ({ isOpen, setIsOpen, title, ...data }) => {
  const [firtName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState(null);
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [nation, setNation] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [dataRole, setDataRole] = useState([]);

  // useEffect(() => {

  //   const fetchDataRole = async () => {
  //     const data = await axios.get(`/api/roles`, ConfigHeader);
  //     setDataRole(data.data.data.data);
  //   }
  //   fetchDataRole()
  // }, []);

  const getDataRole = async () => {
    const { data } = await axios.get(`/api/roles`, ConfigHeader);
    setDataRole(data.data.data);
  };

  useEffect(() => {
    setFirstName(data.firtsName);
    setLastName(data.lastName);
    setEmail(data.email);
    setPhone(data.phone);
    setPhoto(data.photo);
    setAddress(data.address);
    setCity(data.city);
    setNation(data.nation);
    setPassword(data.password);
    setGender(data.gender);
    setRole(data.role && data.role.id);
    getDataRole();
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .patch(
        `/api/employee/${data.id}`,
        {
          firtName: firtName,
          lastName: lastName,
          email: email,
          phone: phone,
          photo: photo,
          address: address,
          city: city,
          nation: nation,
          password: password,
          gender: gender,
          role: role,
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
      <div className=" space-y-1">
        <div className="">
          <p className="text-sm font-extrabold text-gray-600">First Name</p>
          <input
            type="text"
            placeholder="First Name"
            className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
          />
        </div>
        <div className="">
          <p className="text-sm font-extrabold text-gray-600">Last Name</p>
          <input
            type="text"
            placeholder="Last Name"
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
          <p className="text-sm font-extrabold text-gray-600">Email</p>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
          />
        </div>
        <div className="">
          <p className="text-sm font-extrabold text-gray-600">Password</p>
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
          />
        </div>
        <div className="">
          <p className="text-sm font-extrabold text-gray-600">Photo</p>
          <input
            type="file"
            className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
          />
        </div>

        <div className="">
          <p className="text-sm font-extrabold text-gray-600">Gender</p>
          <select
            name=""
            id=""
            className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
          >
            <option value="">Male</option>
            <option value="">Female</option>
          </select>
        </div>

        <div className="">
          <p className="text-sm font-extrabold text-gray-600">Birth Date</p>
          <input
            type="date"
            className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
          />
        </div>
        <div className="">
          <p className="text-sm font-extrabold text-gray-600">Address</p>
          <input
            type="text"
            placeholder="Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
          />
        </div>
        <div className="">
          <p className="text-sm font-extrabold text-gray-600">City</p>
          <input
            type="text"
            placeholder="City"
            className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
          />
        </div>
        <div className="">
          <p className="text-sm font-extrabold text-gray-600">Nation</p>
          <input
            type="text"
            placeholder="Nation"
            className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
          />
        </div>

        <div className="">
          <p className="text-sm font-extrabold text-gray-600">Role</p>
          {/* <select
            name=""
            id=""
            className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
          >
            <option value="">Admin</option>
            <option value="">Employee</option>
          </select> */}
          <select
                defaultValue={role}
                name="createdBy"
                placeholder="Leader Team"
                id=""
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                onChange={(e) => setRole(e.target.value)}
              >
                {dataRole.map((item, index) => (
                  <option value={item.roleId} key={index}>
                    {item.nameRole}
                  </option>
                ))}
              </select>
        </div>

        <div className="">
          <p className="text-sm font-extrabold text-gray-600">
            EmailVerifiedAt
          </p>
          <input
            type="date"
            className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
          />
        </div>
        <div className="">
          <p className="text-sm font-extrabold text-gray-600">Remember Token</p>
          <input
            type="text"
            className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
          />
        </div>
        <div className="">
          <p className="text-sm font-extrabold text-gray-600">Joined At</p>
          <input
            type="date"
            className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
          />
        </div>
        <div className="">
          <p className="text-sm font-extrabold text-gray-600">Resigned At</p>
          <input
            type="date"
            className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
          />
        </div>
        <div className="">
          <p className="text-sm font-extrabold text-gray-600">Status Hireld</p>
          <select
            name=""
            id=""
            className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
          >
            <option value="">1</option>
            <option value="">2</option>
            <option value="">17</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-extrabold text-gray-600">Status Aktif</p>
          <input
            type="checkbox"
            name=""
            id=""
            className="rounded border border-gray-300 text-xs text-gray-700 font-medium"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <ButtonNormal
          bg="bg-gray-400 "
          text="Cancel"
          width="w-16"
          //   onClick={() => setIsOpen(false)}
        />
        <ButtonNormal bg="bg-green-600 " text="Add" width="w-16" />
      </div>
    </div>
  );
};

export default EditFormEmployee;
