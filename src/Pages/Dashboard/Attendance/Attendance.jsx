import React, { Fragment, useEffect, useState } from "react";
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
import Pagination from "react-js-pagination";
import { Menu, Tab, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

const Attendance = () => {
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

  const fetchDataAttendance = async (page = 1,search = "") => {
    try {
      const result = await axios.get(`/api/attendance?search=${search}&page=${page}`, ConfigHeader);
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
    try{
      fetchDataAttendance(1,e.target.value);
    }catch(err){
  
    }
  }
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
        <div className="flex  justify-between">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-slate-600 bg-opacity-70 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <Icon
                icon="ant-design:filter-outlined"
                className="text-center text-lg text-white"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-0 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 space-y-2">
                <Menu.Item>
                  <div className=" flex items-center px-2">
                    <input type="radio" className="w-2.5 h-2.5" />
                    <p className="font-semibold text-gray-600 text-sm px-2">
                      Last day
                    </p>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div className=" flex items-center px-2">
                    <input type="radio" className="w-2.5 h-2.5" />
                    <p className="font-semibold text-gray-600 text-sm px-2">
                      Last Week
                    </p>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div className=" flex items-center px-2">
                    <input type="radio" className="w-2.5 h-2.5" />
                    <p className="font-semibold text-gray-600 text-sm px-2">
                      Last Month
                    </p>
                  </div>
                </Menu.Item>
              </div>
              {/* <div className="px-1 py-1">
                <Menu.Item>
                  
                  <div className="flex items-center gap-2 px-2">
                    <div>
                      <Icon icon={"bxs:plane"}></Icon>
                    </div>
                    <div className="text-xs">
                      <div>
                        <p className="font-semibold text-gray-600">
                          Furlough for 06 Desember
                        </p>
                      </div>
                      <div className="flex font-thin text-gray-400">
                        <div>
                          <p>12 June 22</p>
                        </div>
                        <div>
                          <p>|</p>
                        </div>
                        <div>
                          <p>08:00 A.M</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Icon
                        icon={"akar-icons:circle-check"}
                        className="text-green-600"
                      ></Icon>
                    </div>
                  </div>
                </Menu.Item>
              </div> */}
              <div className="px-1 py-1 ">
                <Menu.Item>
                  <div className="px-2 flex items-center gap-2">
              <p><p className="text-xs font-semibold">Custom : </p></p>
                  <input type="date" name="" id="" className="h-6 rounded border border-gray-400 text-xs text-gray-600"  />
                  </div>
                  {/* {({ active }) => (
                    <Link
                      // to="../notification"
                      className={`${
                        active ? "font-bold" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <Icon icon="akar-icons:plus"></Icon>
                      <p className="text-xs ">Custom Date</p>
                    </Link>
                  )} */}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
          <Search onChange={handleSearch}/>
        </div>
        <div>

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
            {
              dataAttendance.data ? Object.keys(dataAttendance.data).map((row, index) =>
              (
                <tr key={dataAttendance.data[row].id} className=" shadow ">
                  <td>{index + 1}</td>
                  <td>{dataAttendance.data[row].employee.name}</td>
                  <td>{dataAttendance.data[row].attendanceStatus.status}</td>
                  <td>{dataAttendance.data[row].typeInOut}</td>
                  <td>{dataAttendance.data[row].timeAttend}</td>
                  <td>
                  <div className="flex justify-center gap-2">
                  <ButtonSmall
                    bg="bg-blue-600"
                    icon="carbon:view"
                    colorIcon="text-white"
                    onClick={() => showModalDetail(dataAttendance.data[row].id)}
                  />
                  {/* <ButtonSmall
                    bg="bg-green-600"
                    icon="akar-icons:check"
                    onClick={() => setIsModalAccOpened(!isModalAccOpened)}
                  /> */}
                  <ModalAcc
                    isOpen={isModalAccOpened}
                    setIsOpen={setIsModalAccOpened}
                    title="Accept Request"
                  />
                  {/* <ButtonSmall
                    bg="bg-red-600"
                    icon="akar-icons:block"
                    onClick={() =>
                      setIsModalDeclineOpened(!isModalDeclineOpened)
                    }
                  /> */}
                  <ModalDecline
                    isOpen={isModalDeclineOpened}
                    setIsOpen={setIsModalDeclineOpened}
                    title="Decline Request"
                  />
                </div>
                  </td>
                </tr> 
              )) : <tr><td colSpan="5">Loading</td></tr>
            }              
            </tbody>
          </table>
        </div>
        {modalAttendance && (
          <ModalDetail
            isOpen={modalAttendance}
            setIsOpen={setModalAttendance}
            title="Detail Attendance"
            typeData="attendance"
            data={attendanceDetail}
          />
        )}
        <Pagination 
          activePage={dataAttendance.current_page ? dataAttendance.current_page : 0}
          itemsCountPerPage={dataAttendance?.per_page ? dataAttendance?.per_page : 0 }
          totalItemsCount={dataAttendance?.total ? dataAttendance?.total : 0}
          onChange={(pageNumber) => {
            fetchDataAttendance(pageNumber)
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

export default Attendance;
