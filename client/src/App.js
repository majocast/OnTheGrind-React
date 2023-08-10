import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import FAQ from './pages/FAQ';
import About from './pages/About';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Cart from './pages/Cart';

function LogLocation( { onLocationChange }) {
  const location = useLocation("");
  useEffect(() => {
    onLocationChange(location)
  }, [location, onLocationChange]);
  
  return null;
}

function App() {

  const [navBar, setNavBar] = useState(true);

  const handleLocationChange = (newLocation) => {
    console.log(newLocation);
    console.log(newLocation.pathname);
    if(newLocation.pathname !== '/login' && newLocation.pathname !== '/cart') { 
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  }

  return (
    <BrowserRouter>
      <div className="bg-[#d8ccb6] min-h-screen">
        {navBar ? <NavBar /> : null}
        <LogLocation onLocationChange={handleLocationChange}/>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
