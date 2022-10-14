import React, { useEffect, useState } from "react";
import ButtonSmall from "../../../Components/ButtonSmall";
import SimpleCard from "../../../Components/SimpleCard";
import { Icon } from "@iconify/react";
import ModalDecline from "../../../Components/Modal/ModalDecline";
import ModalAcc from "../../../Components/Modal/ModalAccept";
import axios from "axios";
import ConfigHeader from "../../Auth/ConfigHeader";
import ModalDetail from "../../../Components/Modal/ModalDetail";
import Search from "../../../Components/Search";
import Pagination from "react-js-pagination";

const LeaveRequest = () => {
  const [isModalAccOpened, setIsModalAccOpened] = useState(false);
  const [isModalDeclineOpened, setIsModalDeclineOpened] = useState(false);
  const [dataAttendance, setDataAttendance] = useState([]);
  const [dataOvertime, setDataOvertime] = useState([]);

  const [modalAttendance, setModalAttendance] = useState(false);
  const [attendanceDetail, setAttendanceDetail] = useState([]);

  let dataAttendanceId = "";
  const showModalDetail = async (attendanceId) => {
    dataAttendanceId = attendanceId;
    await fetchDataAttendanceDetail();
  };

  const fetchDataAttendanceDetail = async () => {
    const result = await axios.get(
      `/api/attendance/${dataAttendanceId}`,
      ConfigHeader
    );
    setAttendanceDetail(result.data.data);
    setModalAttendance(true);
  };

  const fetchDataOvertime = async () => {
    try {
      const result = await axios.get(`/api/overtime`, ConfigHeader);
      setDataOvertime(result.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataAttendance = async (page = 1, search = "") => {
    try {
      const result = await axios.get(
        `/api/attendance?search=${search}&page=${page}`,
        ConfigHeader
      );
      setDataAttendance(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataOvertime();

    fetchDataAttendance().catch((err) => {
      console.log(err.message);
    });
  }, []);

  const handleSearch = (e) => {
    try {
      fetchDataAttendance(1, e.target.value);
    } catch (err) {}
  };
  return (
    <div className="w-full space-y-4">
      <div className="md:flex  md:gap-8 space-y-4 md:space-y-0">
        <SimpleCard
          bgColor=""
          Title="Request"
          Icon="fluent:mail-20-filled"
          Count="7"
        />
        <SimpleCard
          bgColor=""
          Title="Approved"
          Icon="fa6-solid:envelope-circle-check"
          Count="7"
        />
      </div>
      <div className="border rounded shadow p-2 space-y-2">
        <div className="flex  justify-end">
          <Search onChange={handleSearch} />
        </div>
        <div>
          <table className="w-full text-center overflow-x-scroll">
            <thead className="bg-slate-200 h-10 border-b border-slate-500">
              <tr>
                <th rowSpan="2">No</th>
                <th rowSpan="2">EMployee</th>
                <th rowSpan="2">Type</th>
                <th colSpan="2">Request Date</th>
                <th rowSpan="2">Filing Date</th>
                <th rowSpan="2">Action</th>
              </tr>
              <tr>
                <th>Start at</th>
                <th>End at</th>
              </tr>
            </thead>
            <tbody className="text-xs font-medium text-slate-700 md:text-sm">
              {dataAttendance.data ? (
                Object.keys(dataAttendance.data).map((row, index) => (
                  <tr key={dataAttendance.data[row].id} className=" shadow ">
                    <td>{index + 1}</td>
                    <td>{dataAttendance.data[row].employee.name}</td>
                    <td>{dataAttendance.data[row].attendanceStatus.status}</td>
                    <td>{dataAttendance.data[row].timeAttend}</td>
                    <td>{dataAttendance.data[row].timeAttend}</td>
                    <td>{dataAttendance.data[row].timeAttend}</td>
                    {/* <td>{dataAttendance.data[row].typeInOut}</td> */}
                    <td>
                      <div className="flex justify-center gap-2">
                        {/* <ButtonSmall
                      bg="bg-blue-600"
                      icon="carbon:view"
                      colorIcon="text-white"
                      onClick={() => showModalDetail(dataAttendance.data[row].id)}
                    /> */}
                        <ButtonSmall
                          bg="bg-green-600"
                          icon="akar-icons:check"
                          onClick={() => setIsModalAccOpened(!isModalAccOpened)}
                        />

                        <ButtonSmall
                          bg="bg-red-600"
                          icon="akar-icons:block"
                          onClick={() =>
                            setIsModalDeclineOpened(!isModalDeclineOpened)
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">Loading</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* {modalAttendance && (
            <ModalDetail
              isOpen={modalAttendance}
              setIsOpen={setModalAttendance}
              title="Detail Attendance"
              typeData="attendance"
              data={attendanceDetail}
            />
          )} */}
        <ModalAcc
          isOpen={isModalAccOpened}
          setIsOpen={setIsModalAccOpened}
          title="Accept Request"
        />
        <ModalDecline
          isOpen={isModalDeclineOpened}
          setIsOpen={setIsModalDeclineOpened}
          title="Decline Request"
        />
        <Pagination
          activePage={
            dataAttendance.current_page ? dataAttendance.current_page : 0
          }
          itemsCountPerPage={
            dataAttendance?.per_page ? dataAttendance?.per_page : 0
          }
          totalItemsCount={dataAttendance?.total ? dataAttendance?.total : 0}
          onChange={(pageNumber) => {
            fetchDataAttendance(pageNumber);
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

export default LeaveRequest;
