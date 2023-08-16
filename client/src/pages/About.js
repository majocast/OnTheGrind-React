import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import JhonImg from '../images/jhon-photo.jpg'
import LitzyImg from '../images/litzy-photo.jpg'
import NicoleImg from '../images/nicole-photo.jpg'
import MarcImg from '../images/alt-marc-photo.jpg'
import MarcImg2 from '../images/marc-photo.jpg'

const About = () => {
  const location = useLocation();
  const [reworkShow, setReworkShow] = useState(true);

  useEffect(() => {
    if(location.pathname === '/about') {
      console.log('in about');
      setReworkShow(true);
    } else {
      setReworkShow(false);
    }
  }, location.pathname);


  const team = [
    {name: 'Jhon Aclan', major: 'Computer Science B.S.', college: 'SFSU 2023', city: 'Fremont, CA', image: JhonImg},
    {name: 'Litzy Quevedo', major: 'Computer Science B.S.', college: 'SFSU 2023', city: 'San Mateo, CA', image: LitzyImg},
    {name: 'Mary Nicole Tangog', major: 'Computer Science B.S.', college: 'SFSU 2023', city: 'Hayward, CA', image: NicoleImg},
    {name: 'Marc Castro', major: 'Computer Science B.S.', college: 'SFSU 2023', city: 'Los Angeles, CA', image: MarcImg}
  ];

  return (
    <div className='animate-rise flex flex-col items-center justify-center w-full py-10'>
      <h1 className='uppercase text-5xl font-bold py-8 text-center'>The Team Behind The Grind</h1>
      <div className='grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-8 w-3/4 '>
        {team.map((member) => {
          return (
            <div className='flex flex-col justify-center items-center'>
              <div className="border-4 border-[#47220f] bg-[#47220f] w-72 h-full shadow-md rounded m-3">
                <div className="h-3/4 w-full">
                  <img className="w-full h-full object-cover rounded-t" src={member.image} alt={member.name} />
                </div>
                <div className="w-full h-1/4 m-3">
                  <span className="text-white text-lg font-semibold uppercase tracking-wide ">{member.name}</span>
                  <p className="text-white text-sm leading-5 mt-1">{member.city}</p>
                  <p className="text-white text-sm leading-5 mt-1">{member.major} - {member.college}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {reworkShow ? 
      <section className='flex flex-col justify-center items-center bg-white p-6'>
        <h1 className='uppercase text-5xl font-bold py-4 text-center'>The Man Behind The Rebuild</h1>
        <div className="p-6 sm:p-12 dark:bg-gray-900 dark:text-gray-100 bg-[#d8ccb6] border-4 border-[#47220f] rounded-2xl w-5/6">
          <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
            <img src={MarcImg2} alt="" className="self-center flex-shrink-0 w-24 h-24 border-2 border-[#47220f] rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-700" />
            <div className="flex flex-col">
              <h4 className="text-lg font-semibold text-center md:text-left">Marc Castro</h4>
              <p className="dark:text-gray-400">
                My name is Marc Castro, and a year later my love for caffeinated drinks has not changed.
                With that being said, I revisited this company website to remake and redesign the layout and functionality of our 
                website to highlight just how far we have come as owners and developers. With the power of the MERN Stack
                (MongoDB, Express, React, and Node.js) and our supporters, we now have created a website that displays not only
                our delicious coffee bean selection, but also what we, <span className='font-bold'>The Codebusters</span>, wake up to every morning... to a grind!
              </p>
            </div>
          </div>
        </div>
      </section> : null}
    </div>
  )
}

export default About;