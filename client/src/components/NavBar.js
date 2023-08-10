import React from 'react';
import { Link } from'react-router-dom';
import Logo from '../images/logo.png';
import CartLogo from '../images/cart.png';
import ProfLogo from '../images/profile.png';

const NavBar = () => {
  return (
    <nav className='flex list-none w-100 bg-[#47220f] align-center justify-between text-white py-2 px-4'>
      <ul className='flex space-x-10 items-center justify-center'>
        <li><img src={Logo} alt='logo' className='w-60'/></li>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/products'>Products</Link></li>
        <li><Link to='/faq'>FAQ</Link></li>
        <li><Link to='/about'>About</Link></li>
      </ul>
      <ul className='flex space-x-4 justify-evenly w-100 items-center'>
        <li><img src={CartLogo} alt='cartLogo' className='w-10'/></li>
        <li><img src={ProfLogo} alt='profLogo' className='w-16'/></li>
      </ul>
    </nav>
  )
}

export default NavBar;