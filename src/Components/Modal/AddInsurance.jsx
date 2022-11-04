import React, { Fragment, useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Icon } from "@iconify/react";
import ButtonNormal from "../ButtonNormal";
import axios from "axios";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";

const AddInsurance = ({ isOpen, setIsOpen, title, action = null, showAlert = null }) => {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [dataInsurance, setDataInsurance] = useState([]);
  const actionRefresh = action ? action : null;

  function changeDataToNull() {
    setName("");
    setCompanyName("");
    setAddress("");
  }

  useEffect(() => {

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      companyName: companyName,
      address: address,
    };

    try {
      const rslt = await axios.post("/api/insurance", data, ConfigHeader);
      console.log(rslt);
      setIsOpen(false);
      actionRefresh !== null && actionRefresh();
      showAlert("success",rslt.data.message);
      changeDataToNull();
    } catch (error) {
      showAlert("failed",error.response.data.message);
    }
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
        <div className="items-start bg-white h-fit w-full md:w-2/5 p-4 border-2 rounded space-y-4">
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
            <form id="insurance_form" onSubmit={handleSubmit}>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">
                  Insurance Name
                </p>
                <input
                  type="text"
                  placeholder="Insurance Name"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">
                  Company Name
                </p>
                <input
                  type="text"
                  placeholder="Company Name"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Address</p>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  placeholder="Address"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
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
              form="insurance_form"
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

export default AddInsurance;
