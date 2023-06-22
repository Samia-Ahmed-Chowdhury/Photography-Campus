import React from 'react'
import './Service.css'
import img1 from '../../../assets/h3.jpg'
import img2 from '../../../assets/h2.jpg'
import img3 from '../../../assets/h4.jpg'
import img4 from '../../../assets/h5.jpg'
import { Fade, Slide } from "react-awesome-reveal";
import { useInView } from 'react-intersection-observer';

function Service() {
    const theme = localStorage.getItem("theme")

    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: '-50px 0px',
    });


    const silde = [
        {
            imgSrc: img2,
            text: 'Live Teaching'
        },
        {
            imgSrc: img3,
            text: 'Live Shoot'
        },
        {
            imgSrc: img4,
            text: 'Live Training'
        }
    ]

    return (
        <div ref={ref} className='service_bg px-5 pb-5 mt-12 '>
        <div className={`font-bold text-3xl mb-56 text-center mx-auto ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        <Fade  delay={1e3} cascade damping={1e-1}>
                Taking pictures is savoring life intensely, every hundredth of a second
            </Fade>
        </div>
         
            <img className='mx-auto lg:w-[500px] mt-[-200px]' src={img1} alt="..." />
            <Slide>
            <h4 className='text-center font-bold text-3xl my-8 text-white'>Explore How Can I Help You</h4>
      </Slide>


            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-y-6   max-w-7xl  mx-auto '>
                {
                    silde.map((item, index) =>
                        <div key={index} className=' flex flex-col items-center'>
                            <img src={item.imgSrc} className='w-80 h-56' alt="..." />
                            <button className=' mt-[-30px] btn  bg-primaryColor text-white border-0 border-b-4 border-l-4 hover:border-0 hover:bg-primaryColor capitalize'> {item.text} </button>
                        </div>
                    )

                }
            </div>
        </div>
    )
}

export default Service