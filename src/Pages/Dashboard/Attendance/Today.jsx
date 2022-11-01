import React, { useEffect, useState } from "react";
import ButtonSmall from "../../../Components/ButtonSmall";
import { Icon } from "@iconify/react";
import axios from "axios";
import ConfigHeader from "../../Auth/ConfigHeader";
import moment from "moment";
import ModalDetail from "../../../Components/Modal/ModalDetail";
import Search from "../../../Components/Search";
import Pagination from "react-js-pagination";

const Today = () => {
  const [dataToday, setDataToday] = useState([]);
  const [modalToday, setModalToday] = useState(false);
  const [todayDetail, setTodayDetail] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  let dataTodayId = "";
  const showModalDetail = async (todayId) => {
    dataTodayId = todayId;
    await fetchDataTodayDetail();
  };

  const fetchDataTodayDetail = async () => {
    const result = await axios.get(
      `/api/attendance/${dataTodayId}`,
      ConfigHeader
    );
    setTodayDetail(result.data.data);
    setModalToday(true);
  };

  const fetchDataToday = async (page = 1, search = "") => {
    const result = await axios.get(
      `/api/attendance/today?search=${search}&page=${page}`,
      ConfigHeader
    );
    setDataToday(result.data.data);
    console.log(result.data.data);
  };
  useEffect(() => {
    fetchDataToday().catch((err) => {
      console.log(err.message);
    });
  }, []);

  const handleSearch = (e) => {
    try {
      fetchDataToday(1, e.target.value);
      setSearchValue(e.target.value);
    } catch (err) {}
  };
  return (
    <div className="w-full space-y-4 pb-10">
      <div className="border rounded shadow p-2 space-y-2">
        <div className="md:flex  md:justify-between items-center space-y-4 md:space-y-0">
          <div>
            <p className="text-xs md:text-sm font-medium text-slate-500">
              {moment().format("dddd, DD MMMM YYYY")}
            </p>
          </div>
          <div className="flex gap-2 md:justify-end">
            <Search onChange={handleSearch} />
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
            {dataToday.data ? (
              dataToday.data.map((row, index) => {
                return (
                  <tr key={row.id}>
                    <td>{parseInt(row) + 1}</td>
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        <span>{row.employee.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center">
                        <Icon icon={row.icon} className="text-xl mr-1" />
                        <span>{row.attendanceStatus.status}</span>
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
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6}>Loading</td>
              </tr>
            )}
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
        <Pagination
          activePage={dataToday.current_page ? dataToday.current_page : 0}
          itemsCountPerPage={dataToday?.per_page ? dataToday?.per_page : 0}
          totalItemsCount={dataToday?.total ? dataToday?.total : 0}
          onChange={(pageNumber) => {
            fetchDataToday(pageNumber, searchValue);
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

export default Today;
