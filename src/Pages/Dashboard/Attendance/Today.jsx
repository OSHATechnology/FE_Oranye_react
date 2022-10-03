import React, { useEffect, useState } from "react";
import ButtonSmall from "../../../Components/ButtonSmall";
import SimpleCard from "../../../Components/SimpleCard";
import { Icon } from "@iconify/react";
// import Modal from "../../../Components/Modal/ModalAttendance";
import ModalFilter from "../../../Components/Modal/ModalFilterAttendance";
import axios from "axios";
import ConfigHeader from "../../Auth/ConfigHeader";
import moment from "moment";
import ModalDetail from "../../../Components/Modal/ModalDetail";
import Search from "../../../Components/Search";

const Today = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const [isModalFilterOpened, setIsModalFilterOpened] = useState(false);
  const [dataToday, setDataToday] = useState([]);

  const [modalToday, setModalToday] = useState(false);
  const [todayDetail, setTodayDetail] = useState([]);

  let dataTodayId = "";
  const showModalDetail = async (todayId) => {
    dataTodayId = todayId;
    await fetchDataTodayDetail();
  };

  const fetchDataTodayDetail = async () => {
    const result = await axios.get(`/api/attendance/${dataTodayId}`,
      ConfigHeader
    );
    // console.log(result.data);
    setTodayDetail(result.data.data);
    setModalToday(true);
  };

  useEffect(() => {
    const fetchDataToday = async () => {
      const result = await axios.get(`/api/attendance/today`, ConfigHeader);
      setDataToday(result.data.data.data);
    };

    fetchDataToday().catch((err) => {
      console.log(err.message);
    });
  }, []);

  return (
    <div className="w-full space-y-4">
      <div className="md:flex space-y-4 md:space-y-0 gap-8">
        <SimpleCard
          bgColor=""
          Title="Active"

          Icon="clarity:assign-user-solid"
          Count="7"
        />
        <SimpleCard
          bgColor=""
          Title="Furlough"
          Icon="bxs:plane"
          Count="7"
        />
      </div>
      <div className="border rounded shadow p-2 space-y-2">
      <div className="md:flex  md:justify-between items-center space-y-4 md:space-y-0">
        <div>
          <p className="text-xs md:text-sm font-medium text-slate-500">
            {moment().format("dddd, DD MMMM YYYY")}
          </p>
        </div>
        <div className="flex gap-2 md:justify-end">
          <Search />
          <ButtonSmall
            icon="ant-design:filter-outlined"
            
            onClick={() => setIsModalFilterOpened(!isModalFilterOpened)}
          />
          <ModalFilter
            isOpen={isModalFilterOpened}
            setIsOpen={setIsModalFilterOpened}
            title="Filter Partner"
          />
        </div>
      </div>
        <table className="w-full text-center overflow-x-scroll">
          <thead className="bg-slate-200 h-10 border-b border-slate-500">
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Type</th>
              <th>Status</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-xs font-medium text-slate-700 md:text-sm">
            {dataToday.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center justify-center gap-2">
                    {/* <img src={row.img} alt="" className="w-8" /> */}
                    <span>{row.employee.name}</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <Icon icon={row.icon} className="text-xl mr-1" />
                    <span>{row.attendanceStatus.status}</span>
                    {/* <Icon icon="bxs:plane" className= "text-xl"></Icon> */}
                  </div>
                </td>
                <td>{row.typeInOut}</td>
                <td>{row.timeAttend}</td>
                <td>
                  <ButtonSmall
                    bg="bg-blue-600"
                    icon="carbon:view"
                    colorIcon="text-white"
                    onClick={() => showModalDetail(row.id)}
                  />
                  {/* <ButtonSmall
                    bg="bg-pink-500"
                    icon="carbon:view"
                    onClick={() => setIsOpen(!isOpen)}
                  />
                  <Modal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    title="Info Detail"
                  /> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modalToday && (
            <ModalDetail
              isOpen={modalToday}
              setIsOpen={setModalToday}
              title="Detail Attendance"
              typeData="attendance"
              data={todayDetail}
            />
          )}
      </div>
    </div>
  );
};

export default Today;
