import React from 'react'
import useTopRanks from '../../hooks/useTopRanks'
import { motion } from "framer-motion"
import { useInView } from 'react-intersection-observer';

function TopClasses() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: '-50px 0px', 
    });

    const cardVariants = {
        hidden: {
            opacity: 0,
            scale: 0.5,
            y: 50,
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.3,
            },
        },
    };

    const [topClsRanks] = useTopRanks()
    // console.log(topClsRanks)

    return (


        <div className=' my-12 mx-5 lg:mx-16 '>
            <h1 className='text-center font-bold text-3xl mb-3 text-primaryColor'>Our Top 6 Classes</h1>
            <p className='text-lg mb-10 mx-auto text-paragraphColor font-medium text-center lg:w-1/2'>Photography is a way of feeling, of touching, of loving. What you have caught on film is captured forever... it remembers little things, long after you have forgotten everything</p>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-y-10  max-w-7xl  mx-auto'>
                {
                    topClsRanks.map(item =>

                        <div key={item._id} className="mx-auto card md:w-96 bg-base-100 shadow-xl rounded-none">
                            <motion.div
                                ref={ref}
                                className="card mx-auto md:w-96 bg-base-100 shadow-xl rounded-none"
                                variants={cardVariants}
                                initial="hidden"
                                animate={inView ? 'visible' : 'hidden'}
                            >
                                <figure><img className='h-64 w-[100%]' src={item.classImage} alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{item.className}</h2>
                                    <p>Num of Std: {item.numOfStd}</p>
                                    <p>instructorName: {item.instructorName}</p>
                                    <div className="card-actions justify-end">
                                        <button className="text-primaryColor font-semibold">Discover More</button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default TopClasses