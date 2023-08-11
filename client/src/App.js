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

function LogLocation( { onLocationChange }) {
  const location = useLocation("");
  useEffect(() => {
    onLocationChange(location)
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
]

function App() {

  const [navBar, setNavBar] = useState(true);

  const handleLocationChange = (newLocation) => {
    console.log(newLocation);
    console.log(newLocation.pathname);
    if(newLocation.pathname !== '/login' && newLocation.pathname !== '/cart' && newLocation.pathname !== '/register') { 
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
          {routes.map((route, index) => {
            return (<Route key={route.path} path={route.path} element={<route.component />} />)
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
