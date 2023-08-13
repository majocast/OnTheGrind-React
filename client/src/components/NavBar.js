import React, { useEffect, useState } from 'react';
import { Link } from'react-router-dom';
import Logo from '../images/logo.png';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const NavBar = () => {
  const [username, setUser] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('username')) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, [localStorage.getItem('username')]);

  return (
    <div className='fixed top-0 left-0 w-screen z-10'>
      <nav className='flex list-none w-100 bg-[#47220f] align-center justify-between text-white font-bold py-2 px-4'>
        <ul className='flex space-x-10 items-center justify-center uppercase'>
          <li><img src={Logo} alt='logo' className='w-60'/></li>
          <li><Link className='ease-in-out duration-200 hover:text-[#d8ccb6]' to='/'>Home</Link></li>
          <li><Link className='ease-in-out duration-200 hover:text-[#d8ccb6]' to='/products'>Products</Link></li>
          <li><Link className='ease-in-out duration-200 hover:text-[#d8ccb6]' to='/faq'>FAQ</Link></li>
          <li><Link className='ease-in-out duration-200 hover:text-[#d8ccb6]' to='/about'>The Team</Link></li>
        </ul>
        <ul className='flex space-x-6 mr-2 justify-evenly w-100 items-center'>
          <li><Link to='/cart'><AiOutlineShoppingCart className='ease-in-out duration-200 hover:text-[#d8ccb6]' size={40}/></Link></li>
          <li><Link to={username ? '/account' : '/login'}><CgProfile className='ease-in-out duration-200 hover:text-[#d8ccb6]' size={40}/></Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar;