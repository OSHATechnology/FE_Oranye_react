import React, { Fragment, useEffect, useState } from "react";
import ButtonSmall from "../../../Components/ButtonSmall";
import { Icon } from "@iconify/react";
import ModalDecline from "../../../Components/Modal/ModalDecline";
import ModalAcc from "../../../Components/Modal/ModalAccept";
import axios from "axios";
import ConfigHeader from "../../Auth/ConfigHeader";
import ModalDetail from "../../../Components/Modal/ModalDetail";
import Search from "../../../Components/Search";
import Pagination from "react-js-pagination";
import { Menu, Transition } from "@headlessui/react";
import moment from "moment/moment";

const Attendance = () => {
  const [isModalAccOpened, setIsModalAccOpened] = useState(false);
  const [isModalDeclineOpened, setIsModalDeclineOpened] = useState(false);
  const [dataAttendance, setDataAttendance] = useState([]);
  const [dataOvertime, setDataOvertime] = useState([]);
  const [customDate, setCustomDate] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [datesFilter, setDatesFilter] = useState([]);

  const [modalAttendance, setModalAttendance] = useState(false);
  const [attendanceDetail, setAttendanceDetail] = useState([]);

  let dataAttendanceId = "";
  const showModalDetail = async (attendanceId) => {
    dataAttendanceId = attendanceId;
    await fetchDataAttendanceDetail();
  };

  const filterMenu = [
    { label: "all", checked: true, value: "all" },
    {
      label: "yesterday",
      checked: false,
      value: moment().subtract(1, "days").format("YYYY-MM-DD"),
    },
    {
      label: "last week",
      checked: false,
      value: moment().subtract(7, "days").format("YYYY-MM-DD"),
    },
    {
      label: "last month",
      checked: false,
      value: moment().subtract(1, "months").format("YYYY-MM-DD"),
    },
  ];

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

  const fetchDataAttendance = async (
    page = 1,
    search = "",
    filter = isFiltered,
    date = datesFilter
  ) => {
    try {
      let endpoint;
      if (filter) {
        const arrayDates = date;
        const start = arrayDates[0]
          ? arrayDates[0]
          : moment().format("YYYY-MM-DD");
        const end = arrayDates[1]
          ? arrayDates[1]
          : moment().format("YYYY-MM-DD");
        endpoint = `/api/attendance?page=${page}&search=${search}&start=${start}&end=${end}`;
      } else {
        endpoint = `/api/attendance?page=${page}&search=${search}`;
      }
      const result = await axios.get(endpoint, ConfigHeader);
      setDataAttendance(result.data.data);
      console.log(result.data.data);
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
      fetchDataAttendance(1, e.target.value, isFiltered, datesFilter);
      setSearchValue(e.target.value);
    } catch (err) {}
  };

  const handleFilter = (e) => {
    filterMenu.forEach((item) => {
      if (item.label === e.target.value) {
        item.checked = true;
        if (e.target.value === "all") {
          setIsFiltered(false);
          setDatesFilter([]);
          fetchDataAttendance(1, "", false);
        } else {
          setIsFiltered(true);
          setDatesFilter([item.value, moment().format("YYYY-MM-DD")]);
          fetchDataAttendance(1, "", true, [
            item.value,
            moment().format("YYYY-MM-DD"),
          ]);
        }

        e.target.checked = true;
      } else {
        item.checked = false;
      }
    });
  };

  const handleCustomDate = async (e) => {
    try {
      filterMenu.forEach((item) => {
        item.checked = false;
      });
      setIsFiltered(true);
      setDatesFilter([
        moment(e.target.value).startOf("month").format("YYYY-MM-DD"),
        moment(e.target.value).endOf("month").format("YYYY-MM-DD"),
      ]);
      setCustomDate(e.target.value);
      fetchDataAttendance(1, "", true, [
        moment(e.target.value).startOf("month").format("YYYY-MM-DD"),
        moment(e.target.value).endOf("month").format("YYYY-MM-DD"),
      ]);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  return (
    <div className="w-full space-y-4 pb-10">
      <div className="border rounded shadow p-2 space-y-2">
        <div className="flex  justify-between">
          <Menu as="div" className="relative inline-block text-left">
            {({ open }) => (
              <>
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
                  show={open}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    className="absolute left-0 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    static
                  >
                    <div className="px-1 py-1 space-y-2">
                      {filterMenu.map((item, index) => (
                        <Menu.Item>
                          <div className=" flex items-center px-2 hover:bg-gray-100">
                            <input
                              type="radio"
                              id={"opt" + index}
                              className="w-2.5 h-2.5"
                              defaultChecked={item.checked}
                              value={item.label}
                              onClick={handleFilter}
                            />
                            <label
                              className="font-semibold text-gray-600 text-sm px-2"
                              htmlFor={"opt" + index}
                            >
                              {item.label}
                            </label>
                          </div>
                        </Menu.Item>
                      ))}
                    </div>
                    <div className="px-1 py-1 ">
                      <Menu.Item disabled>
                        <div className="px-2 flex items-center gap-2">
                          <label
                            htmlFor="customDate"
                            className="text-xs font-semibold"
                          >
                            Custom:{" "}
                          </label>
                          <input
                            type="month"
                            name=""
                            id="customDate"
                            className="h-6 rounded border border-gray-400 text-xs text-gray-600"
                            value={customDate}
                            max={moment().format("YYYY-MM")}
                            onChange={handleCustomDate}
                          />
                        </div>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
          <Search onChange={handleSearch} />
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
              {dataAttendance.data ? (
                Object.keys(dataAttendance.data).map((row, index) => (
                  <tr key={dataAttendance.data[row].id} className=" shadow ">
                    <td>{parseInt(row) + 1}</td>
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
                          onClick={() =>
                            showModalDetail(dataAttendance.data[row].id)
                          }
                        />
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
          activePage={
            dataAttendance.current_page ? dataAttendance.current_page : 0
          }
          itemsCountPerPage={
            dataAttendance?.per_page ? dataAttendance?.per_page : 0
          }
          totalItemsCount={dataAttendance?.total ? dataAttendance?.total : 0}
          onChange={(pageNumber) => {
            fetchDataAttendance(
              pageNumber,
              searchValue,
              isFiltered,
              datesFilter
            );
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
