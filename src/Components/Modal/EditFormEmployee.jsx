import React from 'react'
import ButtonNormal from '../ButtonNormal'

const EditFormEmployee = ({ ...data }) => {
  return (
    <div>
        <div className="w-full h-3/4 overflow-y-auto space-y-1">
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                First Name
              </p>
              <input
                type="text"
                placeholder="First Name"
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Last Name
              </p>
              <input
                type="text"
                placeholder="Last Name"
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Phone Number
              </p>
              <input
                type="text"
                placeholder="Phone Number"
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Email
              </p>
              <input
                type="text"
                placeholder="Email"
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Password
              </p>
              <input
                type="text"
                placeholder="Password"
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Photo
              </p>
              <input
                type="file"
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>
            
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Gender
              </p>
              <select name="" id="" className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium">
                <option value="">Male</option>
                <option value="">Female</option>
              </select>
            </div>
            
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Birth Date
              </p>
              <input
                type="date"
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Address
              </p>
              <input
                type="text"
                placeholder="Address"
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                City
              </p>
              <input
                type="text"
                placeholder="City"
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Nation
              </p>
              <input
                type="text"
                placeholder="Nation"
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>
            
            
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Role
              </p>
              <select name="" id="" className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium">
                <option value="">Admin</option>
                <option value="">Employee</option>
              </select>
            </div>
            
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                EmailVerifiedAt
              </p>
              <input
                type="date"
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Remember Token
              </p>
              <input
                type="text"
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Joined At
              </p>
              <input
                type="date"
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Resigned At
              </p>
              <input
                type="date"
                className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium"
              />
            </div>
            <div className="">
              <p className="text-sm font-extrabold text-gray-600">
                Status Hireld
              </p>
              <select name="" id="" className="rounded-lg w-full border border-gray-300 text-xs text-gray-700 font-medium">
                <option value="">1</option>
                <option value="">2</option>
                <option value="">17</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-extrabold text-gray-600">
                Status Aktif
              </p>
              <input type="checkbox" name="" id="" className="rounded border border-gray-300 text-xs text-gray-700 font-medium"/>
              
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <ButtonNormal
              bg="bg-gray-400 "
              text="Cancel"
              width="w-16"
            //   onClick={() => setIsOpen(false)}
            />
            <ButtonNormal bg="bg-green-600 " text="Add" width="w-16" />
          </div>
    </div>
  )
}

export default EditFormEmployee