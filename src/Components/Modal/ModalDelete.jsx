import React, { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import ButtonNormal from '../ButtonNormal'
import ConfigHeader from '../../Pages/Auth/ConfigHeader'
import axios from "axios";

const Modal = ({ isOpen, setIsOpen, title, typeData, data, action = null }) => {
    const [dataId, setDataId] = useState(null)
    const typeDelete = typeData ? typeData : null;
    const [endPoint, setEndPoint] = useState(null)
    const actionRefresh = action ? action : null;

    useEffect(() => {
        if (data !== null) {
            setDataId(data)
        }

        try {
            switch (typeDelete) {
                case 'member':
                    setEndPoint('/api/team_member');
                    break;
                case 'partner':
                    setEndPoint('/api/partners');
                    break;
                case 'employee':
                    setEndPoint('/api/employee');
                    break;
                case 'team':
                    setEndPoint('/api/team');
                    break;
                case 'role':
                    setEndPoint('/api/roles');
                    break;
                case 'allowance':
                    setEndPoint('/api/allowance');
                    break;
                case 'allowance_settings':
                    setEndPoint('/api/type_of_allowance');
                    break;
                case 'furlough_type':
                    setEndPoint('/api/furlough_type');
                    break;
                case 'attendance_status':
                    setEndPoint('/api/attendance_status');
                    break;
                case 'insurance_item':
                    setEndPoint('/api/insurance_item');
                    break;
                case 'insurance':
                    setEndPoint('/api/insurance');
                    break;
                case 'family':
                    setEndPoint('/api/employee_family');
                    break;
                default:
                    setEndPoint(null);
                    break;
            }
        } catch (e) {
            console.log(e)
        }

    }, [])

    const handleDelete = () => {
        try {
            const deleteData = async () => {
                if (endPoint === null) {
                    alert('error');
                    return;
                }
                await axios.delete(`${endPoint}/${dataId}`, ConfigHeader)
                    .then(res => {
                        console.log(res);
                        setIsOpen(false);
                        actionRefresh !== null && actionRefresh();
                    }).catch(err => {
                        console.log(err)
                    })
            }
            deleteData()
        } catch (e) {
            console.log(e)
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
                        <p className='text-sm text-gray-600'>Are you sure wanna delete this data?</p>
                    </div>
                    <div className='flex justify-end gap-2'>
                        <ButtonNormal bg="bg-gray-400 " text="Cancel" width="w-16" onClick={() => setIsOpen(false)} />
                        <ButtonNormal bg="bg-red-600 " text="Yes" width="w-16" onClick={handleDelete} />
                    </div>
                </div>
            </Dialog>

        </>
    )
}

export default Modal