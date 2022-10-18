import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import ButtonNormal from '../ButtonNormal'
import axios from 'axios'
import ConfigHeader from '../../Pages/Auth/ConfigHeader'

const ModalDecline = (props) => {
    const { isOpen, setIsOpen, title, data } = props;
    const [reason, setReason] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (data.id === undefined || data.type === undefined) {
                return alert('Data tidak ditemukan')
            }

            let splitId = data?.id?.split('-')

            switch (data?.type) {
                case 'furlough':
                    const resp = await axios.put(`/api/furlough/attendance_declined/${splitId[1]}`, {
                        message: reason
                    }, ConfigHeader)
                    console.log(resp)
                    break;
                case 'overtime':
                    await axios.post(`/api/overtime/decline`, {
                        overtime_id: splitId[1],
                        message: reason
                    }, ConfigHeader)
                    break;
                case 'workPermit':
                    break;

                default:
                    break;
            }

            setIsOpen(false)
            setReason('')
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
                            onClick={() => {
                                setIsOpen(false)
                                setReason('')
                            }}
                        > <Icon icon="eva:close-outline" className="text-lg text-gray-500 " />
                        </button>
                    </div>
                    <div>
                        <p className='text-sm text-gray-600 mb-1'>Reason:</p>
                        <textarea onChange={(e) => setReason(e.target.value)} name="" id="" cols="30" rows="5" className="w-full border border-gray-300 rounded p-2" required defaultValue={reason}>
                        </textarea>
                    </div>
                    <div className='flex justify-end gap-2'>
                        <ButtonNormal bg="bg-gray-400 " text="Cancel" width="w-16" onClick={() => {
                            setIsOpen(false)
                            setReason('')
                        }} />
                        <ButtonNormal bg="bg-red-600 " text="Decline Request" onClick={handleSubmit} width="w-full" />
                    </div>
                </div>
            </Dialog>

        </>
    )
}

export default ModalDecline