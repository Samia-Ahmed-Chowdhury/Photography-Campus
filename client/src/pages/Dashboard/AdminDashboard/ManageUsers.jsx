import React from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import Swal from 'sweetalert2'
import useAllUser from '../../../hooks/useAllUser'
import { FaUserGraduate } from 'react-icons/fa'
import { MdAdminPanelSettings } from 'react-icons/md'
import { TbSlashes } from 'react-icons/tb'

function ManageUsers() {
  const [allUserInfo, refetchAllUser] = useAllUser()
  const [axiosSecure] = useAxiosSecure()

  const roleHandler = (user, setRole) => {
    axiosSecure.patch(`/update_user_role/${user._id}?role=${setRole}`)
      .then(res => {
        if (res.data?.modifiedCount > 0) {
          Swal.fire(
            `${user.name} is ${setRole} now`,
            'success'
          )
          refetchAllUser()
        }
      }
      )
  }

  return (
    <>
      {
        allUserInfo && Array.isArray(allUserInfo) && allUserInfo.length > 0 ? (
          <div className='lg:px-12 px-5 '>
            <div className='my-8  '>
              <h2 className='text-center text-3xl font-medium  mx-auto'>My All Classes </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="table  table-xs text-center">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User Image</th>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    allUserInfo.map((user, index) =>
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={user?.image} alt="Avatar Tailwind CSS Component" />
                            </div>
                          </div>
                        </td>
                        <td>{user?.name}</td>
                        <td>{user?.email}</td>
                        <td>{user?.role}</td>
                        <td className='space-x-3'>
                          <button className={`${user?.role === 'instructor'?'text-gray-300':''}`}
                            onClick={() => roleHandler(user, 'instructor')}
                            disabled={user?.role === 'instructor' && "disabled"}>
                            <MdAdminPanelSettings className={`w-7 h-7 mx-auto`} />
                            Make Instructor</button>
                          <TbSlashes className='text-primaryColor inline' />
                          <button className={`${user?.role === 'admin'?'text-gray-300':''}`} 
                             onClick={() => roleHandler(user, 'admin')}
                            disabled={user?.role === 'admin' && "disabled"}>
                            <FaUserGraduate className='w-6 h-6  mx-auto'/>
                            Make Admin</button>
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        )
          :
          <h1 className='text-center mt-16 font-bold'>Not user Data available</h1>
      }
    </>
  )
}

export default ManageUsers