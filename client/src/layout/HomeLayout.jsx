import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../shared/Navbar/Navbar'
import Footer from '../shared/Footer/Footer'

function HomeLayout() {
  return (
   <div className='overflow-x-hidden'>
    <Navbar/>
    <Outlet/>
    <Footer/>
   </div>
  )
}

export default HomeLayout