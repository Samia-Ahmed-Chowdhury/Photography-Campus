import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'
import { AuthContext } from '../provider/AuthProvider'

function useGetUser(email) {
    const { loading } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()

    const { refetch: refetchUserData,data:userInfo=[] } = useQuery({
        queryKey: ['user',email],
        enabled: !loading,
        queryFn: async () => {
          const res = await axiosSecure(`user?email=${email}`)
          return res.data
        }
      })
    
      return [userInfo, refetchUserData]
    }

export default useGetUser