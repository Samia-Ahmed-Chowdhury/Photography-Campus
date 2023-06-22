import React from 'react'
import useGetClasses from '../../../hooks/useGetClasses'
import UpdateModal from './UpdateModal'
import { useState } from 'react'
import ShowFeedBack from './ShowFeedBack'

function MyClasses() {

  const [classesData] = useGetClasses()
  const [isOpen, setIsOpen] = useState(false)
  const [item, setItem] = useState({})
  const [msg, setMSg] = useState({})
  const [isMsgOpen, setIsMsgOpen] = useState(false)


  function closeModal() {
    setIsOpen(false)
  }

  function openModal(item) {
    setIsOpen(true)
    setItem(item)
  }

  const showfeedback = (item) => {
    setIsMsgOpen(true)
    setMSg(item)
  }

  function closeFeedback() {
    setIsMsgOpen(false)
  }


  return (
    <>
      {
        classesData && Array.isArray(classesData) && classesData.length > 0 ? (
          <div className='lg:px-12 px-5 '>
            <div className='my-8  '>
              <h2 className='text-center text-3xl font-medium  mx-auto'>My All Classes </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="table  table-xs text-center ">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Class Image</th>
                    <th>Class Name</th>
                    <th>Price</th>
                    <th>Avaible seats</th>
                    <th>Total Student</th>
                    <th>Status</th>
                    <th>Feedback</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    classesData.map((item, index) =>
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={item?.classImage} alt="Avatar " />
                            </div>
                          </div>
                        </td>
                        <td>{item?.className}</td>
                        <td>${item?.price}</td>
                        <td>{item?.availableSeats}</td>
                        <td>{item?.numOfStd}</td>
                        <td className={`font-semibold ${item?.status === 'approved' ? 'text-green-500'
                          : item?.status === 'pending' ? 'text-orange-500' : 'text-red-500'}
                        `}>{item?.status}</td>

                        <td>{item?.status === 'denied' &&
                          <button type='button'
                            className='ml-5 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-1 text-sm font-medium text-primaryColor hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                            onClick={() => showfeedback(item)}
                          >
                            show
                          </button>

                        }</td>
                        <td className='space-x-3'>

                          <button type='button'
                            className='ml-5 inline-flex justify-center rounded-md border border-transparent bg-orange-100 px-4 py-1 text-sm font-medium text-primaryColor hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                            onClick={() => openModal(item)}
                          >
                            Update
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
          <h1 className='text-center mt-16 font-bold'>Not class Data available</h1>
      }
      {isOpen && <UpdateModal isOpen={isOpen} item={item} closeModal={closeModal} />}
      {isMsgOpen && <ShowFeedBack isMsgOpen={isMsgOpen} msg={msg} closeFeedback={closeFeedback} />}
    </>
  )
}

export default MyClasses