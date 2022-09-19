import React from 'react'

const PropertyMitra = (props) => {
  return (
    <div className="w-fit h-fit flex items-center gap-2">
      <div>
        <img src={props.Img} alt="" className='w-14' />
      </div>
      <div>

            <div>
                <p className="text-lg font-bold text-black">{props.Title}</p>
            </div>
            <div>
                <p className="-mt-1 text-xs font-thin text-gray-600">{props.Waktu}</p>
            </div>
            <div>
                <p className="text-sm font-semibold text-gray-600">{props.Alamat}</p>
            </div>
      </div>
        </div>
  )
}

export default PropertyMitra