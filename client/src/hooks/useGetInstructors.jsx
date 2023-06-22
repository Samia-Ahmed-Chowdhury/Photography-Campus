import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'
import { AuthContext } from '../provider/AuthProvider'

function useGetInstructors() {

    const { loading } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()

    const { refetch: refetchInstructorsData,data:instructorsData=[] } = useQuery({
        queryKey: ['get_instructors'],
        enabled: !loading,
        queryFn: async () => {
          const res = await axiosSecure(`get_instructors`)
          return res.data
        }
      })
    
      return [instructorsData, refetchInstructorsData]
}

export default useGetInstructors