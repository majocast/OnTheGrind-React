import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import About from './About';
import Lottie from 'lottie-react';
import CoffeeAnimation from '../images/coffee-animation.json';
import coffeevid from '../images/coffeevid.mp4';

function Home() {
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = 'auto';
  }, [location.pathname])

  return (
    <div className='anime-rise flex flex-col items-center justify-center w-full h-full'>
      <section className='flex justify-center bg-black w-full'>
        <video className='' autoPlay loop muted>
          <source src={coffeevid} type="video/mp4" />
        </video>
      </section>
      <section className='flex rounded-2xl shadow-innder my-4 py-4 h-full w-11/12 items-center text-center text-white'>
        <Lottie
          className='w-full m-0 p-0'
          animationData={CoffeeAnimation}
          loop
          autoplay
        />
        <div className='rounded-2xl text-[#47220f] text-start'>
          <h1 className='uppercase text-3xl sm:text-3xl md:text-5xl lg:text-5xl font-bold'>Welcome {localStorage.getItem('username') ? localStorage.getItem('username') : null}</h1>
          <p className='text-lg sm:text-lg md:text-xl lg:text-xl py-2'>We offer a variety of high quality coffee beans 
            and tea leaves from different parts of the world. Even the highest grade 
            coffee will taste bad if it is old. With that concern in mind, we roast 
            our craft coffees all day long. we ensure orders travel straight from our 
            roaster to your doorstep. That way, your coffee arrives as close to its 
            roast date as possible.
          </p>
        </div>
      </section>
    </div>
    
  );
}

export default Home;