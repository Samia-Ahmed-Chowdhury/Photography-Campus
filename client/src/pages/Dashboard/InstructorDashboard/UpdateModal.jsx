import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext, useState } from 'react'
import { useForm } from "react-hook-form";
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useGetClasses from '../../../hooks/useGetClasses';

export default function UpdateModal({ closeModal, isOpen, item }) {
    const [axiosSecure]=useAxiosSecure()
    const[,refetchClassesData]=useGetClasses()
    const { userName, userEmail } = useContext(AuthContext)
    const { _id, classImage, className, price, availableSeats } = item
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        const { img, price, availableSeats, ...restData } = data
        const updateItem = { instructorName: userName, instructorEmail: userEmail, classImage: classImage, price: +price, availableSeats: +availableSeats, ...restData }
      
        axiosSecure.put(`/update_class/${_id}`,updateItem)
            .then(res => {
                if (res.data?.modifiedCount > 0) {
                    Swal.fire(
                        `update Successfully`,
                        'success'
                    )
                    reset();
                    closeModal()
                    refetchClassesData()
                }
            }
            )
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
                                            <h1>UserName: {userName}</h1>
                                            <h1 className='my-3'>UserEmail: {userEmail}</h1>


                                        </Dialog.Title>
                                        <div className="mt-3">
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Class Name</span>
                                                </label>
                                                <input type="text" defaultValue={className} {...register("className", { required: true })} name='className' placeholder="Enter Toy Name" className="input input-bordered" />
                                                {errors.className?.type === 'required' && <p role="alert" className='text-red-700'> class Name is required</p>}
                                            </div>

                                            <div className='flex flex-col lg:flex-row justify-between gap-5'>
                                                <div className="form-control w-full">
                                                    <label className="label">
                                                        <span className="label-text">Available Seats</span>
                                                    </label>
                                                    <input type="number" defaultValue={availableSeats} {...register('availableSeats', { required: true })} name='availableSeats' placeholder="Enter Available quantity" className="input input-bordered" />
                                                    {errors.availableSeats?.type === 'required' && <p role="alert" className='text-red-700'>availableSeats is required</p>}
                                                </div>
                                                <div className="form-control w-full">
                                                    <label className="label">
                                                        <span className="label-text">Price</span>
                                                    </label>
                                                    <input type="text" defaultValue={price} {...register('price', { required: true })} name='price' placeholder="Enter Price" className="input input-bordered" />
                                                    {errors.price?.type === 'required' && <p role="alert" className='text-red-700'>price is required</p>}
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            >
                                               Update
                                            </button>
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

