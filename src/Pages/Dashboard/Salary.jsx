import { Icon } from "@iconify/react";
import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ButtonSmall from "../../Components/ButtonSmall";
import RupiahMoneyFormat from "../../Components/RupiahMoneyFormat";
import SimpleCard from "../../Components/SimpleCard";
import TitleDashboard from "../../Components/TitleDashboard";
import ConfigHeader from "../Auth/ConfigHeader";
import { useNavigate } from "react-router-dom";

const Salary = (data) => {
  const paramsData = useParams();
  const [dataSalary, setDataSalary] = useState([]);
  const navigate = useNavigate();
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
      `/api/salary/employee/${paramsData.id}`,
      ConfigHeader
    );
    setDataSalary(data.data.data);
    console.log(data.data.data);
  };

  const fetchDataEmp = async () => {
    const data = await axios.get(
      `/api/employee/${paramsData.id}`,
      ConfigHeader
    );
    setDataEmp(data.data.data);
  };

  useEffect(() => {
    fetchDataSalary();
    fetchDataEmp().catch((err) => {
      console.log(err.message);
      navigate('../emp');
    });
  }, []);

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

      <SimpleCard Title="Employee Name" Count={dataEmp.name} />

      <div className="flex justify-center border border-gray-100 rounded shadow p-2">
        <div className="items-start min-w-screen md:flex md:flex-row md:w-full ">
          <table className=" w-full text-center overflow-x-scroll">
            <thead className="bg-gray-100 border-b-2 border-gray-800 text-xs md:text-sm">
              <tr className="">
                <th className=" py-2">No</th>
                <th className="">Payroll Date</th>
                <th className="">Gross Salary</th>
                <th className="">Salary Deduction</th>
                <th className="">Net Salary</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs md:text-sm font-medium">
              {
                dataSalary ?
                  dataSalary.length > 0 ? (
                    dataSalary.map((item, index) => (
                      <tr key={dataSalary.id}>
                        <td>{index + 1}</td>
                        <td>
                          {item.salary_date && (
                            moment(item.salary_date).format(
                              "DD MMMM YYYY"
                            )
                          )}
                        </td>
                        <td>
                          <RupiahMoneyFormat num={item.gross} />
                        </td>
                        <td>
                          <RupiahMoneyFormat num={0} />
                        </td>
                        <td>
                          <RupiahMoneyFormat num={0} />
                        </td>
                        <td>
                          <div className="flex justify-center gap-1">
                            <Link to={`DetailSalary`}>
                              <ButtonSmall
                                bg="bg-blue-600"
                                icon="carbon:view"
                                colorIcon="text-white"
                              />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-2">
                        No Data
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan="5">Loading</td>
                    </tr>
                  )
              }
              {/* {dataSalary.data ? (
                Object.keys(dataSalary.data).map((row, index) => (
                  <tr key={dataSalary.data[row].id}>
                    <td>{index + 1}</td>
                    <td>
                      {moment(dataSalary.data[row].salaryDate).format(
                        "DD MMMM YYYY"
                      )}
                    </td>
                    <td>
                      <RupiahMoneyFormat num={dataSalary.data[row].gross} />
                    </td>
                    <td>
                      <RupiahMoneyFormat num={0} />
                    </td>
                    <td>
                      <RupiahMoneyFormat num={0} />
                    </td>
                     <td>
                      <div className="flex justify-center gap-1">
                      <Link to={`DetailSalary/${dataSalary.data[row].id}`}>
                          <ButtonSmall
                            bg="bg-blue-600"
                            icon="carbon:view"
                            colorIcon="text-white"
                          />
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
              {/* <tr>
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
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Salary;
