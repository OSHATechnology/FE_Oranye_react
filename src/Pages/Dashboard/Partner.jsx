import React, { useEffect, useState } from "react";
import TitleDashboard from "../../Components/TitleDashboard";
import ButtonSmall from "../../Components/ButtonSmall";
import ButtonNormal from "../../Components/ButtonNormal";
import ModalAdd from "../../Components/Modal/PartnerAdd";
import ModalEdit from "../../Components/Modal/ModalEdit";
import ModalDelete from "../../Components/Modal/ModalDelete";
import ConfigHeader from "../Auth/ConfigHeader";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import ModalDetail from "../../Components/Modal/ModalDetail";
import Search from "../../Components/Search";

const Partner = () => {
  const [modalPartnerDelete, setModalPartnerDelete] = useState(false);
 
  const [isModalAddOpened, setIsModalAddOpened] = useState(false);
  const [dataPartner, setDataPartner] = useState([]);
  const [modalPartnerDetail, setModalPartnerDetail] = useState(false);
  const [modalPartnerEdit, setModalPartnerEdit] = useState(false);
  const [partnerDetail, setPartnerDetail] = useState([]);
  const [partnerEdit, setPartnerEdit] = useState([]);
  const [partnerDeleteData, setPartnerDeleteData] = useState("");

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
      const result = await axios.get(`/api/partners/${dataPartnerId}`, ConfigHeader);
      setPartnerEdit(result.data.data);
    setModalPartnerEdit(true);
  }


  const showModalEdit = async (partnerId) => {
    dataPartnerId = partnerId;
    await fetchDataPartnerEdit();
  };

  const fetchDataPartner = async () => {
    const result = await axios.get(`/api/partners`, ConfigHeader);
    setDataPartner(result.data.data.data);
  };
  

  useEffect(() => {

    fetchDataPartner().catch((err) => {
      console.log(err.message);
    });
  }, []);

  // 

  return (
    <div className="w-full md:mx-8">
      <TitleDashboard
        Title="Dashboard Partner"
        Keterangan="Partner From PT.OSHA Technology"
      />

      <div className="flex justify-center mt-8 mb-2">
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
            />
          </div>
          {/* <div className="flex space-x-2 items-center">
            <input
              type="text"
              placeholder="Search"
              className="rounded border border-gray-300 h-9 text-center w-72"
            />
            <ButtonSmall
              bg="bg-gray-400"
              icon="akar-icons:search"
              colorIcon="text-white"
            />
          </div> */}
          <Search />
        </div>
      </div>

      <div className="flex justify-center">
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
              {dataPartner.map((row, index) => (
                <tr key={row.id} className=" shadow ">
                  <td>{index + 1}</td>
                  <td>
                    <div className="text-center flex items-center justify-center md:space-x-4">
                      <img src={row.photo} alt={"photo of "+row.name} className="w-10" />
                    </div>
                  </td>
                  <td>{row.name}</td>
                  <td>{row.address}</td>
                  <td>{moment(row.joinedAt).format("DD MMMM YYYY")}</td>
                  <td>
                    <div className="flex justify-center gap-1">
                      <ButtonSmall
                        bg="bg-blue-600"
                        icon="carbon:view"
                        colorIcon="text-white"
                        onClick={() => showModalDetail(row.id)}
                      />

                      <ButtonSmall
                        bg="bg-yellow-500"
                        icon="fa6-solid:pen-to-square"
                        colorIcon="text-white"
                        onClick={() => showModalEdit(row.id)}
                      />
                      <ButtonSmall
                        bg="bg-red-500"
                        icon="ci:trash-full"
                        colorIcon="text-white"
                        onClick={() =>
                          showModalDelete(row.id)}
                      />
                      {/* Modal Kanggo Delete */}
                      {/* <ModalDelete
                        isOpen={isModalDeleteOpened}
                        setIsOpen={setIsModalDeleteOpened}
                        title="Delete Partner"
                        type="partner"
                        dataId={row.id}
                      /> */}
                    </div>
                  </td>
                </tr>
              ))}
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
            />
          )}
          {modalPartnerDelete && (
            <ModalDelete
              isOpen={modalPartnerDelete}
              setIsOpen={setModalPartnerDelete}
              title="Delete Partner"
              typeData="partner"
              data={partnerDeleteData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Partner;
