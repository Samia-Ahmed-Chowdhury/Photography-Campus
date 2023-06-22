import React, { useEffect,useRef  } from 'react'
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import './slider-animations.css';

const content = [
	{
		title: 'Photography skills need to learn.',
		description:
		'Book our classes to become a top photographer',
		button: 'Book Now',
		image: 'https://images.unsplash.com/photo-1682687982134-2ac563b2228b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMTh8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
		user: 'Luan Gjokaj',
		userProfile: 'https://i.imgur.com/JSW6mEk.png'
	},
	{
		title: 'Photography helps people to see.',
    description:
		'Book our classes to become a top photographer',
		button:'Book Now',
		image: 'https://images.unsplash.com/photo-1685810063083-0963738b978c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMTd8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
		user: 'Erich Behrens',
		userProfile: 'https://i.imgur.com/0Clfnu7.png'
	},
	{
		title: 'You might be a photographer if',
		description:
		'Book our classes to become a top photographer',
    	button: 'Book Now',
		image: 'https://images.unsplash.com/photo-1682687220777-2c60708d6889?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw4OHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
		user: 'Bruno Vizovskyy',
		userProfile: 'https://i.imgur.com/4KeKvtH.png'
	},
	{
		title: 'Wherever there is light, one can photograph',
		description:
		'Book our classes to become a top photographer',
    button:'Book Now',
		image: 'https://images.unsplash.com/photo-1682687982141-0143020ed57a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2OHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
		user: 'Bruno Vizovskyy',
		userProfile: 'https://i.imgur.com/4KeKvtH.png'
	}
	,
	{
		title: 'The pictures are there, and you just take them',
		description:
		'Book our classes to become a top photographer',
    button:'Book Now',
		image: 'https://images.unsplash.com/photo-1682687220801-eef408f95d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2M3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
		user: 'Bruno Vizovskyy',
		userProfile: 'https://i.imgur.com/4KeKvtH.png'
	}
];

function Hero() {

  const sliderRef = useRef(null);
  
  useEffect(() => {
    const autoplay = setInterval(() => {
      if (sliderRef.current && sliderRef.current.next) {
        sliderRef.current.next();
      }
    }, 5000);

    return () => {
      clearInterval(autoplay);
    };
  }, []);

  return (
    <>
		<Slider className=" slider-wrapper" ref={sliderRef}>
			{content.map((item, index) => (
				<div
					key={index}
					className="slider-content"
					style={{ background: `url('${item.image}') no-repeat center center` }}
				>
					<div className="inner">
						<h1>{item.title}</h1>
						<p>{item.description}</p>
						<button className='btn bg-primaryColor text-white border-0 border-b-4 border-l-4 hover:border-0 hover:bg-primaryColor'>{item.button}</button>
					</div>
					<section>
						<img src={item.userProfile} alt={item.user} />
						<span>
							Captured by <strong>{item.user}</strong>
						</span>
					</section>
				</div>
			))}
		</Slider>
    </>
  )
}

export default Hero