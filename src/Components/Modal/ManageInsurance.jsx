import React, { Fragment, useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Icon } from "@iconify/react";
import ButtonNormal from "../ButtonNormal";
import ModalDelete from "../../Components/Modal/ModalDelete";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";
import axios from "axios";

const ManageInsurance = ({ isOpen, setIsOpen, title, data, action = null }) => {
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [dataInsurance, setDataInsurance] = useState([]);
  const actionRefresh = action ? action : null;

  useEffect(() => {
    setName(data.name);
    setCompanyName(data.company);
    setAddress(data.address);

  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.patch(`/api/insurance/${data.id}`, {
      name: name,
      companyName: companyName,
      address: address,
    }, ConfigHeader)
      .then((res) => {
        setIsOpen(false);
        actionRefresh !== null && actionRefresh();
      }).catch((err) => {
        alert(err.response.data.message);
      });
  };

  // delete
  const [modalInsuranceDelete, setModalInsuranceDelete] = useState(false);
  const [insuranceDeleteData, setInsuranceDeleteData] = useState("");
  let dataInsuranceId = "";
  const showModalDelete = async (insuranceId) => {
    dataInsuranceId = insuranceId;
    setInsuranceDeleteData(dataInsuranceId);
    setModalInsuranceDelete(true);
  };

  const refresh = () => {
    window.location.reload();
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
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">Insurance</p>
              <input
                type="text"
                placeholder="Team Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>

            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Company Name
              </p>
              <input
                type="text"
                placeholder="Team Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                autoFocus
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Address
              </p>
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

          </div>

          <div className="flex justify-between">
            <ButtonNormal
              bg="bg-red-500 "
              text="Delete Team"
              width="w-30"
              onClick={() =>
                showModalDelete(data.id)}
            />
            <ButtonNormal
              bg="bg-yellow-500 "
              onClick={handleSubmit}
              text="Save"
              width="w-16"

            />
          </div>
          {modalInsuranceDelete && (
            <ModalDelete
              isOpen={modalInsuranceDelete}
              setIsOpen={setModalInsuranceDelete}
              title="Delete Insurance"
              typeData="insurance"
              data={insuranceDeleteData}
              action={refresh}
            />
          )}
        </div>
      </Dialog>
    </>
  )
}

export default ManageInsurance