import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'
import { AuthContext } from '../provider/AuthProvider'

function useAllUser() {
    const { loading } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()

    const { refetch: refetchAllUser,data:allUserInfo=[] } = useQuery({
        queryKey: ['user'],
        enabled: !loading,
        queryFn: async () => {
          const res = await axiosSecure(`users`)
          return res.data
        }
      })
    
      return [allUserInfo, refetchAllUser]
}

export default useAllUser