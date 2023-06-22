import React from 'react'
import useGetAllClass from '../../../hooks/useGetAllClass'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import Swal from 'sweetalert2'
import { useState } from 'react'
import FeedBackModal from './FeedBackModal'
import { TbSlashes } from 'react-icons/tb'

function ManageClasses() {

  const [allClassesData, refetchaAllClassesData] = useGetAllClass()
  const [axiosSecure] = useAxiosSecure()

  let [isOpen, setIsOpen] = useState(false)
  let [item, setItem] = useState({})

  function closeModal() {
    setIsOpen(false)
  }

  function openModal(item) {
    // console.log(item)
    setIsOpen(true)
    setItem(item)
  }

  const statusHandler = (id, setStatus) => {
    axiosSecure.patch(`/update_class_status/${id}?status=${setStatus}`)
      .then(res => {
        if (res.data?.modifiedCount > 0) {
          Swal.fire(
            `${setStatus} Successfully`,
            'success'
          )
          refetchaAllClassesData()
        }
      }
      )
  }

  return (
    <>
      {
        allClassesData && Array.isArray(allClassesData) && allClassesData.length > 0 ? (
          <div className='px-5 '>
            <div className='my-8  '>
              <h2 className='text-center text-3xl font-medium  mx-auto'>My All Classes </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="table text-center table-xs ">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Class Image</th>
                    <th>Class Name</th>
                    <th>Instructor Name</th>
                    <th>Instructor Email</th>
                    <th>Avaible seats</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    allClassesData.map((item, index) =>
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={item?.classImage} alt="Avatar Tailwind CSS Component" />
                            </div>
                          </div>
                        </td>
                        <td>{item?.className}</td>
                        <td>{item?.instructorName}</td>
                        <td>{item?.instructorEmail}</td>
                        <td>{item?.availableSeats}</td>
                        <td>${item?.price}</td>
                        <td>{item?.status}</td>
                        <td className=''>
                          <button
                            className={`inline-flex justify-center rounded-md border border-transparent ${item?.status === 'approved' || item?.status === 'denied' ? 'bg-gray-300' : 'bg-green-100'} px-4 py-1 text-sm font-medium ${item?.status === 'approved' || item?.status === 'denied' ? 'hover:none ' : 'hover:bg-green-200 '} text-green-900focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2`}
                            onClick={() => statusHandler(item._id, 'approved')}
                            disabled={item?.status === 'approved' || item?.status === 'denied' && "disabled"}>
                            Approve</button>
                          <TbSlashes className='text-primaryColor inline' />
                          <button
                            className={`inline-flex justify-center rounded-md border border-transparent ${item?.status === 'approved' || item?.status === 'denied' ? 'bg-gray-300' : 'bg-red-100'} px-4 py-1 text-sm font-medium ${item?.status === 'approved' || item?.status === 'denied' ? 'hover:none ' : 'hover:bg-red-200 '} text-red-900focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2`}

                            onClick={() => statusHandler(item._id, 'denied')}
                            disabled={item?.status === 'approved' || item?.status === 'denied' && "disabled"}>
                            Deny</button>
                          <TbSlashes className='text-primaryColor inline' />
                          <button
                            onClick={() => openModal(item)}
                            className='inline-flex justify-center rounded-md border border-transparent bg-orange-100 px-4 py-1 text-sm font-medium text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'>Send feedback</button>
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        )
          :
          <h1 className='text-center mt-16 font-bold'>Not class Data available</h1>
      }
      <FeedBackModal isOpen={isOpen} item={item} closeModal={closeModal} />
    </>
  )
}

export default ManageClasses