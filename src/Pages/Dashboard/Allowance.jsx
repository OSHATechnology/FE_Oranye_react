import React, {useState} from "react";
import ButtonNormal from "../../Components/ButtonNormal";
import ButtonSmall from "../../Components/ButtonSmall";
import Search from "../../Components/Search";
import SimpleCard from "../../Components/SimpleCard";
import TitleDashboard from "../../Components/TitleDashboard";
import ModalDelete from "../../Components/Modal/ModalDelete";

const Allowance = () => {
  const [modalAllowanceDelete, setModalAllowanceDelete] = useState(false);
  const [allowanceDeleteData, setAllowanceDeleteData] = useState("");

  let dataAllowanceId = "";
  const showModalDelete = async (allowanceId) => {
    dataAllowanceId = allowanceId;
    setAllowanceDeleteData(dataAllowanceId);
    setModalAllowanceDelete(true);
  };

  return (
    <div className="w-full md:mx-8 space-y-8">
      <TitleDashboard
        Title="Allowance Management"
        Keterangan="Manage Allowance PT.OSHA Technology"
      />

      <SimpleCard
        bgColor=""
        Title="Number of Allowance"
        Icon="fa-solid:hand-holding-usd"
      />

      <div className="space-y-2 border rounded shadow p-2">
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
            <table className=" w-full text-center overflow-x-scroll">
              <thead className="bg-slate-100 border-b-2 border-slate-800 text-xs md:text-sm">
                <tr className="">
                  <th className=" py-2">No</th>
                  <th className="">Jabatan</th>
                  <th className="">Nama Tunjangan</th>
                  <th className="">Nominal Tunjangan</th>
                  <th className="">Action</th>
                </tr>
              </thead>
              <tbody className="text-xs md:text-sm font-medium">
                <tr>
                  <td>1</td>
                  <td>Admin</td>
                  <td>Tunjangan Admin</td>
                  <td>500.000</td>
                  <td>
                    <div className="flex justify-center gap-1">
                      <ButtonSmall
                        bg="bg-yellow-500"
                        icon="fa6-solid:pen-to-square"
                        colorIcon="text-white"
                      />
                      <ButtonSmall
                        bg="bg-red-500"
                        icon="ci:trash-full"
                        colorIcon="text-white"
                       
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            {modalAllowanceDelete && (
            <ModalDelete
              isOpen={modalAllowanceDelete}
              setIsOpen={setModalAllowanceDelete}
              title="Delete Allowance"
              typeData="Allowance"
              data={allowanceDeleteData}
            />
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allowance;
