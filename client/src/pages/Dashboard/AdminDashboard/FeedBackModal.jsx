import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext, useState } from 'react'
import { useForm } from "react-hook-form";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

export default function FeedBackModal({ closeModal, isOpen, item }) {

    const { instructorEmail, className, _id } = item
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [axiosSecure] = useAxiosSecure()
    const onSubmit = data => {
   
        axiosSecure.patch(`/send_feedback/${_id}`,data)
        .then(res => {
            if (res.data?.modifiedCount > 0) {
                Swal.fire(
                    `feedback sent Successfully`,
                )
                reset();
                closeModal()
            }
        })
    reset();
    closeModal()
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="div"
                                            className=" text-lg font-medium leading-6 text-gray-900"
                                        >
                                            <h4>To: {instructorEmail} </h4>
                                            <h4 className='my-3'> For: {className}</h4>
                                        </Dialog.Title>

                                        <div className="mt-3">

                                            <div className="form-control w-full max-w-xs">
                                                <label className="label">
                                                    <span className="label-text">Enter your message?</span>
                                                </label>
                                                <textarea defaultValue='' type="text"
                                                    {...register("feedBack", { required: true })}
                                                    placeholder="Type here" className="h-32 input input-bordered w-full max-w-xs" />
                                                {errors.feedBack?.type === 'required' && <p role="alert" className='text-red-700'>feedBack number is required</p>}
                                            </div>
                                            <button
                                                type="submit"
                                                className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            >
                                                Send
                                            </button>

                                            <button
                                                type='button'
                                                className='ml-5 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                                                onClick={closeModal}
                                            >Cancel</button>
                                        </div>
                                    </Dialog.Panel>
                                </form>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

