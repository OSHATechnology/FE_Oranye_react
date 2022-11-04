import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import ButtonNormal from "../ButtonNormal";
import axios from "axios";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";
import { useParams } from "react-router-dom";

const ManageSalaryByEmployee = ({
  isOpen,
  setIsOpen,
  title,
  action = null,
  showAlert = null,
}) => {
  const [dataSalary, setDataSalary] = useState([]);
  const paramsData = useParams();
  const actionRefresh = action ? action : null;

  const fetchSalary = async () => {
    const data = await axios.get(
      `/api/employee/${paramsData.id}/basic_salary`,
      ConfigHeader
    );
    setDataSalary(data.data.data);
  };

  const refresh = () => {
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dataSalary.basicSalaryByEmployeeId) {
      const dataBasic = {
        empId: parseInt(paramsData.id),
        basicSalaryByRoleId: dataSalary.basicSalaryByRoleId,
        fee: dataSalary.total - dataSalary.basic,
      };
      await axios
        .put(
          `/api/basic_salary_by_employee/${dataSalary.basicSalaryByEmployeeId}`,
          dataBasic,
          ConfigHeader
        )
        .then((res) => {
          setIsOpen(false);
          actionRefresh !== null && actionRefresh();
          showAlert("success", "Salary has updated");
        })
        .catch((err) => {
          showAlert("failed", err.response.data.data);
        });
    } else {
      //baru
      const dataBasic = {
        empId: parseInt(paramsData.id),
        basicSalaryByRoleId: dataSalary.basicSalaryByRoleId,
        fee: dataSalary.total - dataSalary.fee,
      };
      await axios
        .post(`/api/basic_salary_by_employee`, dataBasic, ConfigHeader)
        .then((res) => {
          setIsOpen(false);
          actionRefresh !== null && actionRefresh();
        })
        .catch((err) => {
          alert(err.response.data.message);
          console.log(err.response);
        });
    }
  };

  useEffect(() => {
    fetchSalary();
  }, []);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={setIsOpen}
        as="div"
        className={
          "fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-800/50"
        }
      >
        <div className="items-start bg-white h-fit w-full md:w-2/5 p-4 border-2 rounded space-y-4">
          <div className="flex text-center text-xl font-bold justify-between ">
            {title}
            <button className=" float-right" onClick={() => setIsOpen(false)}>
              {" "}
              <Icon
                icon="eva:close-outline"
                className="text-lg text-gray-500 "
              />
            </button>
          </div>
          <div className="w-full h-3/4 overflow-y-auto space-y-1">
            <form method="post" onSubmit={handleSubmit}>
              <div className="flex items-end gap-2">
                <div className="w-full">
                  <p className="text-sm font-extrabold text-gray-600">
                    Set Salary for Employee
                  </p>
                  <input
                    type="number"
                    placeholder="Salary Employee"
                    value={dataSalary.total}
                    onChange={(e) =>
                      setDataSalary({ ...dataSalary, total: e.target.value })
                    }
                    autoFocus
                    className="rounded w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  />
                </div>

                <div className="flex justify-center">
                  <ButtonNormal
                    bg="bg-green-500 "
                    text="Save"
                    width="w-16"
                    type="submit"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ManageSalaryByEmployee;
