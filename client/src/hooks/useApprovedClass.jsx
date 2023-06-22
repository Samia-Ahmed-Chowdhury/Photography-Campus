import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'
import { AuthContext } from '../provider/AuthProvider'

function useApprovedClass() {
    const { loading } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()

    const { refetch: refetchApprovedCls,data:ApprovedCls=[] } = useQuery({
        queryKey: ['get_approved_classes'],
        enabled: !loading,
        queryFn: async () => {
          const res = await axiosSecure(`get_approved_classes`)
          return res.data
        }
      })
    
      return [ApprovedCls, refetchApprovedCls]
}

export default useApprovedClass