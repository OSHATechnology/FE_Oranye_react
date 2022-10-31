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
import ModalManage from "../../Components/Modal/ManageSalaryByEmployee";

const Salary = (data) => {
  const paramsData = useParams();
  const [isModalManageOpened, setIsModalManageOpened] = useState(false);
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
    // console.log(data.data.data);
  };

  const fetchDataEmp = async () => {
    const data = await axios.get(
      `/api/employee/${paramsData.id}`,
      ConfigHeader
    );
    setDataEmp(data.data.data);
  };

  const refresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    fetchDataSalary();
    fetchDataEmp().catch((err) => {
      console.log(err.message);
      navigate("../emp");
    });
  }, []);
  // console.log(dataSalary);
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
        <p className="font-bold text-blue-800">|</p>
        <button onClick={() => setIsModalManageOpened(!isModalManageOpened)}>
          <p className="text-sm  font-medium hover:font-bold text-blue-400 hover:text-blue-700 w-fit">
            Manage Salary
          </p>
        </button>
        <ModalManage
          isOpen={isModalManageOpened}
          setIsOpen={setIsModalManageOpened}
          title="Manage Salary Employee"
          data={dataSalary}
          action={refresh}
        />
      </div>

      <SimpleCard Title="Employee Name" Count={dataEmp.name} />

      <div className="flex justify-center border border-gray-100 rounded shadow p-2 ">
        <div className="items-start min-w-screen md:flex md:flex-row w-full ">
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
              {dataSalary ? (
                dataSalary.length > 0 ? (
                  dataSalary.map((item, index) => (
                    <tr key={dataSalary.id}>
                      <td>{index + 1}</td>
                      <td>
                        {item.salary_date &&
                          moment(item.salary_date).format("DD MMMM YYYY")}
                      </td>
                      <td>
                        <RupiahMoneyFormat num={item.gross} />
                      </td>
                      <td>
                        <RupiahMoneyFormat num={item.total_deduction} />
                      </td>
                      <td>
                        <RupiahMoneyFormat num={item.net} />
                      </td>
                      <td>
                        <div className="flex justify-center gap-1">
                          <Link to={`../DetailSalary/${item.id}`}>
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
                )
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
  );
};

export default Salary;
