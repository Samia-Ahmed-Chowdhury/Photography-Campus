import { Outlet } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import { FaUsers, FaCcAmazonPay } from 'react-icons/fa';
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { MdAssignmentAdd } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { ImBooks } from "react-icons/im";
import { AiFillAccountBook, AiFillHome, AiOutlineLogin } from "react-icons/ai";
import { GiBookCover, GiTeacher } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import Footer from '../shared/Footer/Footer';
import useGetUser from '../hooks/useGetUser';
import Dashboard from '../components/Dashboard/Dashboard';


function DashboradLayout() {
    const { userEmail,logOut } = useContext(AuthContext)
    const [userInfo] = useGetUser(userEmail)

    const [showFull, setShowFull] = useState(false)

    return (
        <>
            <div className='grid grid-cols-[.1fr,minmax(200px,1fr)] md:grid-cols-[.1fr,1fr] '>
                <div onMouseEnter={() => setShowFull(true)} onMouseLeave={() => setShowFull(false)} 
                className='bg-primaryColor w-2/3 hover:w-[94%] h-[100%]'>
                    <ul className={`menu text-white content-center my-10 space-y-7 bg-primaryColor  
                    ${showFull && 'w-auto'}`}>

                        {
                            userInfo.role === 'student' &&
                            <>
                                <li className='font-medium text-lg whitespace-nowrap'><Link to='my_selected_classes'>
                                    <BsFillBookmarkHeartFill className='w-8 h-8 ' />
                                    {showFull && 'My Selected Classes'}
                                </Link></li>
                                <li className='font-medium text-lg whitespace-nowrap'><Link to='my_enrolled_classes'>
                                    <AiFillAccountBook className='w-8 h-8' />
                                    {showFull && 'My Enrolled Classes'}
                                </Link></li>
                                <li className='font-medium text-lg whitespace-nowrap'><Link to='my_payment_history'>
                                    <FaCcAmazonPay className='w-8 h-8' />
                                    {showFull && 'Payment History'}
                                </Link></li>
                            </>
                        }
                        {
                            userInfo.role === 'instructor' &&
                            <>
                                <li className='font-medium text-lg whitespace-nowrap'><Link to='add_class'>
                                    <MdAssignmentAdd className='w-8 h-8' />
                                    {showFull && 'Add A Class'}
                                </Link></li>
                                <li className='font-medium text-lg whitespace-nowrap'><Link to="my_classes">
                                    <GiBookCover className='w-8 h-8' />
                                    {showFull && 'My Classes'} </Link></li>
                            </>
                        }
                        {
                            userInfo.role === 'admin' &&
                            <>
                                <li className='font-medium text-lg whitespace-nowrap'><Link to="manage_classes">
                                    <ImBooks className='w-8 h-8' />
                                    {showFull && 'Manage Classes'}
                                </Link></li>
                                <li className='font-medium text-lg whitespace-nowrap'><Link to="manage_users">
                                    <FaUsers className='w-8 h-8' />
                                    {showFull && 'Manage Users'}
                                </Link></li>
                            </>
                        }
                        <hr />

                        <li className='font-medium text-lg whitespace-nowrap'><Link to="/">
                            <AiFillHome className='w-8 h-8' />
                            {showFull && 'Home'}
                        </Link></li>
                        <li className='font-medium text-lg whitespace-nowrap'><Link to="/instructors">
                            <GiTeacher className='w-8 h-8' />
                            {showFull && '/Instructors'}
                        </Link></li>
                        <li className='font-medium  text-lg whitespace-nowrap'><Link to="/classes">
                            <SiGoogleclassroom className='w-8 h-8' />
                            {showFull && 'Classes'}
                        </Link></li>

                        <li className='font-medium text-lg whitespace-nowrap'><Link onClick={logOut} to="/login">
                            <AiOutlineLogin className='w-8 h-8' />
                            {showFull && 'Logout'}
                        </Link></li>


                    </ul>
                </div>
                <div>
                    <div className='min-h-[53vh]'>
                        <Dashboard />
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default DashboradLayout