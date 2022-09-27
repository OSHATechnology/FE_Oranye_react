import React, { useEffect, useState } from "react";
import ButtonSmall from "../../../Components/ButtonSmall";
import SimpleCard from "../../../Components/SimpleCard";
import { Icon } from "@iconify/react";
// import Modal from "../../../Components/Modal/ModalAttendance";
import ModalDecline from "../../../Components/Modal/ModalDecline";
import ModalAcc from "../../../Components/Modal/ModalAccept";
import axios from "axios";
import ConfigHeader from "../../Auth/ConfigHeader";
import ModalDetail from "../../../Components/Modal/ModalDetail";
import Search from "../../../Components/Search";

const Attendance = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const [isModalAccOpened, setIsModalAccOpened] = useState(false);
  const [isModalDeclineOpened, setIsModalDeclineOpened] = useState(false);
  const [dataAttendance, setDataAttendance] = useState([]);


  const [modalAttendance, setModalAttendance] = useState(false);
  const [attendanceDetail, setAttendanceDetail] = useState([]);

  let dataAttendanceId = "";
  const showModalDetail = async (attendanceId) => {
    dataAttendanceId = attendanceId;
    await fetchDataAttendanceDetail();
  };

  const fetchDataAttendanceDetail = async () => {
    const result = await axios.get(`/api/attendance/${dataAttendanceId}`, ConfigHeader);
    setAttendanceDetail(result.data.data);
    setModalAttendance(true);
  }

  useEffect(() => {
    const fetchDataAttendance = async () => {
        const result = await axios.get(`/api/furlough`, ConfigHeader);
        setDataAttendance(result.data.data.data);
    };

    fetchDataAttendance().catch((err) => {
      console.log(err.message);
    });
  }, []);

//   const dataAttendance = [
//     {
//       id: "1",
//       img: "../assets/PP.png",
//       name: "Tatang Suherman",
//       icon: "bi:airplane-engines-fill",
//       type: "furlough",
//       email: "suherman77@gmail.com",
//     },
//     {
//       id: "2",
//       img: "../assets/Logo.png",
//       name: "Arunika",
//       icon: "ic:baseline-work",
//       type: "Work",
//       email: "arunika28@gmail.com",
//     },
//   ];

  return (
    <div className="w-full space-y-4">
      <div className="md:flex md:gap-8 space-y-4 md:space-y-0">
        <SimpleCard
          bgColor="bg-orange-100"
          Title="Request"
          Icon="fluent:mail-20-filled"
          Count="7"
        />
        <SimpleCard
          bgColor="bg-orange-100"
          Title="Approved"
          Icon="fa6-solid:envelope-circle-check"
          Count="7"
        />
      </div>
      <div className="flex gap-2 justify-end">
        {/* <input
          type="text"
          placeholder="Search"
          className="rounded h-9 border border-gray-300"
        />
        <ButtonSmall icon="akar-icons:search" /> */}
      <Search />
      </div>
      <div>
        <table className="w-full text-center overflow-x-scroll">
          <thead className="bg-gray-200 h-10 border-b border-gray-500">
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Type</th>
              <th>Status</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-xs font-medium text-gray-700 md:text-sm">
            {dataAttendance.map((row, index) => (
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
                    {/* <span>{row.attendanceStatus.status}</span> */}
                    {/* <Icon icon="bxs:plane" className= "text-xl"></Icon> */}
                  </div>
                </td>
                <td>{row.typeInOut  }</td>
                <td>{row.timeAttend}</td>
                <td>
                  <div className="flex justify-center gap-2">
                  <ButtonSmall
                        bg="bg-blue-600"
                        icon="carbon:view"
                        colorIcon="text-white"
                        onClick={() => showModalDetail(row.id)}
                      />
                    {/* <ButtonSmall
                      bg="bg-gray-500"
                      icon="carbon:view"
                      onClick={() => setIsOpen(!isOpen)}
                    />
                    <Modal
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      title="info Detail"
                    /> */}
                    <ButtonSmall
                      bg="bg-green-600"
                      icon="akar-icons:check"
                      onClick={() => setIsModalAccOpened(!isModalAccOpened)}
                    />
                    <ModalAcc
                      isOpen={isModalAccOpened}
                      setIsOpen={setIsModalAccOpened}
                      title="Accept Request"
                    />
                    <ButtonSmall
                      bg="bg-red-600"
                      icon="akar-icons:block"
                      onClick={() =>
                        setIsModalDeclineOpened(!isModalDeclineOpened)
                      }
                    />
                    <ModalDecline
                      isOpen={isModalDeclineOpened}
                      setIsOpen={setIsModalDeclineOpened}
                      title="Decline Request"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modalAttendance && (
            <ModalDetail
              isOpen={modalAttendance}
              setIsOpen={setModalAttendance}
              title="Detail Attendance"
              typeData="attendance"
              data={attendanceDetail}
            />
          )}
      </div>
    </div>
  );
};

export default Attendance;
