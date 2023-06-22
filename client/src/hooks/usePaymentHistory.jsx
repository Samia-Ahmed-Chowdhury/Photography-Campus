import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'
import { AuthContext } from '../provider/AuthProvider'

function usePaymentHistory(email) {
    console.log(email)
    const { loading } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()

    const { refetch: refetchPaymentsData,data:paymentsData=[] } = useQuery({
        queryKey: ['get_payments'],
        enabled: !loading,
        queryFn: async () => {
          const res = await axiosSecure(`get_payments?studentEmail=${email}`)
          console.log(res)
          return res.data
        }
      })
    
      return [paymentsData, refetchPaymentsData]
}

export default usePaymentHistory