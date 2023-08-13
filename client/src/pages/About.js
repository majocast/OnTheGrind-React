import React from 'react';
import JhonImg from '../images/jhon-photo.jpg'
import LitzyImg from '../images/litzy-photo.jpg'
import NicoleImg from '../images/nicole-photo.jpg'
import MarcImg from '../images/marc-photo.jpg'

const About = () => {
  const team = [
    {name: 'Jhon Raimond Suelto Aclan', major: 'Computer Science B.S.', college: 'SFSU Class of 2023', city: 'Fremont, CA', image: JhonImg},
    {name: 'Litzy Mesinas Quevedo', major: 'Computer Science B.S.', college: 'SFSU Class of 2023', city: 'San Mateo, CA', image: LitzyImg},
    {name: 'Mary Nicole Tangog', major: 'Computer Science B.S.', college: 'SFSU Class of 2023', city: 'Hayward, CA', image: NicoleImg},
    {name: 'Marc Joseph Guerrero Castro', major: 'Computer Science B.S.', college: 'SFSU Class of 2023', city: 'Los Angeles, CA', image: MarcImg}
  ];

  return (
    <div className='flex flex-col items-center justify-center h-full w-screen'>
      <h1 className='text-3xl font-bold underline'>The Team Behind The Grind</h1>
      <div className='grid grid-cols-2 gap-10 pb-8 w-5/6 border-2'>
        {team.map((member) => {
          return (
            <div class="bg-white w-72 h-96 shadow-md rounded m-3 flex flex-col justify-center items-center">
              <div class="h-3/4 w-full flex justify-center items-center">
                <img class="w-full h-full object-cover rounded-t" src={member.image} alt={member.name} />
              </div>
              <div class="w-full h-1/4 p-3 flex flex-col justify-center items-center">
                <span class="text-lg font-semibold uppercase tracking-wide ">{member.name}</span>
                <p class="text-gray-600 text-sm leading-5 mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default About;