import React, {useState, useEffect} from "react";
import ButtonNormal from "../../Components/ButtonNormal";
import ButtonSmall from "../../Components/ButtonSmall";
import Search from "../../Components/Search";
import SimpleCard from "../../Components/SimpleCard";
import TitleDashboard from "../../Components/TitleDashboard";
import ModalDelete from "../../Components/Modal/ModalDelete";


const Allowance = () => {
  const [modalAllowanceDelete, setModalAllowanceDelete] = useState(false);
  const [allowanceDeleteData, setAllowanceDeleteData] = useState("");
  const [dataAllowance, setDataAllowance] = useState([]);

  // dummy data allowances
  const Allowances = [
    {
      "success" : true,
      "data" : {
        "current_page": 1,
        "data": [
          {
            "id": 1,
            "role_group" : "Admin",
            "data_allowances" : [
              {
                "id": 1,
                "name": "Transport",
                "amount": 1000000,
              },
              {
                "id": 2,
                "name": "Meal",
                "amount": 1000000,
              },
              {
                "id": 3,
                "name": "Lodging",
                "amount": 1000000,
              },
            ]
          },
          {
            "id": 2,
            "role_group" : "employee",
            "data_allowances" : [
              {
                "id": 1,
                "name": "Transport",
                "amount": 1000000,
              },
              {
                "id": 2,
                "name": "Meal",
                "amount": 1000000,
              },
              {
                "id": 3,
                "name": "Lodging",
                "amount": 1000000,
              },
            ]
          }
        ],
        "next_page_url": null,
        "per_page": 10,
        "prev_page_url": null,
        "to": 1,
        "total": 1
      },
      "message": "Allowances retrieved successfully."
    }
  ];

  useEffect(() => {
    setDataAllowance(Allowances);
    console.log(dataAllowance);
  }, []);
  
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
                {/* <tr>
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
                </tr> */}
                {dataAllowance.data ? (
                  Object.keys(dataAllowance.data).map((row, index) => (
                    <tr key={dataAllowance.data[row].id}>
                      <td>{index + 1}</td>
                      <td class="text-start">{dataAllowance.data[row].role_group}</td>
                      <td>
                        <div className="flex justify-center text-center">
                          {/* <ButtonNormal
                            bg="bg-blue-500 "
                            text="details"
                            onClick={() =>
                              showModalDetail(dataAllowance.data[row].roleId)
                            }
                          /> */}
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
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Loading</td>
                  </tr>
                )}
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
