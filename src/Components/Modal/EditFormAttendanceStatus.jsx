import React, { Fragment, useState, useEffect } from "react";
import ButtonNormal from "../ButtonNormal";
import axios from "axios";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";

const EditFormAttendanceStatus = (data) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");
console.log(data);
  useEffect(() => {
    setStatus(data.data.status);
  }, [data.data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataEdit = {
      status: status,
    }
    await axios
    .put(
      `/api/attendance_status/${data.data.attendanceStatusId}`,
      dataEdit,ConfigHeader
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
    <div className="space-y-2">
      <div className=" space-y-1">
        <form
          id="attendance_status_form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="">
            <p className="text-sm font-extrabold text-gray-600">Status</p>
            <input
              type="text"
              placeholder="Status"
              className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
          form="attendance_status_form"
          className="w-16 bg-green-600 rounded text-white"
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default EditFormAttendanceStatus