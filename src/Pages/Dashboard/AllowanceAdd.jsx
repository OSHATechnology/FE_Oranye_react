import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ButtonNormal from "../../Components/ButtonNormal";
import ButtonSmall from "../../Components/ButtonSmall";
import TitleDashboard from "../../Components/TitleDashboard";
import ConfigHeader from "../Auth/ConfigHeader";
import ModalDelete from "../../Components/Modal/ModalDelete";

const AllowanceAdd = () => {
  const [dataAllowance, setDataAllowance] = useState([]);
  const [modalAllowanceDelete, setModalAllowanceDelete] = useState(false);
  const [allowanceDeleteData, setAllowanceDeleteData] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [nominal, setNominal] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  const fetchDataAllowance = async (page = 1, search = "") => {
    const result = await axios.get(
      `/api/type_of_allowance?search=${search}&page=${page}`,
      ConfigHeader
    );
    setDataAllowance(result.data.data);
  };

  useEffect(() => {
    fetchDataAllowance();
  }, []);

  let dataAllowanceId = "";
  const showModalDelete = async (allowanceId) => {
    dataAllowanceId = allowanceId;
    setAllowanceDeleteData(dataAllowanceId);
    setModalAllowanceDelete(true);
  };

  // add
  function changeDataToNull() {
    setName("");
    setNominal("");
  }

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = {
        name: name,
        nominal: nominal,
      };
  
      try {
        let formData = new FormData();
        for (let key in data) {
          formData.append(key, data[key]);
        }
        const rslt = await axios.post(
          "/api/type_of_allowance",
          formData,
          ConfigHeader
        );
  
        changeDataToNull();
      } catch (error) {
        console.log(error);
      }
    };

    // Update
    const UpdateAllowanceComponent = () => {

      const handleUpdate = async (e) => {
        e.preventDefault();
        const dataEdit = {
          name: name,
          nominal: nominal,
        }
        await axios
        .put(
          `/api/type_of_allowance/${id}`,
          dataEdit,ConfigHeader
        )
          .then((res) => {
            console.log("berhasil");
            setIsUpdate(false);
            setName("");
            setNominal("");
          })
          .catch((err) => {
            console.log(err.response);
          });
      };


    return (
    <div className="border border-slate-100 rounded shadow p-4 space-y-8">
        <div>
          <p className="font-bold text-slate-700">Form Update Allowance</p>
        </div>
        <div className="space-y-2">
          <form id="attendance_status_form" onSubmit={handleUpdate}>
            <div className="md:flex gap-4 justify-between w-full">
              <div className="w-full">
                <p className="text-sm font-medium text-slate-700">
                  Nama Tunjangan
                </p>
                <input
                  type="text"
                  className="w-full h-8 border border-slate-400 rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-full">
                <p className="text-sm font-medium text-slate-700">
                  Nominal Tunjangan
                </p>
                <input
                  type="text"
                  className="w-full h-8 border border-slate-400 rounded"
                  value={nominal}
                  onChange={(e) => setNominal(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full">
              <button
                type="submit"
                form="attendance_status_form"
                className="w-full bg-green-600 rounded mt-2 text-white h-8"
              >
                save
              </button>
              <button
                type="submit"
                form="attendance_status_form"
                className="w-full border border-gray-600 rounded mt-2 text-gray-600 h-8"
                onClick={() => {
                  setName("");
                  setNominal("");
                  setIsUpdate(false);
                }}
              >
                cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  const AddAllowanceComponent = (e) => {
    return (
    <div className="border border-slate-100 rounded shadow p-4 space-y-8">
        <div>
          <p className="font-bold text-slate-700">Form Add Allowance</p>
        </div>
        <div className="space-y-2">
          <form id="" onSubmit={handleSubmit}>
            <div className="md:flex gap-4 justify-between w-full">
              <div className="w-full">
                <p className="text-sm font-medium text-slate-700">
                  Nama Tunjangan
                </p>
                <input
                  type="text"
                  className="w-full h-8 border border-slate-400 rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-full">
                <p className="text-sm font-medium text-slate-700">
                  Nominal Tunjangan
                </p>
                <input
                  type="text"
                  className="w-full h-8 border border-slate-400 rounded"
                  value={nominal}
                  onChange={(e) => setNominal(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full">
              <button
                type="submit"
                form="attendance_status_form"
                className="w-full bg-green-600 rounded mt-2 text-white h-8"
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  

  return (
    <div className="w-full md:mx-8 space-y-8">
      <TitleDashboard
        Title="Add Allowance"
        Keterangan="Manage company allowance settings "
      />

      <div>
        <Link
          to="../allowance"
          className="flex gap-1 items-center text-blue-400 hover:text-blue-700 w-fit"
        >
          <Icon icon="bi:arrow-left" className="text-sm  font-medium"></Icon>
          <p className="text-sm font-medium hover:font-bold">
            Back to Allowance
          </p>
        </Link>
      </div>

      {isUpdate ? UpdateAllowanceComponent() : AddAllowanceComponent()}

      <div className="border border-slate-100 rounded shadow p-4">
        <table className="w-full text-center overflow-x-scroll rounded">
          <thead className="bg-gray-100 border-b-2 border-gray-700">
            <tr>
              <th>#</th>
              <th>Nama Tunjangan</th>
              <th>Nominal Tunjangan</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium text-center text-gray-600">
            {dataAllowance.data ? (
              Object.keys(dataAllowance.data).map((row, index) => (
                <tr key={dataAllowance.data[row].id}>
                  <td>{index + 1}</td>
                  <td>{dataAllowance.data[row].name}</td>
                  <td>{dataAllowance.data[row].nominal}</td>
                  <td className="w-24">
                    <div className="flex justify-center gap-1">
                      <ButtonSmall
                        bg="bg-yellow-500"
                        icon="fa6-solid:pen-to-square"
                        colorIcon="text-white"
                        onClick={
                          (e) => {
                            setIsUpdate(true)
                            setId(dataAllowance.data[row].id)
                            setName(dataAllowance.data[row].name)
                            setNominal(dataAllowance.data[row].nominal)
                          }
                          
                        }
                      />
                      <ButtonSmall
                        bg="bg-red-500"
                        icon="ci:trash-full"
                        colorIcon="text-white"
                        onClick={() =>
                          showModalDelete(dataAllowance.data[row].id)
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Loading</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {modalAllowanceDelete && (
        <ModalDelete
          isOpen={modalAllowanceDelete}
          setIsOpen={setModalAllowanceDelete}
          title="Delete Allowance"
          typeData="allowance_settings"
          data={allowanceDeleteData}
        />
      )}
    </div>
  );
};

export default AllowanceAdd;
