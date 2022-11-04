import TitleDashboard from "../../Components/TitleDashboard";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ConfigHeader from "../Auth/ConfigHeader";
import moment from "moment";
import { Icon } from "@iconify/react";
import ButtonNormal from "../../Components/ButtonNormal";
import { useNavigate } from "react-router-dom";

const EmployeeDetail = () => {
  const paramsData = useParams();
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
  // console.log(dataEmp);
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
      navigate("../emp");
    });
  }, [paramsData]);

  return (
    <div className="w-full md:mx-8 space-y-8">
      <TitleDashboard
        Title="Employee Details"
        Keterangan="Detailed information of employees"
      />
      <div>
        <Link
          to="../emp"
          className="flex gap-1 items-center text-blue-400 hover:text-blue-700 w-fit"
        >
          <Icon icon="bi:arrow-left" className="text-sm  font-medium"></Icon>
          <p className="text-sm  font-medium hover:font-bold">
            Back to Employee Management
          </p>
        </Link>
      </div>
      <div className="md:flex md:flex-row w-full">
        <div className="flex basis-1/4 items-center justify-center">
          <img src={dataEmp.photo} alt="" className="w-3/5 rounded-full" />
        </div>

        <div className="basis-3/4 m-4 text-center md:text-start">
          <div className="md:flex md:justify-between items-center">
            <div>
              <h3 className="text-2xl text-orange-500 font-extrabold">
                {dataEmp.name}
              </h3>
            </div>
            <div>
              <p className="text-xs text-gray-400">
                Joined at, {moment(dataEmp.joinedAt).format("DD MMMM YYYY")}
              </p>
            </div>
          </div>
          <h4 className="text-2xl">{dataEmp.employeeId}</h4>
          <table className="mt-6 text-start text-sm font-semibold text-slate-600">
            <tbody>
              <tr>
                <td>
                  <p className="text-sm">Status</p>
                </td>
                <td>
                  <p className="text-sm">:</p>
                </td>
                <td>
                  <p className={`text-sm text-orange-500`}>
                    {dataEmp.statusHire ? dataEmp.statusHire.status : ""}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-sm">Role</p>
                </td>
                <td>
                  <p className="text-sm">:</p>
                </td>
                <td>
                  <p className="text-sm">
                    {dataEmp.role ? dataEmp.role.role : ""}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gray-50 md:w-full border space-y-2 md:space-y-0 space rounded justify-content-center p-4">
        <div className="flex w-full justify-center md:justify-start">
          <h3 className="text-md md:text-xl font-extrabold text-center">
            Employee Information
          </h3>
        </div>
        <div className="md:flex justify-between space-y-2 md:space-y-0 items-center">
          <div className="md:flex text-sm font-medium text-slate-600   md:gap-16 ">
            <div>
              <div className=" ">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <p className="text-xs md:text-sm w-20 md:w-auto">
                          Name
                        </p>
                      </td>
                      <td>
                        <p className="text-xs md:text">:</p>
                      </td>
                      <td>
                        <p className="text-xs md:text">{dataEmp.name}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="text-xs md:text">Birth Date</p>
                      </td>
                      <td>
                        <p className="text-xs md:text">:</p>
                      </td>
                      <td>
                        <p className="text-xs md:text">
                          {moment(dataEmp.birthDate).format("DD MMMM YYYY")}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="text-xs md:text">Address</p>
                      </td>
                      <td>
                        <p className="text-xs md:text">:</p>
                      </td>
                      <td>
                        <p className="text-xs md:text">{dataEmp.address}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <p className="text-xs md:text w-20 md:w-auto">City</p>
                    </td>
                    <td>
                      <p className="text-xs md:text">:</p>
                    </td>
                    <td>
                      <p className="text-xs md:text">{dataEmp.city}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="text-xs md:text">Nation</p>
                    </td>
                    <td>
                      <p className="text-xs md:text">:</p>
                    </td>
                    <td>
                      <p className="text-xs md:text">{dataEmp.nation}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="text-xs md:text">Email</p>
                    </td>
                    <td>
                      <p className="text-xs md:text">:</p>
                    </td>
                    <td>
                      <p className="text-xs md:text">{dataEmp.email}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex gap-2 md:gap-0 md:flex-col md:space-y-1 justify-center ">
            <Link to={"Salary"}>
              <ButtonNormal
                bg="bg-slate-400 hover:bg-slate-600 "
                icon="healthicons:money-bag"
                text=""
                width="w-10"
              />
            </Link>
            <Link to={`family`}>
              <ButtonNormal
                bg="bg-slate-400 hover:bg-slate-600 "
                icon="ic:round-family-restroom"
                text=" "
                width="w-10"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
