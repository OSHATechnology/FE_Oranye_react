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
import Search from "../../Components/Search";
import Pagination from "react-js-pagination";

const TeamMembers = () => {
  const [isModalAddOpened, setIsModalAddOpened] = useState(false);
  const [isModalManageOpened, setIsModalManageOpened] = useState(false);
  const paramsData = useParams();
  const [memberDeleteData, setMemberDeleteData] = useState("");
  const [modalMemberDelete, setModalMemberDelete] = useState(false);

  const [dataMember, setDataMember] = useState([]);

  let dataMemberId = "";
  const showModalDelete = async (memberId) => {
    dataMemberId = memberId;
    setMemberDeleteData(dataMemberId);
    setModalMemberDelete(true);
  };

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

  const fetchMemberData = async (page = 1,search = "") => {
    try {
      const res = await axios.get(`api/team_member?teamid=${paramsData.id}&search=${search}&page=${page}`, ConfigHeader);
      setDataMember(res.data.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleSearch = (e) => {
    try{
      fetchMemberData(1,e.target.value);
    }catch(err){

    }
  }

  useEffect(() => {
    const fetchDataTeam = async () => {
      const data = await axios.get(`/api/team/${paramsData.id}`, ConfigHeader);
      setDataTeam(data.data.data);
    };
    fetchMemberData();
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
          data={dataTeam}
        />
        {/* </Link> */}
      </div>

      <div className="flex gap-2">
        <SimpleCard
          bgColor=" hover:bg-slate-100"
          Title="Team Name"
          Icon=""
          Count={dataTeam.name}
        />
        <SimpleCard
          bgColor=" hover:bg-slate-100"
          Title="Leader Team"
          Icon=""
          Count={dataTeam.leadBy ? dataTeam.leadBy.employee : ""}
        />
        <SimpleCard
          bgColor=" hover:bg-slate-100"
          Title="Team Maker"
          Icon=""
          Count={dataTeam.createdBy ? dataTeam.createdBy.employee : ""}
        />
      </div>

        <div className="w-full space-y-2 border rounded shadow p-2">
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
         
          <Search onChange={handleSearch} />
        </div>
          <table className="w-full text-center" id="tblMember">
            <thead className="bg-slate-100 h-10 border-b border-slate-400">
              <tr>
                <th>#</th>
                <th>Member Name</th>
                <th>Assign By</th>
                <th>Join At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-xs md:text-sm font-medium">
              {
                dataMember.data ? Object.keys(dataMember.data).map((row, index) => (
                  <tr key={dataMember.data[row].id} className=" shadow ">
                    <td>{index + 1}</td>
                    <td>{dataMember.data[row].employee.name}</td>
                    <td>{dataMember.data[row].assignedBy.name}</td>
                    <td>{moment(dataMember.data[row].joinedAt).format("DD MMMM YYYY")}</td>
                    <td>
                      <ButtonSmall
                        bg="bg-red-500"
                        icon="bi:trash"
                        onClick={() => showModalDelete(dataMember.data[row].id)}
                      />
                    </td>
                  </tr> 
                )) : <tr><td colSpan="5">Loading</td></tr>
              }
            </tbody>
          </table>
          {modalMemberDelete && (
            <ModalDelete
              isOpen={modalMemberDelete}
              setIsOpen={setModalMemberDelete}
              title="Delete Member"
              typeData="member"
              data={memberDeleteData}
            />
          )}
        </div>
        <Pagination 
          activePage={dataMember.current_page ? dataMember.current_page : 0}
          itemsCountPerPage={dataMember?.per_page ? dataMember?.per_page : 0 }
          totalItemsCount={dataMember?.total ? dataMember?.total : 0}
          onChange={(pageNumber) => {
            fetchMemberData(pageNumber)
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

export default TeamMembers;
