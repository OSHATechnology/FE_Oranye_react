import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Icon } from '@iconify/react'
import EditFormEmployee from './EditFormEmp';
import EditFormPartner from './EditFormPartner';
import EditFormFurloughType from './EditFormFurloughType';
import EditFormAttendanceStatus from './EditFormAttendanceStatus';
import EditFormAllowance from './EditFormAllowance';

const ModalEdit = (props) => {
    const { isOpen, setIsOpen } = props;
    const action = () => {
        setIsOpen(false);
        // action = props.action ? props.action : null;
    }

    const [data,setData] = useState([]);

    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    const typeData = (props.typeData) ? props.typeData : 'default';
  return (
    <Dialog className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-800/50" aria-hidden="true" open={isOpen} onClose={() => setIsOpen(false)}>
    <div className="items-start bg-white h-1/2 w-full md:w-2/5 p-4 border-2 rounded space-y-4">
        <button
            className=" float-right"
            onClick={() => setIsOpen(false)}
        > <Icon icon="eva:close-outline" className="text-lg text-gray-500 " />
        </button>

        <div className="text-center text-base font-bold">
        {props.title}
        </div>
        <div className="w-full overflow-y-auto h-3/4">
            {typeData === 'employee' && (
                <EditFormEmployee data={data} action={action} />
            )}
            {typeData === 'partner' && (
                <EditFormPartner data={data} action={action} />
            )}
            {typeData === 'furlough_type' && (
                <EditFormFurloughType data={data} action={action} />
            )}
            {typeData === 'attendance_status' && (
                <EditFormAttendanceStatus data={data} action={action} />
            )}
            {typeData === 'allowance' && (
                <EditFormAllowance data={data} action={action} />
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