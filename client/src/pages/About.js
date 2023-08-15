import React from 'react';
import JhonImg from '../images/jhon-photo.jpg'
import LitzyImg from '../images/litzy-photo.jpg'
import NicoleImg from '../images/nicole-photo.jpg'
import MarcImg from '../images/marc-photo.jpg'

const About = () => {
  const team = [
    {name: 'Jhon Aclan', major: 'Computer Science B.S.', college: 'SFSU Class of 2023', city: 'Fremont, CA', image: JhonImg},
    {name: 'Litzy Quevedo', major: 'Computer Science B.S.', college: 'SFSU Class of 2023', city: 'San Mateo, CA', image: LitzyImg},
    {name: 'Mary Nicole Tangog', major: 'Computer Science B.S.', college: 'SFSU Class of 2023', city: 'Hayward, CA', image: NicoleImg},
    {name: 'Marc Castro', major: 'Computer Science B.S.', college: 'SFSU Class of 2023', city: 'Los Angeles, CA', image: MarcImg}
  ];

  return (
    <div className='animate-rise flex flex-col items-center justify-center w-screen py-10'>
      <h1 className='uppercase text-5xl font-bold py-8 text-center'>The Team Behind The Grind</h1>
      <div className='grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-8 w-3/4 my-10'>
        {team.map((member) => {
          return (
            <div className='flex flex-col justify-center items-center'>
              <div className="bg-white w-72 h-full shadow-md rounded m-3">
                <div className="h-3/4 w-full">
                  <img className="w-full h-full object-cover rounded-t" src={member.image} alt={member.name} />
                </div>
                <div className="w-full h-1/4 m-3">
                  <span className="text-lg font-semibold uppercase tracking-wide ">{member.name}</span>
                  <p className="text-gray-600 text-sm leading-5 mt-1">{member.city}</p>
                  <p className="text-gray-600 text-sm leading-5 mt-1">{member.major} - {member.college}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default About;