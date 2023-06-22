import React, { useContext } from 'react'
import { AuthContext } from '../../provider/AuthProvider'
import useGetUser from '../../hooks/useGetUser'
import useGetInstructors from '../../hooks/useGetInstructors'

function Instructors() {
    
    const theme=localStorage.getItem("theme")

  const [instructorsData]=useGetInstructors()
  // console.log(instructorsData)

  return (
<div className=' my-12 lg:mx-16 mx-5'>
<h1 className={`text-center font-semibold text-3xl mb-10 ${theme==='dark'?'text-white' :'text-black'}`}>Best Instructors</h1>
    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl  mx-auto'>
        {
            instructorsData.map(item =>
                <div key={item._id} 
                className={`card md:w-96 ${item.availableSeats<=0?'bg-red-600':'bg-base-100'} shadow-xl`}>
                    <figure><img className='h-64 w-[100%]' src={item.image} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{item.name}</h2>
                        <p> {item.email}</p>
                            <button className="text-start font-bold text-primaryColor">Show Classes</button>
                    </div>
                </div>
            )
        }
    </div>
   </div>
  )
}

export default Instructors