import axios from "axios";
import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import ButtonNormal from "../../Components/ButtonNormal";
import Search from "../../Components/Search";
import TitleDashboard from "../../Components/TitleDashboard";
import ConfigHeader from "../Auth/ConfigHeader";
import ModalAdd from "../../Components/Modal/AddInsurance";

// const fecthListItem = async (insuranceId) => {
//   const response = await axios.get(
//     "api/insurance_item?insuranceId=" + insuranceId,
//     ConfigHeader
//   );
//   return response.data;
// };

const Insurance = (data) => {
  const [isModalAddOpened, setIsModalAddOpened] = useState(false);
  const [dataInsurance, setDataInsurance] = useState([]);
  const [listItem, setListItem] = useState([]);
  const fetchDataInsurance = async (page = 1, search = "") => {
    const result = await axios.get(
      `/api/insurance?search=${search}&page=${page}`,
      ConfigHeader
    );
    setDataInsurance(result.data.data);
  };

  useEffect(() => {
    fetchDataInsurance();
    // data.insuranceId !== undefined &&
    //   fecthListItem(data.insuranceId).then((data) => {});
  }, [data.insuranceId]);

  const handleSearch = (e) => {
    try {
      fetchDataInsurance(1, e.target.value);
    } catch (err) { }
  };

  console.log(dataInsurance);
  return (
    <div className="w-full md:mx-8 space-y-8">
      <TitleDashboard
        Title="Dashboard Insurance"
        Keterangan="Manage Insurance PT.OSHA Technology"
      />
      <div className="pace-y-2 border rounded shadow p-2">
        <div className="flex justify-center">
          <div className="justify-between items-center md:min-h-1/3 md:flex md:flex-row md:w-full">
            <div className="flex gap-4">
              <ButtonNormal
                bg="bg-green-600 "
                icon="bi:plus"
                text="Add"
                onClick={() => setIsModalAddOpened(!isModalAddOpened)}
              />
              <ModalAdd
                isOpen={isModalAddOpened}
                setIsOpen={setIsModalAddOpened}
                title="Add New Team"
                action={fetchDataInsurance}
              />
            </div>

            <Search onChange={handleSearch} />
          </div>
        </div>

        <div className="flex justify-center mt-2">
          <div className="items-start min-w-screen md:flex md:flex-row md:w-full ">
            <table className=" w-full text-center overflow-x-scroll rounded ">
              <thead className="bg-slate-100 border-b-2 border-slate-600 text-xs md:text-sm">
                <tr className="">
                  <th rowSpan={2} className=" py-2 border">
                    No
                  </th>
                  <th rowSpan={2} className="border">
                    Insurance Name
                  </th>
                  <th rowSpan={2} className="border">
                    Company Name
                  </th>
                  <th rowSpan={2} className="border">
                    Address
                  </th>

                  <th colSpan={3} className="border">
                    Insurance Service
                  </th>

                  <th rowSpan={2} className="border">
                    Action
                  </th>
                </tr>
                <tr>
                  <th className="border">Service Name</th>
                  <th className="border">Service Type</th>
                  <th className="border">Percen</th>
                </tr>
              </thead>
              <tbody className="text-xs md:text-xs font-medium">
                {
                  dataInsurance.data ? (
                    Object.keys(dataInsurance.data).map((item, index) => {
                      data = dataInsurance.data[item];
                      let colSpan = dataInsurance.data[item].data ? dataInsurance.data[item].data.length : 1;


                      let dataItem = dataInsurance.data[item].data ? dataInsurance.data[item].data : [];
                      return (
                        <>
                          <tr key={index} className='border border-gray-200'>
                            <td rowSpan={colSpan}>{index + 1}</td>
                            <td rowSpan={colSpan}>{data.name}</td>
                            <td rowSpan={colSpan}>{data.company}</td>
                            <td className="w-80" rowSpan={colSpan}>
                              <div className=" text-start flex-wrap">
                                {data.address}
                              </div>
                            </td>
                            {dataItem.length > 0 ? (
                              <>
                                <td className="text-start">{dataItem[0].name}</td>
                                <td>{dataItem[0].type}</td>
                                <td>{dataItem[0].percent}%</td>
                              </>
                            ) : (
                              <td colSpan={3}>-</td>
                            )}
                            <td className="w-24" rowSpan={colSpan}>
                              <div className="flex justify-center gap-1">
                                <Link
                                  to={`../manageInsurance/${data.id}`}
                                >
                                  <span className="text-white bg-slate-600 rounded p-1">
                                    Manage
                                  </span>
                                </Link>
                              </div>
                            </td>
                          </tr>
                          {dataItem.map((item, index) => {
                            if (index !== 0) {
                              return (
                                <tr key={index} className="border border-gray-200">
                                  <td className="text-start">{item.name}</td>
                                  <td>{item.type}</td>
                                  <td>{item.percent}%</td>
                                </tr>
                              );
                            }
                          })}
                        </>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan={8}>No Data</td>
                    </tr>
                  )
                }
                {/* {dataInsurance.data ? (
                  Object.keys(dataInsurance.data).map((row, index) => (
                    <tr
                      key={dataInsurance.data[row].id}
                      className="border-b border-gray-200"
                    >
                      <td>{index + 1}</td>
                      <td>{dataInsurance.data[row].name}</td>
                      <td>{dataInsurance.data[row].company}</td>
                      <td className="w-80">
                        <p className=" text-start flex-wrap">
                          {dataInsurance.data[row].address}
                        </p>
                      </td>
                      <td>
                        <ul className="list-disc px-6 text-start ">
                          {dataInsurance?.data[row]?.data
                            ? Object.keys(dataInsurance.data[row].data).map(
                              (key1, index1) => {
                                return (
                                  <li key={index1}>
                                    {dataInsurance.data[row].data[key1].name}
                                  </li>
                                );
                              }
                            )
                            : null}
                        </ul>
                      </td>
                      <td>
                        <ul className=" px-6 text-start">
                          {dataInsurance?.data[row]?.data
                            ? Object.keys(dataInsurance.data[row].data).map(
                              (key1, index1) => {
                                return (
                                  <li key={index1}>
                                    {dataInsurance.data[row].data[key1].type}
                                  </li>
                                );
                              }
                            )
                            : null}
                        </ul>
                      </td>
                      <td>
                        <ul className=" px-6 ">
                          {dataInsurance?.data[row]?.data
                            ? Object.keys(dataInsurance.data[row].data).map(
                              (key1, index1) => {
                                return (
                                  <li key={index1}>
                                    {
                                      dataInsurance.data[row].data[key1]
                                        .percent
                                    }
                                  </li>
                                );
                              }
                            )
                            : null}
                        </ul>
                      </td>
                      <td className="w-24">
                        <div className="flex justify-center gap-1">
                          <Link
                            to={`../manageInsurance/${dataInsurance.data[row].id}`}
                          >
                            <span className="text-white bg-slate-600 rounded p-1">
                              Manage
                            </span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Loading</td>
                  </tr>
                )} */}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination
          activePage={
            dataInsurance.current_page ? dataInsurance.current_page : 0
          }
          itemsCountPerPage={
            dataInsurance?.per_page ? dataInsurance?.per_page : 0
          }
          totalItemsCount={dataInsurance?.total ? dataInsurance?.total : 0}
          onChange={(pageNumber) => {
            fetchDataInsurance(pageNumber);
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

export default Insurance;
