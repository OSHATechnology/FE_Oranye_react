import { Icon } from '@iconify/react'
import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import ButtonSmall from '../../Components/ButtonSmall'
import TitleDashboard from '../../Components/TitleDashboard'

const Salary = () => {
  return (
    <div className="w-full md:mx-8 space-y-8">
        <TitleDashboard
        Title="Salary from Employee"
        Keterangan="Information about salary from family"
      />

<div className="flex gap-2 items-center">
        <Link
          to="../emp"
          className="flex gap-1 items-center text-blue-400 hover:text-blue-700 w-fit"
        >
          <Icon icon="bi:arrow-left" className="text-sm  font-medium"></Icon>
          <p className="text-sm  font-medium hover:font-bold">
            Back to Dashboard Employee
          </p>
        </Link>
      </div>

      <div className="flex justify-center">
        <div className="items-start min-w-screen md:flex md:flex-row md:w-full ">
          <table className=" w-full text-center overflow-x-scroll">
            <thead className="bg-gray-100 border-b-2 border-gray-800 text-xs md:text-sm">
              <tr className="">
                <th className=" py-2">No</th>
                <th className="">Nama</th>
                <th className="">Tanggal Gajian</th>
                <th className="">Gaji Bersih</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs md:text-sm font-medium">
              <tr>
                <td>1</td>
                <td>Fachrian</td>
                <td>{moment().format("MMMM YYYY")}</td>
                <td>12.000.000</td>
                <td>
                <div className="flex justify-center gap-1">
                      <Link to={"DetailSalary"}>
                    <ButtonSmall
                      bg="bg-blue-600"
                      icon="carbon:view"
                      colorIcon="text-white"
                      />
                      </Link>
                    </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      </div>
  )
}

export default Salary