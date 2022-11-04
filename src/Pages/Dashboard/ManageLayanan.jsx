import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ButtonNormal from "../../Components/ButtonNormal";
import ButtonSmall from "../../Components/ButtonSmall";
import Search from "../../Components/Search";
import TitleDashboard from "../../Components/TitleDashboard";
import ConfigHeader from "../Auth/ConfigHeader";
import ModalAdd from "../../Components/Modal/AddInsuranceItem";
import ModalDelete from "../../Components/Modal/ModalDelete";
import Pagination from "react-js-pagination";
import ModalManage from "../../Components/Modal/ManageInsurance";
import ModalEdit from "../../Components/Modal/ModalEdit";

const ManageLayanan = (props) => {
  const paramsData = useParams();
  const [dataItem, setDataItem] = useState([]);
  const [insuranceItemDeleteData, setInsuranceItemDeleteData] = useState("");
  const [modalInsuranceItemDelete, setModalInsuranceItemDelete] =
    useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [dataInsurance, setDataInsurance] = useState([
    {
      insuranceId: "",
      name: "",
      companyName: "",
      address: "",
    },
  ]);

  const fetchDataInsurance = async (page = 1, search = "") => {
    const data = await axios.get(
      `/api/insurance/${paramsData.id}?search=${search}&page=${page}`,
      ConfigHeader
    );
    setDataInsurance(data.data.data);
    setDataItem(data.data.data.data.data);
  };
  let dataInsuranceItemId = "";

  // Edit
  const [modalInsuranceItemEdit, setModalInsuranceItemEdit] = useState(false);
  const [insuranceItemEditData, setInsuranceItemEditData] = useState([]);
  const fetchDataIns = async () => {
    const result = await axios.get(
      `/api/insurance_item/${dataInsuranceItemId}`,
      ConfigHeader
    );
    setInsuranceItemEditData(result.data.data);
    setModalInsuranceItemEdit(true);
  };
  const setModalEditInsuranceItem = async (insuranceItemId) => {
    dataInsuranceItemId = insuranceItemId;
    await fetchDataIns();
  };

  const handleAlert = (type, message) => {
    props.alert(type, message);
  };

  useEffect(() => {
    fetchDataInsurance().catch((err) => {
      window.location.href = "/dashboard/insurance";
    });
  }, [paramsData]);

  // delete
  let dataInsuranceId = "";
  const showModalDelete = async (insuranceId) => {
    dataInsuranceId = insuranceId;
    setInsuranceItemDeleteData(dataInsuranceId);
    setModalInsuranceItemDelete(true);
  };

  const handleSearch = (e) => {
    try {
      fetchDataInsurance(1, e.target.value);
      setSearchValue(e.target.value);
    } catch (err) {}
  };

  const refresh = () => {
    window.location.reload();
  };

  // Add Insurance Item
  const [isModalAddOpened, setIsModalAddOpened] = useState(false);

  // Manage Insurance
  const [isModalManageOpened, setIsModalManageOpened] = useState(false);
  return (
    <div className="w-full md:mx-8 space-y-8">
      <TitleDashboard
        Title="Insurance Details"
        Keterangan="Detailed information of Insurance"
      />

      <div className="flex gap-2 items-center">
        <Link
          to="../insurance"
          className="flex gap-1 items-center text-blue-400 hover:text-blue-700 w-fit"
        >
          <Icon icon="bi:arrow-left" className="text-sm  font-medium"></Icon>

          <p className="text-sm  font-medium hover:font-bold">
            Back to Insurance
          </p>
        </Link>
        <p className="font-bold text-blue-800">|</p>

        <button onClick={() => setIsModalManageOpened(!isModalManageOpened)}>
          <p className="text-sm  font-medium hover:font-bold text-blue-400 hover:text-blue-700 w-fit">
            Manage This Insurance
          </p>
        </button>
        <ModalManage
          isOpen={isModalManageOpened}
          setIsOpen={setIsModalManageOpened}
          title="Manage This Insurance"
          data={dataInsurance}
          action={fetchDataInsurance}
          showAlert={handleAlert}
        />
      </div>

      <div className="border border-gray-100 rounded shadow  p-2 space-y-4">
        <div>
          <table className="text-sm font-semibold text-slate-600">
            <tbody>
              <tr>
                <td>Insurance Name</td>
                <td className="px-3">:</td>
                <td>{dataInsurance.name}</td>
              </tr>
              <tr>
                <td>Company Name</td>
                <td className="px-3">:</td>
                <td>{dataInsurance.company}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td className="px-3">:</td>
                <td>{dataInsurance.address}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-16">
          <div className="justify-between items-center md:min-h-1/3 md:flex md:flex-row md:w-full">
            <div className="flex gap-4">
              <ButtonNormal
                bg="bg-green-600 "
                icon="bi:plus"
                text="Add"
                onClick={() => setIsModalAddOpened(!isModalAddOpened)}
              />
              <ModalAdd
                isOpen={isModalAddOpened}
                setIsOpen={setIsModalAddOpened}
                title="Add Insurance Service"
                data={dataInsurance}
                action={fetchDataInsurance}
                showAlert={handleAlert}
              />
            </div>

            <Search onChange={handleSearch} />
          </div>
        </div>

        <div className="w-full">
          <table className="w-full text-center" id="tblMember">
            <thead className="bg-gray-100 h-10 border-b border-gray-400">
              <tr>
                <th>#</th>
                <th>Service Name</th>
                <th>Service Type</th>
                <th>Percent</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataItem ? (
                Object.keys(dataItem).map((row, index) => (
                  <tr key={dataItem[row].insItemId} className=" shadow ">
                    <td>{parseInt(row) + 1}</td>
                    <td>{dataItem[row].name}</td>
                    <td>{dataItem[row].type}</td>
                    <td>{dataItem[row].percent}</td>
                    <td>
                      {dataItem[row].roles ? (
                        dataItem[row].roles.map((role, irole) => (
                          <span className="" key={irole}>
                            {role.nameRole}
                            {irole < dataItem[row].roles.length - 1 ? (
                              <span>, </span>
                            ) : (
                              ""
                            )}
                          </span>
                        ))
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                    <td>
                      <div className="flex justify-center gap-1">
                        <ButtonSmall
                          bg="bg-yellow-500"
                          icon="fa6-solid:pen-to-square"
                          colorIcon="text-white"
                          onClick={() =>
                            setModalEditInsuranceItem(dataItem[row].insItemId)
                          }
                        />
                        <ButtonSmall
                          bg="bg-red-500"
                          icon="bi:trash"
                          onClick={() =>
                            showModalDelete(dataItem[row].insItemId)
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
          {modalInsuranceItemEdit && (
            <ModalEdit
              isOpen={modalInsuranceItemEdit}
              setIsOpen={setModalInsuranceItemEdit}
              title="Edit Insurance Service"
              typeData="insurance_item"
              data={insuranceItemEditData}
              action={fetchDataInsurance}
              showAlert={handleAlert}
            />
          )}
          {modalInsuranceItemDelete && (
            <ModalDelete
              isOpen={modalInsuranceItemDelete}
              setIsOpen={setModalInsuranceItemDelete}
              title="Delete Service"
              typeData="insurance_item"
              data={insuranceItemDeleteData}
              action={fetchDataInsurance}
              showAlert={handleAlert}
            />
          )}
        </div>
        {dataInsurance.data && (
          <Pagination
            activePage={
              dataInsurance.data.current_page
                ? dataInsurance.data.current_page
                : 0
            }
            itemsCountPerPage={
              dataInsurance.data?.per_page ? dataInsurance.data?.per_page : 0
            }
            totalItemsCount={
              dataInsurance.data?.total ? dataInsurance.data?.total : 0
            }
            onChange={(pageNumber) => {
              fetchDataInsurance(pageNumber, searchValue);
            }}
            innerClass="flex justify-center items-center gap-2 my-8 "
            pageRangeDisplayed={8}
            itemClass="text-sm font-semibold text-slate-600 rounded-full px-2 hover:bg-slate-100 "
            linkClass="page-link"
            activeClass="bg-slate-100 font-bold"
          />
        )}
      </div>
    </div>
  );
};

export default ManageLayanan;
