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


const Teams = () => {
  const [totalTeam, setTotalTeam] = useState(0);
  const [isModalAddOpened, setIsModalAddOpened] = useState(false);

  const [dataTeam, setDataTeam] = useState([]);

  const fetchDataTeam = async () => {
    const result = await axios.get(`/api/team`, ConfigHeader);
    setTotalTeam(result.data.data.data.length);
};

  useEffect(() => {
    fetchDataTeam();
    axios
      .get(`/api/team`, ConfigHeader)
      .then((res) => {
        setDataTeam(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="w-full md:mx-8 space-y-8">
      <TitleDashboard
        Title="Dashboard Teams"
        Keterangan="Manage Team PT.OSHA Technology"
      />

      <SimpleCard
        bgColor="bg-gray-100"
        Title="Number of teams"
        Icon="fa-solid:users"
        Count={totalTeam}
      />
      <div>
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
            />
            </div>
            {/* <div className="flex space-x-2 items-center">
              <input
                type="text"
                placeholder="Search"
                className="rounded text-center w-72 border border-gray-300 h-9"
              />
              <ButtonSmall
                bg="bg-gray-400"
                icon="akar-icons:search"
                colorIcon="text-white"
              />
            </div> */}
            <Search />
          </div>
        </div>

        <div className="flex justify-center mt-2">
          <div className="items-start min-w-screen md:flex md:flex-row md:w-full ">
            <table className=" w-full text-center overflow-x-scroll">
              <thead className="bg-gray-100 border-b-2 border-gray-800 text-xs md:text-sm">
                <tr className="">
                  <th className=" py-2">No</th>
                  <th className="">Nama Team</th>
                  <th className="">Pemimpin Team</th>
                  <th className="">Pembuat Team</th>
                  <th className="">Action</th>
                </tr>
              </thead>
              <tbody className="text-xs md:text-sm font-medium">
                {dataTeam.map((row, index) => (
                <tr key={row.id} className=" shadow ">
                  <td>{index + 1}</td>
                  
                  <td>
                    {row.name}
                  </td>
                  <td>{row.leadBy.employee}</td>
                  <td>{row.createdBy.employee}</td>
                  <td>
                    <div className="flex justify-center gap-1">
                      <Link to={`../team/${row.id}`}>
                        <ButtonSmall
                          bg="bg-blue-600"
                          icon="carbon:view"
                          colorIcon="text-white"
                        />
                      </Link>

                
                      
                    </div>
                  </td>
                </tr> 
                ))}
                </tbody>

              
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
