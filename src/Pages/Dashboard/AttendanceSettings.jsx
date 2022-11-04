import TitleDashboard from "../../Components/TitleDashboard";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ButtonNormal from "../../Components/ButtonNormal";
import { Icon } from "@iconify/react";
import ButtonSmall from "../../Components/ButtonSmall";
import ConfigHeader from "../Auth/ConfigHeader";
import axios from "axios";
import Search from "../../Components/Search";
import Pagination from "react-js-pagination";
import ModalAddFurloughType from "../../Components/Modal/FurloughTypeAdd";
import ModalAddAttendanceStatus from "../../Components/Modal/AttendanceStatusAdd";
import ModalDelete from "../../Components/Modal/ModalDelete";
import ModalEdit from "../../Components/Modal/ModalEdit";

const AttendanceSettings = (props) => {
  const [dataFurlough, setDataFurlough] = useState([]);
  const [dataAttendanceStatus, setDataAttendanceStatus] = useState([]);
  const [searchAttendanceValue, setSearchAttendanceValue] = useState("");
  const [searchFurloughValue, setSearchFurloughValue] = useState("");
  const paramsData = useParams();

  const fetchDataFurlough = async (page = 1, search = "", per_page = 10) => {
    try {
      const result = await axios.get(
        `/api/furlough_type?search=${search}&page=${page}&per_page=${per_page}`,
        ConfigHeader
      );
      setDataFurlough(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataAttendanceStatus = async (
    page = 1,
    search = "",
    per_page = 10
  ) => {
    try {
      const result = await axios.get(
        `/api/attendance_status?search=${search}&page=${page}&per_page=${per_page}`,
        ConfigHeader
      );
      setDataAttendanceStatus(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataFurlough();
    fetchDataAttendanceStatus();
  }, [paramsData]);

  const handleSearchFurlough = (e) => {
    try {
      fetchDataFurlough(1, e.target.value);
      setSearchFurloughValue(e.target.value);
    } catch (err) {}
  };

  const handleSearchAttendance = (e) => {
    try {
      fetchDataAttendanceStatus(1, e.target.value);
      setSearchAttendanceValue(e.target.value);
    } catch (err) {}
  };

  // Delete Furlough
  const [modalFurloughTypeDelete, setModalFurloughTypeDelete] = useState(false);
  const [furloughTypeDeleteData, setFurloughTypeDeleteData] = useState("");
  let dataFurloughTypeId = "";
  const showModalDeleteFurlough = async (furloughTypeId) => {
    dataFurloughTypeId = furloughTypeId;
    setFurloughTypeDeleteData(dataFurloughTypeId);
    setModalFurloughTypeDelete(true);
  };

  // Add Furlough Type
  const [isModalAddOpened, setIsModalAddOpened] = useState(false);

  // Edit Furlough Type
  const [modalFurloughTypeEdit, setModalFurloughTypeEdit] = useState(false);
  const [furloughTypeEdit, setFurloughTypeEdit] = useState([]);
  const fetchDataFurloughTypeEdit = async () => {
    const result = await axios.get(
      `/api/furlough_type/${dataFurloughTypeId}`,
      ConfigHeader
    );
    setFurloughTypeEdit(result.data.data);
    setModalFurloughTypeEdit(true);
  };
  const setModalEditFurlough = async (furloughTypeId) => {
    dataFurloughTypeId = furloughTypeId;
    await fetchDataFurloughTypeEdit();
  };

  // Edit Attendance Status
  const [modalAttendanceStatusEdit, setModalAttendanceStatusEdit] = useState(false);
  const [attendanceStatusEdit, setAttendanceStatusEdit] = useState([]);
  const fetchDataAttendanceStatusEdit = async () => {
    const result = await axios.get(
      `/api/attendance_status/${dataAttendanceStatusId}`,
      ConfigHeader
    );
    setAttendanceStatusEdit(result.data.data);
    setModalAttendanceStatusEdit(true);
  };
  const setModalEditAttendance = async (attendanceStatusId) => {
    dataAttendanceStatusId = attendanceStatusId;
    await fetchDataAttendanceStatusEdit();
  };

  const handleAlert = (type,message) => {
    props.alert(type,message);
  }

  

  // Add Attendance Status
  const [isModalAttendanceStatusAddOpened, setIsModalAttendanceStatusAddOpened] = useState(false);

  // Delete Attendance
  const [modalAttendanceStatusDelete, setModalAttendanceStatusDelete] = useState(false);
  const [attendanceStatusDeleteData, setAttendanceStatusDeleteData] = useState("");
  let dataAttendanceStatusId = "";
  const showModalDeleteAttendance = async (attedanceStatusId) => {
    dataAttendanceStatusId = attedanceStatusId;
    setAttendanceStatusDeleteData(dataAttendanceStatusId);
    setModalAttendanceStatusDelete(true);
  };

  return (
    <div className="w-full md:mx-8 space-y-8">
      <TitleDashboard
        Title="Attendance Settings"
        Keterangan="Manage company attendance settings "
      />
      <div>
        <Link
          to="../hadir"
          className="flex gap-1 items-center text-blue-400 hover:text-blue-700 w-fit"
        >
          <Icon icon="bi:arrow-left" className="text-sm  font-medium"></Icon>
          <p className="text-sm font-medium hover:font-bold">
            Back to Attendance
          </p>
        </Link>
      </div>

      <div className="md:flex gap-8 mt-8 space-y-4 md:space-y-0">
        <div className="basis-1/2 h-fit border border-gray-200 rounded-xl space-y-4 p-4">
          <div>
            <p className="text-xl font-bold">Furlough Type</p>
          </div>
          <div className="flex justify-between items-center ">
            <div>
            <ButtonNormal
                bg="bg-green-600 "
                icon="bi:plus"
                text="Add"
                onClick={() => setIsModalAddOpened(!isModalAddOpened)}
              />
              <ModalAddFurloughType
                isOpen={isModalAddOpened}
                setIsOpen={setIsModalAddOpened}
                title="Add Furlough Type"
                action={fetchDataFurlough}
                showAlert={handleAlert}
              />
            </div>
            <Search onChange={handleSearchFurlough} />
          </div>
          <div>
            <table className="w-full text-center overflow-x-scroll rounded">
              <thead className="bg-gray-100 border-b-2 border-gray-700">
                <tr>
                  <th>#</th>
                  <th>Nama</th>
                  <th>Duration</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium text-gray-600">
                {dataFurlough.data ? (
                  Object.keys(dataFurlough.data).map((row, index) => (
                    <tr
                      key={dataFurlough.data[row].furTypeId}
                      className=" shadow "
                    >
                      <td>{parseInt(row) + 1}</td>
                      <td>{dataFurlough.data[row].name}</td>
                      <td>{dataFurlough.data[row].max}</td>
                      <td>{dataFurlough.data[row].type}</td>
                      <td>
                      <div className="flex justify-center gap-1">
                          <ButtonSmall
                            bg="bg-yellow-500"
                            icon="fa6-solid:pen-to-square"
                            colorIcon="text-white"
                            onClick={() =>
                              setModalEditFurlough(dataFurlough.data[row].furTypeId)
                            }
                          />
                          <ButtonSmall
                            bg="bg-red-500"
                            icon="ci:trash-full"
                            colorIcon="text-white"
                            onClick={() =>
                              showModalDeleteFurlough(dataFurlough.data[row].furTypeId)
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
          {modalFurloughTypeEdit && (
            <ModalEdit
              isOpen={modalFurloughTypeEdit}
              setIsOpen={setModalFurloughTypeEdit}
              title="Edit Furlough Type"
              typeData="furlough_type"
              data={furloughTypeEdit}
              action={fetchDataFurlough}
            />
          )}

          {modalFurloughTypeDelete && (
            <ModalDelete
              isOpen={modalFurloughTypeDelete}
              setIsOpen={setModalFurloughTypeDelete}
              title="Delete Furlough Type"
              typeData="furlough_type"
              data={furloughTypeDeleteData}
              action={fetchDataFurlough}
            />
          )}
          <Pagination
            activePage={dataFurlough.current_page ? dataFurlough.current_page : 0}
            itemsCountPerPage={dataFurlough?.per_page ? dataFurlough?.per_page : 0}
            totalItemsCount={dataFurlough?.total ? dataFurlough?.total : 0}
            onChange={(pageNumber) => {
              fetchDataFurlough(pageNumber, searchFurloughValue);
            }}
            innerClass="flex justify-center items-center gap-2 my-8 "
            pageRangeDisplayed={8}
            itemClass="text-sm font-semibold text-slate-600 rounded-full px-2 hover:bg-slate-100 "
            linkClass="page-link"
            activeClass="bg-slate-100 font-bold"
          />
        </div>
        <div className="basis-1/2 h-fit border border-gray-200 rounded-xl space-y-4 p-4">
          <div>
            <p className="text-xl font-bold">Attendance Status</p>
          </div>
          <div className="flex justify-between items-center ">
            <div>
            <ButtonNormal
                bg="bg-green-600 "
                icon="bi:plus"
                text="Add"
                onClick={() => setIsModalAttendanceStatusAddOpened(!isModalAttendanceStatusAddOpened)}
              />
              <ModalAddAttendanceStatus
                isOpen={isModalAttendanceStatusAddOpened}
                setIsOpen={setIsModalAttendanceStatusAddOpened}
                title="Add Attendance Status"
                action={fetchDataAttendanceStatus}
                showAlert={handleAlert}
              />
            </div>
            <Search onChange={handleSearchAttendance} />
          </div>

          <div>
            <table className="w-full text-center overflow-x-scroll rounded">
              <thead className="bg-gray-100 border-b-2 border-gray-700">
                <tr>
                  <th>#</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium text-gray-600">
                {dataAttendanceStatus.data ? (
                  Object.keys(dataAttendanceStatus.data).map((row, index) => (
                    <tr
                      key={dataAttendanceStatus.data[row].attendanceStatusId}
                      className=" shadow "
                    >
                      <td>{parseInt(row) + 1}</td>
                      <td className="">{dataAttendanceStatus.data[row].status}</td>
                      <td>
                      <div className="flex justify-center gap-1">
                          <ButtonSmall
                            bg="bg-yellow-500"
                            icon="fa6-solid:pen-to-square"
                            colorIcon="text-white"
                            onClick={() =>
                              setModalEditAttendance(dataAttendanceStatus.data[row].attendanceStatusId)
                            }
                          />
                          <ButtonSmall
                            bg="bg-red-500"
                            icon="ci:trash-full"
                            colorIcon="text-white"
                            onClick={() =>
                              showModalDeleteAttendance(dataAttendanceStatus.data[row].attendanceStatusId)
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
          {modalAttendanceStatusEdit && (
            <ModalEdit
              isOpen={modalAttendanceStatusEdit}
              setIsOpen={setModalAttendanceStatusEdit}
              title="Edit Attendance Status"
              typeData="attendance_status"
              data={attendanceStatusEdit}
              action={fetchDataAttendanceStatus}
            />
          )}

          {modalAttendanceStatusDelete && (
            <ModalDelete
              isOpen={modalAttendanceStatusDelete}
              setIsOpen={setModalAttendanceStatusDelete}
              title="Delete Attendance Status"
              typeData="attendance_status"
              data={attendanceStatusDeleteData}
              action={fetchDataAttendanceStatus}
            />
          )}

          <Pagination
            activePage={dataAttendanceStatus.current_page ? dataAttendanceStatus.current_page : 0}
            itemsCountPerPage={dataAttendanceStatus?.per_page ? dataAttendanceStatus?.per_page : 0}
            totalItemsCount={dataAttendanceStatus?.total ? dataAttendanceStatus?.total : 0}
            onChange={(pageNumber) => {
              fetchDataAttendanceStatus(pageNumber, searchAttendanceValue);
            }}
            innerClass="flex justify-center items-center gap-2 my-8 "
            pageRangeDisplayed={8}
            itemClass="text-sm font-semibold text-slate-600 rounded-full px-2 hover:bg-slate-100 "
            linkClass="page-link"
            activeClass="bg-slate-100 font-bold"
          />
        </div>
      </div>
    </div>
  );
};

export default AttendanceSettings;
