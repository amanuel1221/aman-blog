import React from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import AboutPage from './pages/AboutPage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        
        <Route path='/' element={<HomePage />} />
        <Route path='/details' element={<DetailsPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/blog' element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;