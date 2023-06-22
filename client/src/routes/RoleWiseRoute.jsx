import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { AuthContext } from '../provider/AuthProvider';
import useGetUser from '../hooks/useGetUser';

function RoleWiseRoute({ children }) {
  const { userEmail, loading } = useContext(AuthContext)
  const[userInfo]=useGetUser(userEmail)
  const location = useLocation();
  // console.log(location)

  if (loading) {
    return <div className='text-center flex justify-center my-16'>
      <TailSpin
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  }
  if (userInfo.role==='student') {
    return children
  }
  if (userInfo.role==='admin') {
    return children
  }
  if (userInfo.role==='instructor') {
    return children
  }
 
}

export default RoleWiseRoute
