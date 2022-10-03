import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-router-dom'
import ButtonNormal from '../../Components/ButtonNormal'
import ButtonSmall from '../../Components/ButtonSmall'
import Search from '../../Components/Search'
import TitleDashboard from '../../Components/TitleDashboard'

const ManageLayanan = () => {
  return (
    <div className="w-full md:mx-8 space-y-8">
        <TitleDashboard
        Title="Insurance Details"
        Keterangan="Detailed information of Insurance"
      />

<div className="flex gap-2 items-center">
        <Link
          to="../insurance"
          className="flex gap-1 items-center text-blue-400 hover:text-blue-700 w-fit"
        >
          <Icon icon="bi:arrow-left" className="text-sm  font-medium"></Icon>
          <p className="text-sm  font-medium hover:font-bold">Back to Insurance</p>
        </Link>
        <p className="font-bold text-blue-800">|</p>
        
        <button >
          <p className="text-sm  font-medium hover:font-bold text-blue-400 hover:text-blue-700 w-fit">
            Manage This Insurance
          </p>
        </button>
        
      </div>

    <div className='space-y-2'>
      <div className="flex justify-center mt-16">
        <div className="justify-between items-center md:min-h-1/3 md:flex md:flex-row md:w-full">
          <div className="flex gap-4">
            <ButtonNormal bg="bg-green-600 " icon="bi:plus" text="Add" />
          </div>

          <Search />
        </div>
      </div>

      <div className="w-full">
          <table className="w-full text-center" id="tblMember">
            <thead className="bg-gray-100 h-10 border-b border-gray-400">
              <tr>
                <th>#</th>
                <th>Nama Layanan</th>
                <th>Type Layanan</th>
                <th>Persen</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Layanan 1</td>
                    <td>Layanan Kesehatan</td>
                    <td>5%</td>
                    <td>
                    <ButtonSmall
                        bg="bg-red-500"
                        icon="bi:trash"
                        
                      />
                    </td>
                    
                </tr>
            </tbody>
            </table>
            </div>
            </div>
        </div>
  )
}

export default ManageLayanan