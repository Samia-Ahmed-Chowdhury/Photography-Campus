import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../../provider/AuthProvider'
import usePaymentHistory from '../../../hooks/usePaymentHistory'

function PaymentHistory() {
  const { userEmail } = useContext(AuthContext)
  const [paymentsData] = usePaymentHistory(userEmail)
  console.log(paymentsData)

  return (
    <>
    {
      paymentsData && Array.isArray(paymentsData) && paymentsData.length>0?(
        <div className='lg:px-12 px-5 '>
      <div className='my-8  '>
        <h2 className='text-center text-3xl font-medium  mx-auto'>My Selected Classes </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="table  table-xs table-pin-rows table-pin-cols">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Class Name</th>
              <th>Price</th>
              <th>transactionId</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {
              paymentsData.map((item, index) =>
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item?.classData.className}</td>
                  <td>{item?.total}</td>
                  <td>{item?.transactionId}</td>
                  <td>{new Date(item?.date).toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
      )
      :
      <h1 className='text-center mt-16 font-bold'>Not Payment Data available</h1>
    }
    </>
  )
}

export default PaymentHistory