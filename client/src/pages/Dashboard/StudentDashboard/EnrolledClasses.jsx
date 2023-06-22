import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../../provider/AuthProvider'
import useStdActivateCls from '../../../hooks/useStdActivateCls'

function EnrolledClasses() {
  const { userEmail } = useContext(AuthContext)
  const [stdActivateClsData] = useStdActivateCls(userEmail,'paid')
  
  return (
    <>
    {
      stdActivateClsData && Array.isArray(stdActivateClsData) && stdActivateClsData.length>0?(
        <div className='lg:px-12 px-5 '>
      <div className='my-8  '>
        <h2 className='text-center text-3xl font-medium  mx-auto'>My Enrolled Classes </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="table  table-xs table-pin-rows table-pin-cols">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Class Name</th>
              <th>Instructor Name</th>
              <th>Total Student</th>
              <th>Price</th>
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
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
      )
      :
      <h1 className='text-center mt-16 font-bold'>Not Enrolled in any classes</h1>
    }
    </>
  )
}

export default EnrolledClasses