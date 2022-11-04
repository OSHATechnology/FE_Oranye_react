import React, { useEffect, useState } from "react";
import ButtonSmall from "../../../Components/ButtonSmall";
import SimpleCard from "../../../Components/SimpleCard";
import ModalDecline from "../../../Components/Modal/ModalDecline";
import ModalAcc from "../../../Components/Modal/ModalAccept";
import axios from "axios";
import ConfigHeader from "../../Auth/ConfigHeader";
import Search from "../../../Components/Search";
import Pagination from "react-js-pagination";
import moment from "moment/moment";

const LeaveRequest = () => {
  const [isModalAccOpened, setIsModalAccOpened] = useState(false);
  const [isModalDeclineOpened, setIsModalDeclineOpened] = useState(false);
  const [dataRequest, setDataRequest] = useState([]);
  const [confirmData, setConfirmData] = useState({ id: "", type: "" });
  const [declineData, setDeclineData] = useState({ id: "", type: "" });
  const [searchValue, setSearchValue] = useState("");

  const fetchDataRequest = async (page = 1, search = "") => {
    try {
      const result = await axios.get(`/api/leave-requests?search=${search}&page=${page}`, ConfigHeader);
      setDataRequest(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    try {
      fetchDataRequest(1, e.target.value);
      setSearchValue(e.target.value);
    } catch (err) { }
  };

  const handleAcceptRequest = async (id, type) => {
    try {
      setConfirmData({ id, type });
      setIsModalAccOpened(true);
    } catch (err) { }
  };

  const handleDeclineRequest = async (id, type) => {
    try {
      setDeclineData({ id, type });
      setIsModalDeclineOpened(true);
    } catch (err) { }
  };

  useEffect(() => {
    fetchDataRequest();
  }, []);

  return (
    <div className="w-full space-y-4 pb-10">
      <div className="md:flex  md:gap-8 space-y-4 md:space-y-0">
        <SimpleCard
          bgColor=""
          Title="Request"
          Icon="fluent:mail-20-filled"
          Count={dataRequest?.total ? dataRequest?.total : 0}
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
                <th rowSpan="2">Employee</th>
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
              {dataRequest.data ? (
                Object.keys(dataRequest.data).map((row, index) => (
                  <tr key={index} className=" shadow ">
                    <td>{parseInt(row) + 1}</td>
                    <td>
                      <div className="flex flex-col text-start">
                        {dataRequest.data[row].employee ? (
                          <>
                            <span className="text-gray-500 font-bold">
                              {dataRequest.data[row].employee.id}
                            </span>
                            <span className="">
                              {dataRequest.data[row].employee.name}
                            </span>
                            <span className="font-thin">
                              {dataRequest.data[row].employee.role}
                            </span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold">-</span>
                        )}
                      </div>
                    </td>
                    <td>{dataRequest.data[row].type}</td>
                    <td>{dataRequest.data[row].startAt}</td>
                    <td>{dataRequest.data[row].endAt}</td>
                    <td>{dataRequest.data[row].requestAt ? moment(dataRequest.data[row].requestAt).format("H:m DD-MM-YYYY") : "-"}</td>
                    <td>
                      <div className="flex justify-center gap-2">
                        <ButtonSmall
                          bg="bg-green-600"
                          icon="akar-icons:check"
                          onClick={() => {
                            handleAcceptRequest(dataRequest.data[row].id, dataRequest.data[row].type)
                          }}
                        />

                        <ButtonSmall
                          bg="bg-red-600"
                          icon="akar-icons:block"
                          onClick={() => handleDeclineRequest(dataRequest.data[row].id, dataRequest.data[row].type)}
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
        <ModalAcc
          isOpen={isModalAccOpened}
          setIsOpen={setIsModalAccOpened}
          title="Accept Request"
          data={confirmData}
          action={fetchDataRequest}
        />
        <ModalDecline
          isOpen={isModalDeclineOpened}
          setIsOpen={setIsModalDeclineOpened}
          title="Decline Request"
          data={declineData}
          action={fetchDataRequest}
        />
        <Pagination
          activePage={
            dataRequest.current_page ? dataRequest.current_page : 0
          }
          itemsCountPerPage={
            dataRequest?.per_page ? dataRequest?.per_page : 0
          }
          totalItemsCount={dataRequest?.total ? dataRequest?.total : 0}
          onChange={(pageNumber) => {
            fetchDataRequest(pageNumber, searchValue);
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
