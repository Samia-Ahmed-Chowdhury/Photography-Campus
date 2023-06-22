import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'
import { AuthContext } from '../provider/AuthProvider'

function useGetClasses() {
    const { loading,userEmail } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()

    const { refetch: refetchClassesData,data:classesData=[] } = useQuery({
        queryKey: ['get_classes'],
        enabled: !loading,
        queryFn: async () => {
          const res = await axiosSecure(`get_classes?instructorEmail=${userEmail}`)
          return res.data
        }
      })
    
      return [classesData, refetchClassesData]
}

export default useGetClasses