import React, { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'
import { AuthContext } from '../provider/AuthProvider'

function useTopRanks() {

  const { loading } = useContext(AuthContext)
  const [axiosSecure] = useAxiosSecure()
// top 6 classes
  const { refetch: refetchTopsData,data:topClsRanks=[] } = useQuery({
    queryKey: ['top_classes'],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`top_classes`)
      return res.data
    }
  })

  return [topClsRanks, refetchTopsData]
}

export default useTopRanks