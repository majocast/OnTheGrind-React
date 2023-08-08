import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import FAQ from './pages/FAQ';
import About from './pages/About';
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
