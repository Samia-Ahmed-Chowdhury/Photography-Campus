import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'
import { AuthContext } from '../provider/AuthProvider'

function useStdActivateCls(email,status) {

    const { loading } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()
    const { refetch:refetchStdActivateCls, data: stdActivateClsData = [] } = useQuery({
        queryKey: ['get_std_classes', email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`get_std_classes?studentEmail=${email}&paymentStatus=${status}`)
            return res.data
        }
    })

    return [stdActivateClsData, refetchStdActivateCls]
}

export default useStdActivateCls