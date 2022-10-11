import { Dialog } from "@headlessui/react";
import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";
import ButtonNormal from "../ButtonNormal";

const AddLoan = ({ isOpen, setIsOpen, title }) => {
  const [employee, setEmployee] = useState("");
  const [name, setName] = useState("");
  const [nominal, setNominal] = useState("");
  const [loanDate, setLoanDate] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [dataEmployee, setDataEmployee] = useState([]);

  useEffect(() => {
    const fetchDataEmployee = async () => {
      const data = await axios.get(`/api/employee`, ConfigHeader);
      setDataEmployee(data.data.data.data);
    };
    fetchDataEmployee();
  }, []);

  function changeDataToNull() {
    setEmployee("");
    setName("");
    setNominal("");
    setLoanDate("");
    setPaymentDate("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      empId: employee,
      name: name,
      nominal: nominal,
      loanDate: loanDate,
      paymentDate: paymentDate,
      status: 0,
    };

    try {
      let formData = new FormData();
      for (let key in data) {
        formData.append(key, data[key]);
      }
      console.log(FormData);
      const rslt = await axios.post("/api/loan", formData, ConfigHeader);
      console.log(rslt);
      //   setIsOpen(false);

      changeDataToNull();
    } catch (error) {
      console.log(error);
    }
  };

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
            <form id="allowance_form" onSubmit={handleSubmit}>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Employee Name</p>
                <select
                  name="employee"
                  id=""
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  onChange={(e) => setEmployee(e.target.value)}
                >
                  <option value="-" selected disabled>
                    -- select Employee --
                  </option>
                  {dataEmployee.map((row, index) => (
                    <option value={row.employeeId} key={index}>
                      {row.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Loan Name</p>
                <input
                  type="text"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Nominal</p>
                <input
                  type="text"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  value={nominal}
                  onChange={(e) => setNominal(e.target.value)}
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Loan Date</p>
                <input
                  type="date"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  value={loanDate}
                  onChange={(e) => setLoanDate(e.target.value)}
                />
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Payment Date</p>
                <input
                  type="date"
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                />
              </div>
              {/* <div className="">
                <p className="text-sm font-extrabold text-gray-600">
                  Tunjangan
                </p>
                <select
                  name="allowance"
                  id=""
                  className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
                  onChange={(e) => {
                    setType(e.target.value);
                    setNominal(
                      dataType.find((item) => item.id == e.target.value)
                        ?.nominal
                    );
                  }}
                >
                  <option value="-" selected disabled>
                    -- select Allowance --
                  </option>
                  {dataType.map((row, index) => (
                    <option value={row.id} key={index}>
                      {row.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="">
                <p className="text-sm font-extrabold text-gray-600">Nominal</p>
                <input
                  type="text"
                  disabled
                  placeholder="nominal"
                  className="rounded-lg w-full border border-gray-300 bg-gray-100 text-xs text-gray-700 font-medium"
                  name="Status"
                  value={nominal}
                  onChange={(e) => setNominal(e.target.value)}
                />
              </div> */}
            </form>
          </div>

          <div className="flex justify-end gap-2">
            <ButtonNormal bg="bg-gray-400 " text="Cancel" width="w-16" />
            <button
              type="submit"
              form="allowance_form"
              className="bg-green-600 rounded text-white px-2"
            >
              submit
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AddLoan;
