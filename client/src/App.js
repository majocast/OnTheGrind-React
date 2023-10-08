import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import FAQ from './pages/FAQ';
import About from './pages/About';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Account from './pages/Account';
import Checkout from './pages/Checkout';

function LogLocation( { onLocationChange } ) {
  const location = useLocation('');
  useEffect(() => {
    onLocationChange(location);
  }, [location, onLocationChange]);
  
  return null;
}

const routes = [
  { path: '/', component: Home},
  { path: '/products', component: Products },
  { path: '/faq', component: FAQ },
  { path: '/about', component: About },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/cart', component: Cart },
  { path: '/account', component: Account },
  { path: '/checkout', component: Checkout },
]

function App() {
  const [navBar, setNavBar] = useState(true);
  console.log(process.env.REACT_APP_OTG_SERVER);

  const handleLocationChange = (newLocation) => {
    if(newLocation.pathname !== '/login' && newLocation.pathname !== '/cart' && newLocation.pathname !== '/register' && newLocation.pathname !== '/checkout' ) { 
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col bg-[#d8ccb6] min-h-screen">
        <div className='flex flex-shrink-0'>
          {navBar ? <NavBar/> : null}
        </div>
        <div className='flex-grow pt-20'>
          <LogLocation onLocationChange={handleLocationChange}/>
          <Routes>
            {routes.map((route, index) => {
              return (<Route key={route.path} path={route.path} element={<route.component />} />)
            })}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
