import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Icon } from '@iconify/react'
import DetailPartner from './DetailPartner';
import DetailAttendance from './DetailAttendance';
import DetailOvertime from './DetailOvertime';

const ModalDetail = (props) => {
    const { isOpen, setIsOpen } = props;

    const [data,setData] = useState([]);

    // if(props.data){
    //     setData(props.data);
    // }
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
                    {typeData === 'partner' && (
                        <DetailPartner {...data} />
                    )}
                    {typeData === 'attendance' && (
                        
                        <DetailAttendance {...data} />
                    )}
                    {typeData === 'overtime' && (
                        <DetailOvertime {...data} />
                    )}
                </div>
            </div>
        </Dialog>
    )
}

export default ModalDetail