import { Icon } from '@iconify/react'
import axios from 'axios';
import moment from 'moment'
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import ButtonSmall from '../../Components/ButtonSmall'
import SimpleCard from '../../Components/SimpleCard';
import TitleDashboard from '../../Components/TitleDashboard'
import ConfigHeader from '../Auth/ConfigHeader';

const Salary = (data) => {
  const paramsData = useParams();
  const [dataSalary, setDataSalary] = useState([]);
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

  const fetchDataSalary = async () => {
    const data = await axios.get(
      `/api/salary?empId=${paramsData.id}&type=net`,
      ConfigHeader
    );
    setDataSalary(data.data.data);
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
    fetchDataSalary();
  }, [paramsData]);
console.log(dataSalary);


  return (
    <div className="w-full md:mx-8 space-y-8">
        <TitleDashboard
        Title="Salary from Employee"
        Keterangan="Information about salary from Employee"
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

      <SimpleCard 
      Title="Employee Name"
      Count={dataEmp.name}
      />

      <div className="flex justify-center border border-gray-100 rounded shadow">
        <div className="items-start min-w-screen md:flex md:flex-row md:w-full ">
          
          <table className=" w-full text-center overflow-x-scroll">
            <thead className="bg-gray-100 border-b-2 border-gray-800 text-xs md:text-sm">
              <tr className="">
                <th className=" py-2">No</th>
                <th className="">Payday</th>
                <th className="">Gross Salary</th>
                <th className="">Salary Deduction</th>
                <th className="">Net Salary</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs md:text-sm font-medium">
              <tr>
                <td>1</td>
                <td>{moment().format("MMMM YYYY")}</td>
                <td>12.000.000</td>
                <td>12.000.000</td>
                <td>12.000.000</td>
                <td>
                <div className="flex justify-center gap-1">
                      <Link to={"DetailSalary"}>
                    <ButtonSmall
                      bg="bg-blue-600"
                      icon="carbon:view"
                      colorIcon="text-white"
                      />
                      </Link>
                    </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      </div>
  )
}

export default Salary