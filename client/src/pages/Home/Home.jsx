import React from 'react'
import Hero from '../../components/HomeComp/Hero'
import TopClasses from '../../components/HomeComp/TopClasses'
import TopInstructors from '../../components/HomeComp/TopInstructors'
import Service from '../../components/HomeComp/service/Service'
import CountDown from '../../components/HomeComp/CountDown/CountDown'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react'
import Testimonial from '../../components/HomeComp/Testimonial/Testimonial'

function Home() {

  useEffect(() => {
    AOS.init();
  }, []);
  

  return (
    <>
      <Hero/>
      <TopClasses/>
      <TopInstructors/>
      <CountDown/>
      <Service/>
      <Testimonial/>
    </>
  )
}

export default Home