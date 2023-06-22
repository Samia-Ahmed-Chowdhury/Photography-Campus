import React from 'react'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import Rating from 'react-rating';

function SingleCardTes({ data }) {
    return (
        <div className="card w-80 lg:w-96 bg-base-100 shadow-xl mt-5 items-center">
            <figure className='btn-circle w-28 h-28 text-center mt-6'><img className='rounded-full' src={data.imgSrc} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title justify-center">{data.name}</h2>
                <p className='text-[#757575]'>{data.text}</p>
                <p className='font-bold text-center'>
                    <Rating className='text-primaryColor'
                        placeholderRating={data.rating}
                        emptySymbol={<FaStarHalfAlt />}
                        placeholderSymbol={<FaStar />}
                        fullSymbol={<FaStar />}
                        readonly
                    /> {data.rating}
                </p>
            </div>
        </div>
    )
}

export default SingleCardTes