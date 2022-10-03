import React from "react";
import { Link } from "react-router-dom";
import ButtonNormal from "../../Components/ButtonNormal";
import Search from "../../Components/Search";
import TitleDashboard from "../../Components/TitleDashboard";

const Insurance = () => {
  return (
    <div className="w-full md:mx-8 space-y-8">
      <TitleDashboard
        Title="Dashboard Insurance"
        Keterangan="Manage Insurance PT.OSHA Technology"
      />
      <div className="pace-y-2 border rounded shadow p-2">
      <div className="flex justify-center">
        <div className="justify-between items-center md:min-h-1/3 md:flex md:flex-row md:w-full">
          <div className="flex gap-4">
            <ButtonNormal bg="bg-green-600 " icon="bi:plus" text="Add" />
          </div>

          <Search />
        </div>
      </div>

      <div className="flex justify-center mt-2">
        <div className="items-start min-w-screen md:flex md:flex-row md:w-full ">
          <table className=" w-full text-center overflow-x-scroll rounded ">
            <thead className="bg-slate-100 border-b-2 border-slate-600 text-xs md:text-sm">
              <tr className="">
                <th rowSpan={2} className=" py-2 border">
                  No
                </th>
                <th rowSpan={2} className="border">
                  Name
                </th>
                <th rowSpan={2} className="border">
                  Name PT
                </th>
                <th rowSpan={2} className="border">
                  Address
                </th>

                <th colSpan={3} className="border">
                  Layanan Asuransi
                </th>

                <th rowSpan={2} className="border">
                  Action
                </th>
              </tr>
              <tr>
                <th className="border">Nama Layanan</th>
                <th className="border">Type Layanan</th>
                <th className="border">Persen</th>
              </tr>
            </thead>
            <tbody  className="text-xs md:text-sm font-medium">
              <tr>
                <td>1</td>
                <td>BPJS</td>
                <td>PT. OSHA Technology</td>
                <td>Perumahan Griya Cikutra</td>
                <td>
                  <ul className="list-none">
                    <li>Layanan 1</li>
                    <li>Layanan 2</li>
                  </ul>
                </td>
                <td>
                  <ul>
                    <li>Layanan Kesehatan</li>
                    <li>Layanan Kesehatan</li>
                  </ul>
                </td>
                <td>
                  <ul>
                    <li>5%</li>
                    <li>5%</li>
                  </ul>
                </td>
                <td>
                    <div>
                    <Link to={`../manageInsurance`}>
                  <span className="text-white bg-slate-600 rounded p-1">Manage Layanan</span>
                  </Link>
                    </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Insurance;
