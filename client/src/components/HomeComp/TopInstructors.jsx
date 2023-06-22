import React from 'react'
import useTopInstructor from '../../hooks/useTopInstructor'
import './TopInstructors.css'
function TopInstructors() {
    const [topInstructors] = useTopInstructor()

    const theme=localStorage.getItem("theme")

    return (
        <div className=' my-24 lg:mx-16 mx-5'>
            <h1 className={`text-center font-bold text-3xl mb-8 ${theme==='dark'?'text-white' :'text-black'}`}>Most Popular Instructor</h1>
            <div className='grid  md:grid-cols-2 lg:grid-cols-3  justify-center gap-4 max-w-7xl  mx-auto'>
                {
                    topInstructors.map(item =>
                        <div key={item._id} className='prof-container mx-auto'>
                            <div className='box flex flex-col items-center'>
                                <img className='img-box mx-auto' src={item.image} alt="profile-img" />
                                <h2 className='box_text hidden  text-[20px]  text-white capitalize font-medium' >{item.name}</h2>
                                <h3 className='my-7 box_text hidden text-white capitalize font-medium'>{item.email}</h3>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )

  
}

export default TopInstructors