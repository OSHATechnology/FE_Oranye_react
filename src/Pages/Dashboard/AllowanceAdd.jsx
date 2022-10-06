import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-router-dom'
import ButtonNormal from '../../Components/ButtonNormal'
import TitleDashboard from '../../Components/TitleDashboard'

const AllowanceAdd = () => {
  return (
    <div className="w-full md:mx-8 space-y-8">
      <TitleDashboard
        Title="Add Allowance"
        Keterangan="Manage company allowance settings "
      />  

<div>
        <Link
          to="../allowance"
          className="flex gap-1 items-center text-blue-400 hover:text-blue-700 w-fit"
        >
          <Icon icon="bi:arrow-left" className="text-sm  font-medium"></Icon>
          <p className="text-sm font-medium hover:font-bold">
            Back to Allowance
          </p>
        </Link>
      </div>

      <div className='border border-slate-100'>
        <div>
            <p>Form Add Allowance</p>
        </div>
        <div className='flex'>
            <div>
                <p>Nama Tunjangan</p>
                <input type="text" />
            </div>
            <div>
                <p>Nominal Tunjangan</p>
                <input type="text" />
            </div>
            <div>
                <ButtonNormal type="submit" text="save"></ButtonNormal>
            </div>
        </div>
      </div>

    </div>
  )
}

export default AllowanceAdd