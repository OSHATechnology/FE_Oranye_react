import axios from "axios";
import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import ButtonNormal from "../../Components/ButtonNormal";
import Search from "../../Components/Search";
import TitleDashboard from "../../Components/TitleDashboard";
import ConfigHeader from "../Auth/ConfigHeader";

const Insurance = () => {
  const [dataInsurance, setDataInsurance] = useState([]);

  const fetchDataInsurance = async (page = 1, search = "") => {
    const result = await axios.get(
      `/api/insurance?search=${search}&page=${page}`,
      ConfigHeader
    );
    setDataInsurance(result.data.data);
  };

  useEffect(() => {
    fetchDataInsurance();
  }, []);

  const handleSearch = (e) => {
    try {
      fetchDataInsurance(1, e.target.value);
    } catch (err) {}
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
              <ButtonNormal bg="bg-green-600 " icon="bi:plus" text="Add" />
            </div>

            <Search onChange={handleSearch}/>
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
                    Name
                  </th>
                  <th rowSpan={2} className="border">
                    Name PT
                  </th>
                  <th rowSpan={2} className="border">
                    Address
                  </th>

                  <th colSpan={3} className="border">
                    Layanan Asuransi
                  </th>

                  <th rowSpan={2} className="border">
                    Action
                  </th>
                </tr>
                <tr>
                  <th className="border">Nama Layanan</th>
                  <th className="border">Type Layanan</th>
                  <th className="border">Persen</th>
                </tr>
              </thead>
              <tbody className="text-xs md:text-xs font-medium">
                {dataInsurance.data ? (
                  Object.keys(dataInsurance.data).map((row, index) => (
                    <tr key={dataInsurance.data[row].insuranceId}>
                      <td>{index + 1}</td>
                      <td>{dataInsurance.data[row].name}</td>
                      <td>{dataInsurance.data[row].company}</td>
                      <td className="w-80">
                        <p className=" text-start flex-wrap">
                          {dataInsurance.data[row].address}
                        </p>
                      </td>
                      <td>
                        <ul className="list-none">
                          <li>Layanan 1</li>
                          <li>Layanan 2</li>
                        </ul>
                      </td>
                      <td>
                        <ul>
                          <li>Layanan Kesehatan</li>
                          <li>Layanan Kesehatan</li>
                        </ul>
                      </td>
                      <td>
                        <ul>
                          <li>5%</li>
                          <li>5%</li>
                        </ul>
                      </td>
                      <td className="w-24">
                        <div>
                          <Link to={`../manageInsurance`}>
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
                )}
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
