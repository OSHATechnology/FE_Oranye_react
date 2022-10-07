import React, { Fragment, useState, useEffect } from "react";
import ButtonNormal from "../ButtonNormal";
import axios from "axios";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";

const EditFormFurloughType = (data) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [max, setMax] = useState("");

  useEffect(() => {
    setName(data.data.name);
    setType(data.data.type);
    setMax(data.data.max);
  }, [data.data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataEdit = {
      name: name,
      type: type,
      max: max,
    }
    console.log(dataEdit);
    let formData = new FormData();
      for (let key in dataEdit) {
        formData.append(key, dataEdit[key]);
      }
    await axios
    .post(
      `/api/furlough_type/${data.data.furTypeId}`,
      formData,
      {
        'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer 19|NddCRKTaiRGXgPr5C6XnahjadTa6c2KI6RlJzMzT`
      }
    )
      .then((res) => {
        console.log("berhasil");
        setIsOpen(false);
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
            <p className="text-sm font-extrabold text-gray-600">Name</p>
            <input
              type="text"
              placeholder="Name"
              className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              name="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="">
            <p className="text-sm font-extrabold text-gray-600">Duration</p>
            <input
              type="number"
              name="lastName"
              placeholder="Last Name"
              className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>
          <div className="">
            <p className="text-sm font-extrabold text-gray-600">Type</p>
            <input
              type="text"
              name="Type"
              placeholder="Type"
              className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              value={type}
              onChange={(e) => setType(e.target.value)}
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
          form="employee_form"
          className="w-16 bg-green-600 rounded text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditFormFurloughType;
