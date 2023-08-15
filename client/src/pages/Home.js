import React from 'react';
import coffeevid from '../images/coffeevid.mp4';

function Home() {

  return (
    <div className='anime-rise flex flex-col items-center justify-center w-full h-full'>
      <section className='flex justify-center w-full bg-black'>
        <video autoPlay loop muted>
          <source src={coffeevid} type="video/mp4" />
        </video>
      </section>
      <section className='rounded-2xl shadow-innder bg-[#47220f] my-4 py-4 flex-col h-full w-11/12 items-center text-center text-white'>
        <h1 className='uppercase text-5xl font-bold'>Welcome {localStorage.getItem('username') ? localStorage.getItem('username') : null}</h1>
        <p className='text-xl py-2 px-10'>We offer a variety of high quality coffee beans 
          and tea leaves from different parts of the world. Even the highest grade 
          coffee will taste bad if it is old. With that concern in mind, we roast 
          our craft coffees all day long. we ensure orders travel straight from our 
          roaster to your doorstep. That way, your coffee arrives as close to its 
          roast date as possible.
        </p>
      </section>
    </div>
    
  );
}

export default Home;