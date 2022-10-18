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

    const [showDataPartner, setShowDataPartner] = useState(false);
    const fetchDataPartner = async () => {
        try {
            const result = await axios.get(`/api/partners`, ConfigHeader);
            setDataPartner(result.data.data.data);
            setShowDataPartner(true)
        } catch (error) {
            setShowDataPartner(false)
        }
    };
    const fecthTotalPartner = async () => {
        try {
            const result = await axios.get(`api/count?type=partner`, ConfigHeader);
            setTotalPartner(result.data.data);
        } catch (error) {
            console.log('failed to fetch total partner');
        }
    };
    const fetchDataEmp = async () => {
        try {
            const response = await axios.get("api/count?type=employee", ConfigHeader);
            setTotalEmployee(response.data.data)
        } catch (error) {
            console.log('failed to fetch total employee');
        }
    };
    const fetchDataRole = async () => {
        try {
            const response = await axios.get("api/count?type=role", ConfigHeader);
            setTotalRole(response.data.data)
        } catch (error) {
            console.log('failed to fetch total role');
        }
    };

    useEffect(() => {
        fetchDataEmp();
        fetchDataRole();
        fetchDataPartner();
        fecthTotalPartner();
    }, []);

    return (
        <div className="md:ml-8 space-y-8 pb-10">
            <TitleDashboard
                Title="Property Dashboard"
                Keterangan="Welcome, Admin!"
            />

            <div className="flex flex-wrap md:flex-row gap-2">
                <SimpleCard
                    bgColor=""
                    Title="Role Perusahaan"
                    Icon="fa-solid:user-cog"
                    Count={totalRole}
                />
                <SimpleCard
                    bgColor=""
                    Title="Jumlah Karyawan"
                    Icon="fa-solid:user"
                    Count={totalEmployee}
                />
                <SimpleCard
                    bgColor=""
                    Title="Jumlah Partner"
                    Icon="fluent:handshake-20-filled"
                    Count={totalPartner}
                />
            </div>

            {(showDataPartner && dataPartner.length > 0) && (
                <>
                    <TitleDashboard Title="Property Partner" Keterangan="" />
                    <div className=" mt-4 max-h-80 overflow-y-auto space-y-4 md:flex-col">
                        {dataPartner?.map((row) => (
                            <PropertyMitra
                                key={row.id}
                                Img="assets/PP.png"
                                Title={row.name}
                                Waktu={moment(row.joinedAt).format("DD MMMM YYYY")}
                                Alamat={row.address}
                            />
                        ))}
                    </div>
                </>
            )}


            <TitleDashboard Title="Performa Absensi" Keterangan="" />


        </div>
    );
};

export default Home;
