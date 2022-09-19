import React,{ Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import ButtonNormal from '../ButtonNormal'

const ModalDecline = ({ isOpen, setIsOpen, title }) => {
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
                    <p className='text-sm text-gray-600'>Are you sure wanna decline the request?</p>
                </div>
                <div className='flex justify-end gap-2'>
                    <ButtonNormal bg="bg-gray-400 " text="Cancel" width="w-16" onClick={() => setIsOpen(false)}/>
                    <ButtonNormal bg="bg-red-600 " text="Yes" width="w-16" />
                </div>
            </div>
        </Dialog>

    </>
  )
}

export default ModalDecline