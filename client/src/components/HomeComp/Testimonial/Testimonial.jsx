import React from 'react'
import Marquee from "react-fast-marquee";
import SingleCardTes from './SingleCardTes';

function Testimonial() {

    return (
        <div className='mb-28 mt-24'>
            <h2 className="text-4xl text-center font-medium md:mx-auto md:w-[30%] mb-10 mx-5">Provide Best Service To Our Follower With Our Tools</h2>
            <Marquee pauseOnHover className='my-12'>
                <div className='flex mx-5 lg:mx-0 gap-8'>
                    {
                        testmonialData.map(data => <SingleCardTes key={data.id} data={data} />)
                    }
                </div>
            </Marquee>
        </div>
    )
}

export default Testimonial

const testmonialData = [
    {
        "id": 1,
        "imgSrc": "https://images.unsplash.com/photo-1567722066597-2bdf36d13481?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        "name": "Samia",
        "text": "Teaching is more than imparting knowledge; it is inspiring change. Learning is more than absorbing facts; it is acquiring understanding..",
        "rating": 4.5
    },
    {
        "id": 2,
        "imgSrc": "https://images.unsplash.com/photo-1558624232-75ee22af7e67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
        "name": "Nadia",
        "text": "Good teachers are the ones who can challenge young minds without losing their own.Educators are the only people who lose sleep over other people's kids.",
        "rating": 4.1
    },
    {
        "id": 3,
        "imgSrc": "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcnRvb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        "name": "Sam Ahmed",
        "text": "The dream begins with a teacher who believes in you, who tugs and pushes and leads you to the next plateau, sometimes poking you with a sharp stick called 'truth.'",
        "rating": 4.9
    },
    {
        "id": 4,
        "imgSrc": "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FydG9vbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        "name": "Saif",
        "text": "Everyone who remembers his own education remembers teachers, not methods and techniques. The teacher is the heart of the educational system.",
        "rating": 4.4
    },
]