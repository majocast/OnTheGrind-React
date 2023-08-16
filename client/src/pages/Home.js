import React from 'react';
import About from './About';
import coffeevid from '../images/coffeevid.mp4';

function Home() {
  return (
    <div className='anime-rise flex flex-col items-center justify-center w-full h-full'>
      <section className='flex justify-center bg-black w-full'>
        <video className='' autoPlay loop muted>
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
      <section className='w-full flex justify-center'>
        <About />
      </section>
      <section className='rounded-2xl shadow-innder bg-[#47220f] my-4 py-4 flex-col h-full w-11/12 items-center text-center text-white'>
        <h1 className='uppercase text-5xl font-bold'>Who Are We?</h1>
        <p className='text-xl py-4 px-10'>A rag-tag group of college students who are obsessed with coffee have come together to make a 
        way for students to order their favorite types of teas and coffees. Fueled by a passion for coding and copious amounts of caffeine, 
        we four students strive to be your number one source of caffeinated products. We start small but aim to be able to ship all across 
        the world, providing wherever a student in need may be. We are here for the community just as much as we are here for ourselves. 
        Our names are Litzy, Mary Nicole, Jhon, and Marc, and we are...
        </p>
        <h2 className='uppercase text-3xl font-bold'>The Codebusters</h2>
      </section>
    </div>
    
  );
}

export default Home;