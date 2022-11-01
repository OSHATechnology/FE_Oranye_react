import React, { useEffect, useState } from "react";
import ButtonSmall from "../../../Components/ButtonSmall";
import axios from "axios";
import ConfigHeader from "../../Auth/ConfigHeader";
import moment from "moment";
import ModalDetail from "../../../Components/Modal/ModalDetail";
import Search from "../../../Components/Search";
import Pagination from "react-js-pagination";

const Overtime = () => {
  const [dataOvertime, setDataOvertime] = useState([]);
  const [modalOvertime, setModalOvertime] = useState(false);
  const [overtimeDetail, setOvertimeDetail] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  let dataOvertimeId = "";
  const showModalDetail = async (overtimeId) => {
    dataOvertimeId = overtimeId;
    await fetchDataOvertimeDetail();
  };

  const fetchDataOvertimeDetail = async () => {
    const result = await axios.get(
      `/api/overtime/${dataOvertimeId}`,
      ConfigHeader
    );
    setOvertimeDetail(result.data.data);
    setModalOvertime(true);
  };

  const fetchDataOvertime = async (page = 1, search = "") => {
    const result = await axios.get(
      `/api/overtime?search=${search}&page=${page}`,
      ConfigHeader
    );
    setDataOvertime(result.data.data);
  };
  useEffect(() => {
    fetchDataOvertime().catch((err) => {
      console.log(err.message);
    });
  }, []);

  const handleSearch = (e) => {
    try {
      fetchDataOvertime(1, e.target.value);
      setSearchValue(e.target.value);
    } catch (err) {}
  };

  return (
    <div className="w-full space-y-4 pb-10">
      <div className="border rounded shadow p-2 space-y-2">
        <div className="md:flex justify-between items-center space-y-4 md:space-y-0">
          <div>
            <p className="text-xs md:text-sm font-medium text-slate-500">
              {moment().format("dddd, DD MMMM YYYY")} | Overtime
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
              <th>Hour</th>
              <th>Assigned By</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-base font-medium text-slate-700 md:text-sm">
            {dataOvertime.data ? (
              dataOvertime.data.map((row, index) => {
                return (
                  <tr key={row.id}>
                    <td>{parseInt(row) + 1}</td>
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        <img src={row.img} alt="" className="w-8" />
                        <span>{row.employeeId.name}</span>
                      </div>
                    </td>
                    <td className="w-2">
                      <span>
                        {Math.round(
                          moment
                            .duration(
                              moment(row.endAt, "YYYY/MM/DD HH:mm").diff(
                                moment(row.startAt, "YYYY/MM/DD HH:mm")
                              )
                            )
                            .asHours()
                        )}{" "}
                        hours
                      </span>
                      <span className="ml-2 text-xs font-thin text-slate-500">
                        ({moment(row.startAt).format("HH:mm")} -{" "}
                        {moment(row.endAt).format("HH:mm")})
                      </span>
                    </td>
                    <td>{row.assignedBy.name}</td>
                    <td>
                      <span>{row.status}</span>
                    </td>
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
        {modalOvertime && (
          <ModalDetail
            isOpen={modalOvertime}
            setIsOpen={setModalOvertime}
            title="Detail Overtime"
            typeData="overtime"
            data={overtimeDetail}
          />
        )}
        <Pagination
          activePage={
            dataOvertime?.current_page ? dataOvertime.current_page : 0
          }
          itemsCountPerPage={
            dataOvertime?.per_page ? dataOvertime?.per_page : 0
          }
          totalItemsCount={dataOvertime?.total ? dataOvertime?.total : 0}
          onChange={(pageNumber) => {
            fetchDataOvertime(pageNumber, searchValue);
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

export default Overtime;
