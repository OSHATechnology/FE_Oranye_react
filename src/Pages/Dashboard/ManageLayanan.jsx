import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ButtonNormal from "../../Components/ButtonNormal";
import ButtonSmall from "../../Components/ButtonSmall";
import Search from "../../Components/Search";
import SimpleCard from "../../Components/SimpleCard";
import TitleDashboard from "../../Components/TitleDashboard";
import ConfigHeader from "../Auth/ConfigHeader";

const ManageLayanan = () => {
  const paramsData = useParams();
  const [dataItem, setDataItem] = useState([]);

  const [dataInsurance, setDataInsurance] = useState([
    {
      insuranceId: "",
      name: "",
      companyName: "",
      address: "",
    },
  ]);

  // const fetchItemData = async () => {
  //   try {
  //     const res = await axios.get(`/api/insurance_item/${paramsData.id}`, ConfigHeader);
  //     setDataItem(res.data.data);
  //     // console.log(res.data.data)
  //   } catch (err) {
  //     console.log(err.response);
  //   }
  // };

  useEffect(() => {
    const fetchDataInsurance = async () => {
      const data = await axios.get(
        `/api/insurance/${paramsData.id}`,
        ConfigHeader
      );
      setDataInsurance(data.data.data);
      console.log(data.data.data)
      setDataItem(data.data.data.data)
      
    };
    fetchDataInsurance().catch((err) => {
      console.log(err.message);
    });
    // fetchItemData();
  }, [paramsData]);
  return (
    <div className="w-full md:mx-8 space-y-8">
      <TitleDashboard
        Title="Insurance Details"
        Keterangan="Detailed information of Insurance"
      />

      <div className="flex gap-2 items-center">
        <Link
          to="../insurance"
          className="flex gap-1 items-center text-blue-400 hover:text-blue-700 w-fit"
        >
          <Icon icon="bi:arrow-left" className="text-sm  font-medium"></Icon>
          <p className="text-sm  font-medium hover:font-bold">
            Back to Insurance
          </p>
        </Link>
        <p className="font-bold text-blue-800">|</p>

        <button>
          <p className="text-sm  font-medium hover:font-bold text-blue-400 hover:text-blue-700 w-fit">
            Manage This Insurance
          </p>
        </button>
      </div>

      <div className="border border-gray-100 rounded shadow  p-2 space-y-2">
        <div>
          <table className="text-sm font-semibold text-slate-600">
            <tbody>
              <tr>
                <td>Insurance Nama</td>
                <td className="px-3">:</td>
                <td>{dataInsurance.name}</td>
              </tr>
              <tr>
                <td>Company Name</td>
                <td className="px-3">:</td>
                <td>{dataInsurance.company}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td className="px-3">:</td>
                <td>{dataInsurance.address}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-16">
          <div className="justify-between items-center md:min-h-1/3 md:flex md:flex-row md:w-full">
            <div className="flex gap-4">
              <ButtonNormal bg="bg-green-600 " icon="bi:plus" text="Add" />
            </div>

            <Search />
          </div>
        </div>

        <div className="w-full">
          <table className="w-full text-center" id="tblMember">
            <thead className="bg-gray-100 h-10 border-b border-gray-400">
              <tr>
                <th>#</th>
                <th>Nama Layanan</th>
                <th>Type Layanan</th>
                <th>Persen</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td>1</td>
                <td>Layanan 1</td>
                <td>Layanan Kesehatan</td>
                <td>5%</td>
                <td>
                  <ButtonSmall bg="bg-red-500" icon="bi:trash" />
                </td>
              </tr> */}
              {/* {dataItem.map((item,index) => {
              {console.log(item)}
                <tr key={item.insItemId} className=" shadow ">
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.percent}</td>
                  <td>
                    <ButtonSmall bg="bg-red-500" icon="bi:trash" />
                  </td>
              </tr> 
              })} */}
              <tr>
                <td>asd</td>
              </tr>
              {
                dataInsurance.data ? (
                  Object.keys(dataInsurance.data)).map((row, index) => (
                  <tr key={dataInsurance.data[row].id} className=" shadow ">
                    <td>{index + 1}</td>
                    <td>{dataInsurance.data[row].name}</td>
                    <td>{dataInsurance.data[row].type}</td>
                    <td>{dataInsurance.data[row].percent}</td>
                    <td>
                  <ButtonSmall bg="bg-red-500" icon="bi:trash" />
                </td>
                  </tr> 
                )) : <tr><td colSpan="5">Loading</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageLayanan;
