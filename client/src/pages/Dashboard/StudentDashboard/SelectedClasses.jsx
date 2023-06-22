import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../../provider/AuthProvider'
import useStdActivateCls from '../../../hooks/useStdActivateCls'
import { useState } from 'react'
import PaymentCard from '../../../components/PaymentComp/PaymentCard'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import Swal from 'sweetalert2'
import { TbSlashes } from 'react-icons/tb'

function SelectedClasses() {

  const { userEmail } = useContext(AuthContext)
  const [stdActivateClsData, refetchStdActivateCls] = useStdActivateCls(userEmail, 'selected')
  // console.log(stdActivateClsData)

  let [isOpen, setIsOpen] = useState(false)
  let [item, setItem] = useState({})

  const [axiosSecure] = useAxiosSecure()
  const deleteHandler = (item) => {
    axiosSecure.delete(`/delete_booked_classs/${item._id}`)
      .then(res => {
        console.log(res)
        if (res.data) {
          Swal.fire(
            `deleted successfully`,
            'success'
          )
          refetchStdActivateCls()
        }
      }
      )
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal(item) {
    // console.log(item)
    setIsOpen(true)
    setItem(item)
  }


  return (
    <>
      {
        stdActivateClsData && Array.isArray(stdActivateClsData) && stdActivateClsData.length > 0 ? (
          <div className='lg:px-12 px-5'>
            <div className='my-8'>
              <h2 className='text-center text-3xl font-medium  mx-auto'>My Selected Classes </h2>
            </div>

            <div className="overflow-x-auto min-w-full ">
              <table className="table text-center">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Class Name</th>
                    <th>Instructor Name</th>
                    <th>Total Student</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    stdActivateClsData.map((item, index) =>
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item?.classData.className}</td>
                        <td>{item?.classData.instructorName}</td>
                        <td>{item?.classData.numOfStd}</td>
                        <td>${item?.classData.price}</td>
                        <td className='space-x-3'>

                          <button type='button'
                            className='ml-5 inline-flex justify-center rounded-md border border-transparent bg-orange-100 px-4 py-1 text-sm font-medium text-primaryColor hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                            onClick={() => openModal(item)}
                          >
                            Pay
                          </button>

                          <TbSlashes className='text-primaryColor inline' />

                          <button type='button'
                            className='ml-5 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-1 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                            onClick={() => deleteHandler(item)}
                          >
                            Delete
                          </button>
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
          <h1 className='text-center mt-16 font-bold'>No Class Selected</h1>
      }
      <PaymentCard isOpen={isOpen} item={item} closeModal={closeModal} />
    </>
  )
}

export default SelectedClasses