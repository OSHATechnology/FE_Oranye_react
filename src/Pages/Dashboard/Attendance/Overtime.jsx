import React, { useEffect, useState } from "react";
import ButtonSmall from "../../../Components/ButtonSmall";
import SimpleCard from "../../../Components/SimpleCard";
import ModalFilter from "../../../Components/Modal/ModalFilterAttendance";
import Modal from "../../../Components/Modal/ModalAttendance";
import axios from "axios";
import ConfigHeader from "../../Auth/ConfigHeader";
import env from "react-dotenv";
import moment from "moment";

const Overtime = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalFilterOpened, setIsModalFilterOpened] = useState(false);
  const [dataOvertime, setDataOvertime] = useState([]);
  useEffect(() => {
    const fetchDataOvertime = async () => {
      const result = await axios.get(
        `http://127.0.0.1:8000/api/overtime`,
        ConfigHeader
      );
      setDataOvertime(result.data.data);
    };

    fetchDataOvertime().catch((err) => {
      console.log(err.message);
    });
  }, []);
  // const dataOvertime = [
  //   {
  //     id: "1",
  //     img: "../assets/PP.png",
  //     name: "Tatang Suherman",
  //     hour: "2",
  //     acc: "Tatang Suherman",
  //   },
  //   {
  //     id: "2",
  //     img: "../assets/Logo.png",
  //     name: "Arunika",
  //     hour: "Work",
  //     acc: "Lead",
  //   },
  // ];

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-8">
        <SimpleCard
          bgColor="bg-orange-100"
          Title="Overtime"
          Icon="material-symbols:work-history"
          Count="7"
        />
      </div>
      <div className="md:flex justify-between items-center space-y-4 md:space-y-0">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {moment().format("dddd, DD MMMM YYYY")} | Overtime
          </p>
        </div>
        <div className="flex gap-2 justify-end">
          <input
            type="text"
            placeholder="Search"
            className="rounded h-9 border border-gray-300"
          />
          <ButtonSmall icon="akar-icons:search" />
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
      <div>
        <table className="w-full text-center overflow-x-scroll">
          <thead className="bg-gray-200 h-10 border-b border-gray-500">
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Hour</th>
              <th>Assigned By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-base font-medium text-gray-700 md:text-sm">
            {dataOvertime.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center justify-center gap-2">
                    <img src={row.img} alt="" className="w-8" />
                    <span>{row.employeeId.name}</span>
                  </div>
                </td>
                <td className="w-2">
                  <span>
                    {Math.round(moment.duration(moment(row.endAt, 'YYYY/MM/DD HH:mm').diff(moment(row.startAt, 'YYYY/MM/DD HH:mm'))).asHours())} hours 
                  </span>
                  <span className="ml-2 text-xs font-thin text-gray-500">
                  ({moment(row.startAt).format("HH:mm")} - {moment(row.endAt).format("HH:mm")})
                  </span>
                </td>
                <td>{row.assignedBy.name}</td>
                <td>
                  <ButtonSmall
                    bg="bg-blue-500"
                    icon="carbon:view"
                    onClick={() => setIsOpen(!isOpen)}
                  />
                  <Modal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    title="Info Detail"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Overtime;
