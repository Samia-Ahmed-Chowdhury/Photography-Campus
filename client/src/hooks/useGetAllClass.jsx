import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'
import { AuthContext } from '../provider/AuthProvider'

function useGetAllClass() {
    const { loading,userEmail } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()

    const { refetch: refetchaAllClassesData,data:allClassesData=[] } = useQuery({
        queryKey: ['get_all_classes'],
        enabled: !loading,
        queryFn: async () => {
          const res = await axiosSecure(`get_all_classes`)
          return res.data
        }
      })
    
      return [allClassesData, refetchaAllClassesData]
}

export default useGetAllClass
