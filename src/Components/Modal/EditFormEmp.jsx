import React, { Fragment, useState, useEffect } from "react";
import ButtonNormal from "../ButtonNormal";
import axios from "axios";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";
import moment from "moment";

const EditFormEmployee = (data) => {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState();
  const [birthDate, setBirthDate] = useState("");
  const [joinedAt, setJoinedAt] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [nation, setNation] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [dataRole, setDataRole] = useState([]);
  const [statusHire, setStatusHire] = useState("");
  const loadData = data.handleFetchData ? data.handleFetchData : () => { };
  const closeModal = data.handleCloseModal ? data.handleCloseModal : () => { };

  const fetchDataRole = async () => {
    try {
      const result = await axios.get("/api/roles", ConfigHeader);
      setDataRole(result.data.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchDataRole();
    setFirstName(data.data.firstName);
    setLastName(data.data.lastName);
    setEmail(data.data.email);
    setPhone(data.data.phone);
    setPhoto(data.data.photo);
    setAddress(data.data.address);
    setJoinedAt(data.data.joinedAt);
    setBirthDate(data.data.birthDate);
    setCity(data.data.city);
    setNation(data.data.nation);
    setPassword(data.data.password);
    setGender(data.data.gender);
    setRole(data.data.role ? data.data.role.id : "");
  }, [data.data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataEdit = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      address: address,
      joinedAt: joinedAt,
      birthDate: birthDate,
      city: city,
      nation: nation,
      password: password,
      gender: gender,
      roleId: role,
      photo: photo,
      isActive: 1,
      statusHireId: 1,
    };
    console.log(dataEdit);
    let formData = new FormData();
    for (let key in dataEdit) {
      formData.append(key, dataEdit[key]);
    }
    await axios
      .post(`/api/employee/${data.data.employeeId}`, formData, ConfigHeader)
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
    <div>
      <div className=" space-y-1">
        <form
          id="employee_form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="">
            <p className="text-sm font-extrabold text-gray-600">First Name</p>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
            />
          </div>
          <div className="">
            <p className="text-sm font-extrabold text-gray-600">Last Name</p>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
            <p className="text-sm font-extrabold text-gray-600">Photo</p>
            <input
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
            />
          </div>

          <div className="">
            <p className="text-sm font-extrabold text-gray-600">Gender</p>
            <select
              name=""
              id=""
              className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              defaultValue={gender}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="man">Male</option>
              <option value="woman">Female</option>
            </select>
          </div>

          <div className="">
            <p className="text-sm font-extrabold text-gray-600">Joined At</p>
            <input
              type="date"
              value={moment(joinedAt).format("yyyy-MM-DD")}
              onChange={(e) => setJoinedAt(e.target.value)}
              className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
            />
          </div>
          <div className="">
            <p className="text-sm font-extrabold text-gray-600">Birth Date</p>
            <input
              type="date"
              value={moment(birthDate).format("yyyy-MM-DD")}
              onChange={(e) => setBirthDate(e.target.value)}
              className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
            />
          </div>
          <div className="">
            <p className="text-sm font-extrabold text-gray-600">Address</p>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
            />
          </div>
          <div className="">
            <p className="text-sm font-extrabold text-gray-600">City</p>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
            />
          </div>
          <div className="">
            <p className="text-sm font-extrabold text-gray-600">Nation</p>
            <input
              type="text"
              placeholder="Nation"
              value={nation}
              onChange={(e) => setNation(e.target.value)}
              className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
            />
          </div>

          <div className="">
            <p className="text-sm font-extrabold text-gray-600">Role</p>

            <select
              defaultValue={role}
              value={role}
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
          <div className="flex items-center gap-2">
            <p className="text-sm font-extrabold text-gray-600">Status Aktif</p>
            <input
              type="checkbox"
              name=""
              id=""
              value={statusHire}
              onChange={(e) => setStatusHire(e.target.value)}
              className="rounded border border-gray-300 text-xs text-gray-700 font-medium"
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
          form="employee_form"
          className="w-16 bg-green-600 rounded text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditFormEmployee;
