import React, { useEffect, useState } from "react";
import SimpleCard from "../../Components/SimpleCard";
import TitleDashboard from "../../Components/TitleDashboard";
import PropertyMitra from "../../Components/PropertyMitra";
import ConfigHeader from "../Auth/ConfigHeader";
import axios from "axios";
import moment from "moment";

const Home = () => {

    const [dataPartner, setDataPartner] = useState([]);
    const [totalEmployee, setTotalEmployee] = useState(0);
    const [totalPartner, setTotalPartner] = useState(0);
    const [totalRole, setTotalRole] = useState(0);
    const fetchDataPartner = async () => {
        const result = await axios.get(`/api/partners`, ConfigHeader);
        setDataPartner(result.data.data.data);
        setTotalPartner(result.data.data.data.length);
    };
    const fetchDataEmp = async () => {
        try {
          const {data} = await axios.get("api/employee", ConfigHeader);
            console.log(data.data);
          setTotalEmployee(data.data.data.length)
        } catch (error) {
          
        }
      };
      const fetchDataRole = async () => {
        try {
            const response = await axios.get("api/roles", ConfigHeader);
            setTotalRole(response.data.data.data.length)
        } catch (error) {
          
        }
      };

    useEffect(() => {
        fetchDataEmp();
        fetchDataRole();
        fetchDataPartner().catch((err) => {
          console.log(err.message);
        });
      }, []);

    return (
        <div className="md:ml-8 space-y-4">
            <TitleDashboard
                Title="Property Dashboard"
                Keterangan="Welcome, Admin!"
            />

            <div className="flex flex-col flex-wrap md:flex-row gap-2">
                <SimpleCard
                    bgColor="bg-gradient-to-b from-red-100 via-pink-100 to-fuchsia-100 md:bg-gradient-to-r md:from-red-100 md:via-orange-100 md:to-yellow-100"
                    Title="Role Perusahaan"
                    Icon="fa-solid:user-cog"
                    Count={totalRole}
                />
                <SimpleCard
                    bgColor="bg-gradient-to-b from-fuchsia-100 via-purple-100 to-fuchsia-100 md:bg-gradient-to-r md:from-yellow-100 md:via-green-100 md:to-cyan-100"
                    Title="Jumlah Karyawan"
                    Icon="fa-solid:user"
                    Count={totalEmployee}
                />
                <SimpleCard
                    bgColor="bg-gradient-to-b from-fuchsia-100 via-pink-100 to-red-100 md:bg-gradient-to-r md:from-cyan-100 md:via-blue-100 md:to-purple-100"
                    Title="Jumlah Partner"
                    Icon="fluent:handshake-20-filled"
                    Count={totalPartner}
                />
            </div>

            <TitleDashboard Title="Property Partner" Keterangan="" />
            <div className=" mt-4 max-h-80 overflow-y-auto space-y-4 md:flex-col">
            {dataPartner.map((row) => (
                <PropertyMitra
                    Img="assets/PP.png"
                    Title={row.name}
                    Waktu={moment(row.joinedAt).format("DD MMMM YYYY")}
                    Alamat={row.address}
                />
                ))}
            </div>
            <TitleDashboard Title="Performa Absensi" Keterangan="" />


        </div>
    );
};

export default Home;
