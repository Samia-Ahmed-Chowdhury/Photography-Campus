import React, { useContext, useState } from 'react'
import useAxiosSecure from './useAxiosSecure'
import { AuthContext } from '../provider/AuthProvider'

const useUpPaymentStatus = () => {
    const [updatePaidStatus, setUpdatePaidStatus] = useState('')
    const { loading } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()

    const paymentStatusHandler = async (id, paymentStatus) => {
        console.log('first')
        await axiosSecure.patch(`get_classes/${id}?paymentStatus=${paymentStatus}`)
            .then(res => {
                console.log(res)
                setUpdatePaidStatus(res.data)
            })
    }

    return [paymentStatusHandler]
}

export default useUpPaymentStatus