import React,{ Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'

const Modal = ({ isOpen, setIsOpen }) => {
  return (
    <>
    
        <Dialog
                open={isOpen}
                onClose={setIsOpen}
                as="div"
                className={"fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-800/50"}
            >
                
                <div className="items-start bg-white min-h-1-2 w-72 border-2 rounded space-y-4">
                <button
                        className=" float-right"
                        onClick={() => setIsOpen(false)}
                    > <Icon icon="eva:close-outline" className="text-lg text-gray-500 " />
                    </button>
                    
                <div className="text-center text-base font-bold">
                    Detail
                </div>
                <div className="w-full text-center  ">
                    <table className="w-4/5 mx-12 text-xs font-semibold text-start  mb-4">
                        <tr>
                            <td>ID</td>
                            <td>:</td>
                            <td>KS76J09</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>:</td>
                            <td>Tatang Suherman</td>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td>:</td>
                            <td>06 September2022</td>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td>:</td>
                            <td>Furlough</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>:</td>
                            <td>Pending</td>
                        </tr>
                    </table>
                </div>
            </div>
        </Dialog>

    </>
  )
}

export default Modal