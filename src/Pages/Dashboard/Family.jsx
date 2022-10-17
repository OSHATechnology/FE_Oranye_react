import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ButtonNormal from "../../Components/ButtonNormal";
import ButtonSmall from "../../Components/ButtonSmall";
import TitleDashboard from "../../Components/TitleDashboard";
import ConfigHeader from "../Auth/ConfigHeader";
import ModalAdd from "../../Components/Modal/ModalAddFamily";

const Family = (data) => {
  const paramsData = useParams();
  const [dataFamily, setDataFamily] = useState([]);
  const [dataEmp, setDataEmp] = useState([
    {
      employeeId: "",
      name: "",
      photo: "",
      birthDate: "",
      gender: "",
      role: "",
      email: "",
      phone: "",
      address: "",
      isActive: "",
      emailVerifiedAt: "",
      joinedAt: "",
      resignedAt: "",
      statusHire: {
        id: "",
        status: "",
      },
    },
  ]);

  const fetchDataFamily = async () => {
    const data = await axios.get(
      `/api/employee_family?empId=${paramsData.id}`,
      ConfigHeader
    );
    setDataFamily(data.data.data);
  };

  useEffect(() => {
    const fetchDataEmp = async () => {
      const data = await axios.get(
        `/api/employee/${paramsData.id}`,
        ConfigHeader
      );
      setDataEmp(data.data.data);
    };

    fetchDataEmp().catch((err) => {
      console.log(err.message);
    });
    fetchDataFamily();
  }, [paramsData]);

 // Add Allowance
 const [isModalAddOpened, setIsModalAddOpened] = useState(false);
// console.log(data);

  // console.log(dataFamily);
  return (
    <div className="w-full md:mx-8 space-y-8">
      <TitleDashboard
        Title="Family from Employee"
        Keterangan="Information about family from family"
      />

      <div className="flex gap-2 items-center">
        <Link
          to={`../emp/${dataEmp.employeeId}`}
          className="flex gap-1 items-center text-blue-400 hover:text-blue-700 w-fit"
        >
          <Icon icon="bi:arrow-left" className="text-sm  font-medium"></Icon>
          <p className="text-sm  font-medium hover:font-bold">
            Back to Dashboard Employee
          </p>
        </Link>
      </div>

      <div>
        <table className="text-sm font-semibold text-slate-600">
          <tbody>
            <tr>
              <td>Nama</td>
              <td className="px-3">:</td>
              <td>{dataEmp.name}</td>
            </tr>
            <tr>
              <td>Banyak Keluarga</td>
              <td className="px-3">:</td>
              <td>5 Orang</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="space-y-2 p-2 border border-gray-100 shadow">
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
            title="Add Family"
            data={dataEmp}
            action={fetchDataFamily}
          />
        </div>

        <div className="flex justify-center">
          <div className="items-start min-w-screen md:flex md:flex-row md:w-full ">
            <table className=" w-full text-center overflow-x-scroll">
              <thead className="bg-gray-100 border-b-2 border-gray-800 text-xs md:text-sm">
                <tr className="">
                  <th className=" py-2">No</th>
                  <th className="">Identity Number</th>
                  <th className="">Name</th>
                  <th className="">Status</th>
                  <th className="">isAlive</th>
                  {/* <th className="">Action</th> */}
                </tr>
              </thead>
              <tbody className="text-xs md:text-sm font-medium">
                {dataFamily.data ? (
                  Object.keys(dataFamily.data).map((row, index) => (
                    <tr key={dataFamily.data[row].id}>
                      <td>{index + 1}</td>
                      <td>{dataFamily.data[row].identityNumber}</td>
                      <td>{dataFamily.data[row].name}</td>
                      <td>{dataFamily.data[row].status.status}</td>
                      <td>{dataFamily.data[row].isAlive}</td>
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
      </div>
    </div>
  );
};

export default Family;
