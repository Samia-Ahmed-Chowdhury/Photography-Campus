import React, { useContext } from 'react'
import { AuthContext } from '../../provider/AuthProvider'
import useGetUser from '../../hooks/useGetUser'
import useBookedClasses from '../../hooks/useBookedClasses'
import useApprovedClass from '../../hooks/useApprovedClass'
import { useLocation, useNavigate } from 'react-router-dom'

function Classes() {
    const [bookedStatusHandler] = useBookedClasses()
    const [ApprovedCls] = useApprovedClass()
    const { userEmail } = useContext(AuthContext)
    const [userInfo] = useGetUser(userEmail)
    console.log(ApprovedCls)
    const theme=localStorage.getItem("theme")

    const location = useLocation();
    const navigate = useNavigate()

    const selectHandler=(item)=>{
        if (userEmail) {
            bookedStatusHandler(item, userEmail)
          }
          else {
            navigate('/login', { state: { from: location }, replace: true });
          }
    }

    return (
        <div className=' my-12 lg:mx-16 mx-5'>
         <h1 className={`text-center font-semibold text-3xl mb-10 ${theme==='dark'?'text-white' :'text-black'}`}>Browse All Classes</h1>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl  mx-auto'>
                {
                    ApprovedCls.map(item =>
                        <div key={item._id}
                            className={`card md:w-96 ${item.availableSeats <= 0 ? 'bg-red-600' : 'bg-base-100'} shadow-xl`}>
                            <figure><img className='h-64 w-[100%]' src={item.classImage} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{item.className}</h2>
                                <p>Num of Std: {item.numOfStd}</p>
                                <p>instructorName: {item.instructorName}</p>
                                <p>Available seats: {item.availableSeats}</p>
                                <p>price: {item.price}</p>
                                <div className="card-actions justify-end">
                                    <button
                                        onClick={()=>selectHandler(item)}
                                        className="btn btn-primary"
                                        disabled={userInfo.role === 'admin' || userInfo.role === 'instructor' || item.availableSeats <= 0 && "disabled"}>
                                        Select</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Classes