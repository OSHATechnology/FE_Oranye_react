import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Icon } from '@iconify/react'
import EditFormEmployee from './EditFormEmployee';

const ModalEdit = (props) => {
    const { isOpen, setIsOpen } = props;

    const [data,setData] = useState([]);

    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    const typeData = (props.typeData) ? props.typeData : 'default';
  return (
    <Dialog className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-800/50" aria-hidden="true" open={isOpen} onClose={() => setIsOpen(false)}>
    <div className="items-start bg-white min-h-1-2 w-fit p-4 border-2 rounded space-y-4">
        <button
            className=" float-right"
            onClick={() => setIsOpen(false)}
        > <Icon icon="eva:close-outline" className="text-lg text-gray-500 " />
        </button>

        <div className="text-center text-base font-bold">
            Detail
        </div>
        <div className="flex justify-center">
            {typeData === 'employee' && (
                <EditFormEmployee {...data} />
            )}
            {/* {typeData === 'attendance' && (
                
                <DetailAttendance {...data} />
            )}
            {typeData === 'overtime' && (
                <DetailOvertime {...data} />
            )} */}
        </div>
    </div>
</Dialog>
  )
}

export default ModalEdit