import React, { useEffect, useState } from "react";
import TitleDashboard from "../../Components/TitleDashboard";
import ButtonSmall from "../../Components/ButtonSmall";
import ButtonNormal from "../../Components/ButtonNormal";
import ModalAdd from "../../Components/Modal/PartnerAdd";
import ModalEdit from "../../Components/Modal/ModalEdit";
import ModalDelete from "../../Components/Modal/ModalDelete";
import ConfigHeader from "../Auth/ConfigHeader";
import axios from "axios";
import moment from "moment";
import ModalDetail from "../../Components/Modal/ModalDetail";
import Search from "../../Components/Search";
import Pagination from "react-js-pagination";
import Spinner2 from "../../Components/Spinner2";

const Partner = (props) => {
  const [modalPartnerDelete, setModalPartnerDelete] = useState(false);

  const [isModalAddOpened, setIsModalAddOpened] = useState(false);
  const [dataPartner, setDataPartner] = useState([]);
  const [modalPartnerDetail, setModalPartnerDetail] = useState(false);
  const [modalPartnerEdit, setModalPartnerEdit] = useState(false);
  const [partnerDetail, setPartnerDetail] = useState([]);
  const [partnerEdit, setPartnerEdit] = useState([]);
  const [partnerDeleteData, setPartnerDeleteData] = useState("");
  const [searchValue, setSearchValue] = useState("");

  let dataPartnerId = "";
  const showModalDetail = async (partnerId) => {
    dataPartnerId = partnerId;
    await fetchDataPartnerDetail();
  };

  const showModalDelete = async (partnerId) => {
    dataPartnerId = partnerId;
    setPartnerDeleteData(dataPartnerId);
    setModalPartnerDelete(true);
  };

  const fetchDataPartnerDetail = async () => {
    const result = await axios.get(
      `/api/partners/${dataPartnerId}`,
      ConfigHeader
    );
    setPartnerDetail(result.data.data);
    setModalPartnerDetail(true);
  };

  const fetchDataPartnerEdit = async () => {
    const result = await axios.get(
      `/api/partners/${dataPartnerId}`,
      ConfigHeader
    );
    setPartnerEdit(result.data.data);
    setModalPartnerEdit(true);
  };

  const showModalEdit = async (partnerId) => {
    dataPartnerId = partnerId;
    await fetchDataPartnerEdit();
  };

  const fetchDataPartner = async (page = 1, search = "") => {
    try {
      const result = await axios.get(
        `/api/partners?search=${search}&page=${page}`,
        ConfigHeader
      );
      setDataPartner(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    try {
      fetchDataPartner(1, e.target.value);
      setSearchValue(e.target.value);
    } catch (err) {}
  };

  const handleAlert = (type, message) => {
    props.alert(type, message);
  };

  useEffect(() => {
    fetchDataPartner();
  }, []);

  return (
    <div className="w-full md:mx-8 space-y-8">
      <TitleDashboard
        Title="Dashboard Partner"
        Keterangan="Partner From PT.OSHA Technology"
      />

      <div className="space-y-2 border rounded shadow p-2">
        <div className="flex justify-center">
          <div className="justify-between items-center md:min-h-1/3 md:flex md:flex-row md:w-full">
            <div className="">
              <ButtonNormal
                bg="bg-green-600 "
                text="Add"
                icon="bi:plus"
                onClick={() => setIsModalAddOpened(!isModalAddOpened)}
              />
              <ModalAdd
                isOpen={isModalAddOpened}
                setIsOpen={setIsModalAddOpened}
                title="Add Partner"
                action={fetchDataPartner}
                showAlert={handleAlert}
              />
            </div>
            <Search onChange={handleSearch} />
          </div>
        </div>
        <div className="items-start min-w-screen md:flex md:flex-row md:w-full ">
          <table className=" w-full text-center overflow-x-scroll">
            <thead className="bg-gray-100 border-b-2 border-gray-800 text-xs md:text-sm">
              <tr className="">
                <th className=" py-2">No</th>
                <th className="">Picture</th>
                <th className="">Company Name</th>
                <th className="">Company's Address</th>
                <th className="">Start Join</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs md:text-sm font-medium">
              {dataPartner.data ? (
                Object.keys(dataPartner.data).map((row, index) => (
                  <tr key={dataPartner.data[row].id} className=" shadow ">
                    <td>{parseInt(row) + 1}</td>
                    <td>
                      <div className="text-center flex items-center justify-center md:space-x-4">
                        <img
                          src={dataPartner.data[row].photo}
                          alt={"photo of " + dataPartner.data[row].name}
                          className="w-10 rounded-full"
                        />
                      </div>
                    </td>
                    <td className="text-start">{dataPartner.data[row].name}</td>
                    <td>{dataPartner.data[row].address}</td>
                    <td>
                      {moment(dataPartner.data[row].joinedAt).format(
                        "DD MMMM YYYY"
                      )}
                    </td>
                    <td>
                      <div className="flex justify-center gap-1">
                        <ButtonSmall
                          bg="bg-blue-600"
                          icon="carbon:view"
                          colorIcon="text-white"
                          onClick={() =>
                            showModalDetail(dataPartner.data[row].id)
                          }
                        />

                        <ButtonSmall
                          bg="bg-yellow-500"
                          icon="fa6-solid:pen-to-square"
                          colorIcon="text-white"
                          onClick={() =>
                            showModalEdit(dataPartner.data[row].id)
                          }
                        />
                        <ButtonSmall
                          bg="bg-red-500"
                          icon="ci:trash-full"
                          colorIcon="text-white"
                          onClick={() =>
                            showModalDelete(dataPartner.data[row].id)
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">
                    <Spinner2 />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {modalPartnerDetail && (
            <ModalDetail
              isOpen={modalPartnerDetail}
              setIsOpen={setModalPartnerDetail}
              title="Delete Partner"
              typeData="partner"
              data={partnerDetail}
            />
          )}
          {modalPartnerEdit && (
            <ModalEdit
              isOpen={modalPartnerEdit}
              setIsOpen={setModalPartnerEdit}
              title="Edit Partner"
              typeData="partner"
              data={partnerEdit}
              action={fetchDataPartner}
              showAlert={handleAlert}
            />
          )}
          {modalPartnerDelete && (
            <ModalDelete
              isOpen={modalPartnerDelete}
              setIsOpen={setModalPartnerDelete}
              title="Delete Partner"
              typeData="partner"
              data={partnerDeleteData}
              action={fetchDataPartner}
              showAlert={handleAlert}
            />
          )}
        </div>
        <Pagination
          activePage={dataPartner.current_page ? dataPartner.current_page : 0}
          itemsCountPerPage={dataPartner?.per_page ? dataPartner?.per_page : 0}
          totalItemsCount={dataPartner?.total ? dataPartner?.total : 0}
          onChange={(pageNumber) => {
            fetchDataPartner(pageNumber, searchValue);
          }}
          innerClass="flex justify-center items-center gap-2 my-8 "
          pageRangeDisplayed={8}
          itemClass="text-sm font-semibold text-slate-600 rounded-full px-2 hover:bg-slate-100 "
          linkClass="page-link"
          activeClass="bg-slate-100 font-bold"
        />
      </div>
    </div>
  );
};

export default Partner;
