import React from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa';
import img from '../../assets/err.svg'


function ErrorPage() {
    const navigate = useNavigate()
    const { error, status } = useRouteError()

    return (
        <div className='text-center flex flex-col items-center mt-16'>
            <img className='h-96' src={img} alt="img" />
            <p className='text-2xl font-semibold md:text-3xl mb-8 myDecoration '>
                {error?.message}
            </p>

            <button onClick={() => navigate('/')} className='btn bg-primaryColor hover:bg-white hover:text-primaryColor text-white flex items-center gap-3'>
                <FaArrowLeft className="h-6 w-6  text-white hover:text-primaryColor" />
                Back To Home</button>

        </div>
    )
}

export default ErrorPage