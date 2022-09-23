import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ButtonNormal from "../../Components/ButtonNormal";
import ButtonSmall from "../../Components/ButtonSmall";
import SimpleCard from "../../Components/SimpleCard";
import TitleDashboard from "../../Components/TitleDashboard";
import ModalDelete from "../../Components/Modal/ModalDelete";
import ModalAdd from "../../Components/Modal/MemberAdd";
import ModalManage from "../../Components/Modal/ManageTeam";
import axios from "axios";
import ConfigHeader from "../Auth/ConfigHeader";
import moment from "moment";
import { Icon } from "@iconify/react";

const TeamMembers = () => {
  const [isModalAddOpened, setIsModalAddOpened] = useState(false);
  const [isModalManageOpened, setIsModalManageOpened] = useState(false);
  const paramsData = useParams();

  const [dataMember, setDataMember] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/team_member?teamid=${paramsData.id}`, ConfigHeader)
      .then((res) => {
        setDataMember(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [paramsData]);

  const [isModalDeleteOpened, setIsModalDeleteOpened] = useState(false);
  const [dataTeam, setDataTeam] = useState([
    {
      id: "",
      name: "",
      leadBy: {
        id: "",
        employee: "",
      },
      createdBy: {
        id: "",
        employee: "",
      },
    },
  ]);

  useEffect(() => {
    const fetchDataTeam = async () => {
      const data = await axios.get(`/api/team/${paramsData.id}`, ConfigHeader);
      setDataTeam(data.data.data);
    };

    fetchDataTeam().catch((err) => {
      console.log(err.message);
    });
  }, [paramsData]);
  return (
    <div className="w-full md:mx-8 space-y-8">
      <TitleDashboard
        Title="Team Details"
        Keterangan="Detailed information of team"
      />
      <div className="flex gap-2 items-center">
        <Link
          to="../team"
          className="flex gap-1 items-center text-blue-400 hover:text-blue-700 w-fit"
        >
          <Icon icon="bi:arrow-left" className="text-sm  font-medium"></Icon>
          <p className="text-sm  font-medium hover:font-bold">Back to Team Management</p>
        </Link>
        <p className="font-bold text-blue-800">|</p>
        {/* <Link to="../team"> */}
        <button onClick={() => setIsModalManageOpened(!isModalManageOpened)}>
          <p className="text-sm  font-medium hover:font-bold text-blue-400 hover:text-blue-700 w-fit">
            Manage This Team
          </p>
        </button>
        <ModalManage
          isOpen={isModalManageOpened}
          setIsOpen={setIsModalManageOpened}
          title="Manage This Team"
        />
        {/* </Link> */}
      </div>

      <div className="flex gap-2">
        <SimpleCard
          bgColor="bg-gray-100 hover:bg-gray-200"
          Title="Team Name"
          Icon=""
          Count={dataTeam.name}
        />
        <SimpleCard
          bgColor="bg-gray-100 hover:bg-gray-200"
          Title="Leader Team"
          Icon=""
          Count={dataTeam.leadBy ? dataTeam.leadBy.employee : ""}
        />
        <SimpleCard
          bgColor="bg-gray-100 hover:bg-gray-200"
          Title="Team Maker"
          Icon=""
          Count={dataTeam.createdBy ? dataTeam.createdBy.employee : ""}
        />
      </div>

      <div>
        <div className="justify-between items-center md:min-h-1/3 md:flex md:flex-row md:w-full mb-2">
          <div className="">
            <ButtonNormal
              bg="bg-green-600 "
              text="Add Member"
              icon="bi:plus"
              onClick={() => setIsModalAddOpened(!isModalAddOpened)}
            />
            <ModalAdd
              isOpen={isModalAddOpened}
              setIsOpen={setIsModalAddOpened}
              title="Add Member"
              data={dataTeam}
            />
          </div>
          <div className="flex space-x-2 items-center">
            <input
              type="text"
              placeholder="Search"
              className="rounded border border-gray-300 h-9 text-center w-72"
            />
            <ButtonSmall
              bg="bg-gray-400"
              icon="akar-icons:search"
              colorIcon="text-white"
            />
          </div>
        </div>
        <div className="w-full">
          <table className="w-full text-center">
            <thead className="bg-gray-100 h-10 border-b border-gray-400">
              <tr>
                <th>#</th>
                <th>Member Name</th>
                <th>Assign By</th>
                <th>Join At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-xs md:text-sm font-medium">
              {dataMember.map((row, index) => (
                <tr key={row.id} className=" shadow ">
                  <td>{index + 1}</td>
                  <td>{row.employee.name}</td>
                  <td>{row.assignedBy.name}</td>
                  <td>{moment(row.joinedAt).format("DD MMMM YYYY")}</td>
                  <td>
                    <ButtonSmall
                      bg="bg-red-500"
                      icon="bi:trash"
                      onClick={() =>
                        setIsModalDeleteOpened(!isModalDeleteOpened)
                      }
                    />

                    <ModalDelete
                      isOpen={isModalDeleteOpened}
                      setIsOpen={setIsModalDeleteOpened}
                      title="Delete Member Team"
                      type="member"
                      dataId={row.id}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
