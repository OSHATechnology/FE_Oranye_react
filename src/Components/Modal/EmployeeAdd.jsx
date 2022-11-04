import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import ButtonNormal from "../ButtonNormal";
import axios from "axios";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";
import moment from "moment";
import Select from "react-select";

const EmployeeAdd = ({ isOpen, setIsOpen, title, action = null, showAlert = null }) => {
  const [firtsName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState(null);
  const [birthDate, setBirthDate] = useState("");
  const [joinedAt, setJoinedAt] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [nation, setNation] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [dataRole, setDataRole] = useState([]);
  const actionRefresh = action ? action : null;

  function changeDataToNull() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPhoto({});
    setBirthDate("");
    setJoinedAt(moment().format("DD/MM/YYYY"));
    setAddress("");
    setCity("");
    setNation("");
    setPassword("");
    setGender("");
    setRole("");
  }
  useEffect(() => {
    const fetchDataRole = async () => {
      const data = await axios.get(`/api/roles?showAll=1`, ConfigHeader);
      setDataRole(data.data.data);
    };
    fetchDataRole();
    // setIsOpen(false);
    // actionRefresh !== null && actionRefresh();
  }, []);

  const handleSubmitEmp = async (e) => {
    e.preventDefault();
    const data = {
      firstName: firtsName,
      lastName: lastName,
      phone: phone,
      gender: gender,
      address: address,
      password: password,
      city: city,
      photo: photo,
      nation: nation,
      birthDate: birthDate,
      joinedAt: joinedAt,
      email: email,
      roleId: role,
      isActive: 1,
      statusHireId: 1,
    };
    // console.log(data)
    try {
      let formData = new FormData();
      for (let key in data) {
        formData.append(key, data[key]);
      }
      const rslt = await axios.post("/api/employee", formData, ConfigHeader);
      console.log(rslt);
      setIsOpen(false);
      actionRefresh !== null && actionRefresh()
      showAlert("success",rslt.data.message);
      changeDataToNull();
    } catch (error) {
      showAlert("failed",error.response.data.data);
    }
  };

  // React Select
  const options = dataRole.map((item) => {
    return {
      value: item.roleId,
      label: item.nameRole,
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

  const handleChange = (selectedOption) => {
    setRole(selectedOption.value);
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
              id="emp_form"
              onSubmit={handleSubmitEmp}
              encType="multipart/form-data"
            >
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">
                  First Name
                </p>
                <input
                  type="text"
                  placeholder="First Name"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  name="firstName"
                  value={firtsName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">
                  Last Name
                </p>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">
                  Phone Number
                </p>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Email</p>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Password</p>
                <input
                  type="text"
                  name="password"
                  placeholder="Password"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Photo</p>
                <input
                  type="file"
                  name="photo"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Gender</p>
                <select
                  name="gender"
                  id=""

                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="man" disabled selected>
                    -- Select Gender --
                  </option>
                  <option value="man">Male</option>
                  <option value="woman">Female</option>
                </select>
              </div>

              <div className="">
                <p className="text-sm font-extrabold text-gray-600">
                  Joined At
                </p>
                <input
                  type="date"
                  name="Join At"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  value={joinedAt}
                  onChange={(e) => setJoinedAt(e.target.value)}
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">
                  Birth Date
                </p>
                <input
                  type="date"
                  name="birthDate"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Address</p>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">City</p>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Nation</p>
                <input
                  type="text"
                  name="nation"
                  placeholder="nation"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  value={nation}
                  onChange={(e) => setNation(e.target.value)}
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Role</p>
                <Select
                  styles={styleSelect}
                  options={options}
                  noOptionsMessage={() => "No data"}
                  classNamePrefix={""}
                  onChange={handleChange}
                  menuPortalTarget={
                    document.querySelector("#emp_form")
                  }
                />
              </div>
            </form>
          </div>

          <div className="flex justify-end gap-2">
            <ButtonNormal bg="bg-gray-400 " text="Cancel" width="w-16" onClick={() => setIsOpen(false)} />
            <button
              type="submit"
              form="emp_form"
              className="bg-green-600 rounded text-white px-2"
            >
              submit
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default EmployeeAdd;
