import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'
import { AuthContext } from '../provider/AuthProvider'

function useTopInstructor() {

  const { loading } = useContext(AuthContext)
  const [axiosSecure] = useAxiosSecure()


  // top 6 instrictor
  const {data:topInstructors=[] } = useQuery({
    queryKey: ['top_instructors'],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`top_instructors`)
      return res.data
    }
  })

  return [topInstructors]
}

export default useTopInstructor