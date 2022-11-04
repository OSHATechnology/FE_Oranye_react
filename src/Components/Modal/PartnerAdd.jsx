import React, { Fragment, useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Icon } from "@iconify/react";
import ButtonNormal from "../ButtonNormal";
import axios from "axios";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";
import Select from "react-select";
import moment from "moment";
import { useForm } from "react-hook-form";

const ErrorInput = errors => {
  const errorsData = Object.keys(errors).map((key, index) => {
    return (
      <div key={index} className="text-red-500 text-sm">
        {Object.keys(errors[key]).map((key2, index2) => {
          let message = ""
          console.log(errors[key][key2]);
          switch (errors[key][key2]?.type) {
            case "required":
              message = key2 + " tidak boleh kosong!"
              break;
            case "min":
              message = key2 + " minimal " + errors[key][key2]?.min + " karakter!"
              break;
            case "max":
              message = key2 + " maksimal " + errors[key][key2]?.max + " karakter!"
              break;
            case "minLength":
              message = key2 + " minimal " + errors[key][key2]?.minLength + " karakter!"
              break;
            case "maxLength":
              message = key2 + " maksimal " + errors[key][key2]?.maxLength + " karakter!"
              break;

            default:
              break;
          }
          return (
            <div key={index2}>
              {message}
            </div>
          )
        })}
      </div>
    );
  });

  return (
    <div className="text-red-500 text-sm">
      {errorsData ? errorsData : null}
    </div>
  )
}

const PartnerAdd = ({ isOpen, setIsOpen, title, action = null, showAlert = null }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [resposibleBy, setResposibleBy] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("");
  const [joinedAt, setJoinedAt] = useState("");
  const [assignedBy, setAssignedBy] = useState("");

  const [options, setOptions] = useState([]);
  const actionRefresh = action ? action : null;

  function changeDataToNull() {
    setName("");
    setDescription("");
    setAddress("");
    setResposibleBy("");
    setPhone("");
    setPhoto({});
    setJoinedAt(moment().format("YYYY-MM-DD"));
    setAssignedBy("");
  }

  const fetchDataEmployee = async () => {
    try {
      const data = await axios.get(`/api/employee?showAll=1`, ConfigHeader);
      return data.data.data;
    } catch (error) {
      console.log(error);
    }
  };

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

    try {
      let formData = new FormData();
      for (let key in data) {
        formData.append(key, data[key]);
      }
      const rslt = await axios.post("/api/partners", formData, ConfigHeader);
      setIsOpen(false);
      actionRefresh !== null && actionRefresh();
      showAlert("success", rslt.data.message);
      changeDataToNull();
    } catch (error) {
      showAlert("failed", error.response.data.data);
    }
  };

  const handleChange = (selectedOption) => {
    setAssignedBy(selectedOption.value);
  };

  useEffect(() => {
    // loadOptions();
    fetchDataEmployee().then((response) => {
      const data = response.map((item) => {
        return {
          value: item.employeeId,
          label: item.firstName + " " + item.lastName,
        };
      });
      setOptions(data);
    });
  }, []);
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
                  defaultValue={name}
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
                  defaultValue={description}
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


          <div className="flex justify-between gap-2">
            <div>
              {errors && <ErrorInput errors={errors} />}
            </div>
            <div className="flex gap-2">
              <ButtonNormal
                bg="bg-gray-400 "
                text="Cancel"
                width="w-16"
                onClick={() => setIsOpen(false)}
              />
              <div className="">
                <button
                  type="submit"
                  form="partner_form"
                  className="bg-green-600 text-white rounded px-2"
                >
                  submit
                </button>
              </div>
            </div>
            {/* <ButtonNormal bg="bg-green-600 " text="Add" width="w-16" /> */}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default PartnerAdd;
