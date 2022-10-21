import React, { useEffect, useState} from "react";
import ButtonNormal from "../../Components/ButtonNormal";
import ButtonSmall from "../../Components/ButtonSmall";
import TitleDashboard from "../../Components/TitleDashboard";
import SimpleCard from "../../Components/SimpleCard";
import { Link } from "react-router-dom";
import ModalAdd from "../../Components/Modal/TeamAdd";
import axios from "axios";
import ConfigHeader from "../Auth/ConfigHeader";
import Search from "../../Components/Search";
import Pagination from "react-js-pagination";


const Teams = () => {
  const [totalTeam, setTotalTeam] = useState(0);
  const [isModalAddOpened, setIsModalAddOpened] = useState(false);
  const [dataTeam, setDataTeam] = useState([]);

const fetchDataTeam = async (page = 1,search = "") => {
  try {
    const result = await axios.get(`/api/team?search=${search}&page=${page}`, ConfigHeader);
    setDataTeam(result.data.data);
    setTotalTeam(result.data.data.data.length);
  } catch (error) {
    console.log(error);
  }
};

const handleSearch = (e) => {
  try{
    fetchDataTeam(1,e.target.value);
  }catch(err){

  }
}

  useEffect(() => {
    fetchDataTeam();
  }, []);
  return (
    <div className="w-full md:mx-8 space-y-8">
      <TitleDashboard
        Title="Dashboard Teams"
        Keterangan="Manage Team PT.OSHA Technology"
      />

      <SimpleCard
        bgColor=""
        Title="Number of teams"
        Icon="fa-solid:users"
        Count={totalTeam}
      />

        <div className="space-y-2 border rounded shadow p-2">

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
              action={fetchDataTeam}
            />
            </div>
            <Search onChange={handleSearch}/>
          </div>
        </div>
          <div className="items-start min-w-screen md:flex md:flex-row md:w-full ">
            <table className=" w-full text-center overflow-x-scroll">
              <thead className="bg-slate-100 border-b-2 border-slate-800 text-xs md:text-sm">
                <tr className="">
                  <th className=" py-2">No</th>
                  <th className="">Nama Team</th>
                  <th className="">Pemimpin Team</th>
                  <th className="">Pembuat Team</th>
                  <th className="">Action</th>
                </tr>
              </thead>
              <tbody className="text-xs md:text-sm font-medium">
                {
                dataTeam.data ? Object.keys(dataTeam.data).map((row, index) =>
                (
                  <tr key={dataTeam.data[row].id} className=" shadow ">
                    <td>{index + 1}</td>
                    <td>{dataTeam.data[row].name}</td>
                    <td>{dataTeam.data[row].leadBy.employee}</td>
                    <td>{dataTeam.data[row].createdBy.employee}</td>
                    <td>
                    <div className="flex justify-center gap-1">
                    
                      <Link to={`../team/${dataTeam.data[row].id}`}>
                        <ButtonSmall
                          bg="bg-blue-600"
                          icon="carbon:view"
                          colorIcon="text-white"
                        />
                      </Link>
                    {/* <Link to={`../emp/${dataEmployee.data[row].employeeId}`}>
                        <ButtonSmall
                          bg="bg-blue-600"
                          icon="carbon:view"
                          colorIcon="text-white"
                        />
                      </Link>

                      <ButtonSmall
                        bg="bg-yellow-500"
                        icon="fa6-solid:pen-to-square"
                        colorIcon="text-white"
                        onClick={() => showModalEdit(dataEmployee.data[row].employeeId)}
                      />
                      <ButtonSmall
                        bg="bg-red-500"
                        icon="ci:trash-full"
                        colorIcon="text-white"
                        onClick={() =>
                          showModalDelete(dataEmployee.data[row].employeeId)}
                      /> */}
                      </div>
                    </td>
                  </tr> 
                )) : <tr><td colSpan="5">Loading</td></tr>
              }
                </tbody>

              
            </table>
          </div>
        <Pagination 
          activePage={dataTeam.current_page ? dataTeam.current_page : 0}
          itemsCountPerPage={dataTeam?.per_page ? dataTeam?.per_page : 0 }
          totalItemsCount={dataTeam?.total ? dataTeam?.total : 0}
          onChange={(pageNumber) => {
            fetchDataTeam(pageNumber)
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

export default Teams;
