import React from 'react'
import { FaUserTie,FaUtensils,FaThumbsUp,FaStar, FaUsers } from 'react-icons/fa';
import SingleBox from './SingleBox'
import './style.css'
import { GiBookCover } from 'react-icons/gi';
function CountDown() {
    return (
        <div className='background py-10 my-20'>
        <div data-aos="zoom-out">
            <h2  className='text-4xl md:text-5xl font-semibold text-center text-white'>Our Success !!!</h2>
            </div>
            <div className='grid  lg:grid-cols-4 gap-8 pt-10 pb-4 justify-center mx-5 lg:mx-16'>
               {
                cardData.map((ele)=><SingleBox key={ele.id} ele={ele} />)
               }
            </div>
        </div>
    )
}

const cardData = [
    {
        "id": 1,
        "icon":<FaUserTie/>,
        "count": 130,
        "title": "World class Instructor"
    },
    {
        "id": 2,
        "count": 510,
        "icon":<GiBookCover/>,
        "title": "Best Classes"
    },
    {
        "id": 3,
        "count": 3000,
        "icon":<FaUsers/>,
        "title": "Total Student"
    },
    {
        "id": 4,
        "count": 2000,
        "icon":<FaThumbsUp/>,
        "title": "Total Likes"
    },
]

export default CountDown