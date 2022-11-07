import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import ButtonNormal from '../ButtonNormal'
import axios from 'axios'
import ConfigHeader from '../../Pages/Auth/ConfigHeader'

const ModalAccept = (props) => {
    const { isOpen, setIsOpen, title, data, action } = props;
    const refeshData = action ? action : () => {
        window.location.reload()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (data.id === undefined || data.type === undefined) {
                return alert('Data tidak ditemukan')
            }

            let splitId = data?.id?.split('-')

            switch (data?.type) {
                case 'furlough':
                    await axios.put(`/api/furlough/attendance_accepted/${splitId[1]}`, {}, ConfigHeader)
                    break;
                case 'overtime':
                    await axios.post(`/api/overtime/confirm`, {
                        overtime_id: splitId[1]
                    }, ConfigHeader)
                    break;
                case 'workPermit':
                    await axios.post(`/api/workpermit/confirm`, {
                        work_permit_id: splitId[1]
                    }, ConfigHeader)

                    break;

                default:

                    break;
            }
            setIsOpen(false)
            refeshData()
        } catch (error) {
            alert(error);
        }
    }

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={setIsOpen}
                as="div"
                className={"fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-800/50"}
            >

                <div className="items-start bg-white min-h-1-2 w-80 p-4 border-2 rounded space-y-4">

                    <div className="flex text-center text-base font-bold justify-between ">

                        {title}
                        <button
                            className=" float-right"
                            onClick={() => setIsOpen(false)}
                        > <Icon icon="eva:close-outline" className="text-lg text-gray-500 " />
                        </button>
                    </div>
                    <div>
                        <p className='text-sm text-gray-600'>Are you sure wanna accept the request?</p>
                    </div>
                    <div className='flex justify-end gap-2'>
                        <ButtonNormal bg="bg-gray-400 text-sm " text="Cancel" width="w-16" onClick={() => setIsOpen(false)} />
                        <ButtonNormal bg="bg-green-600 text-sm " text="Confirm" width="w-16" onClick={handleSubmit} />
                    </div>
                </div>
            </Dialog>

        </>
    )
}

export default ModalAccept