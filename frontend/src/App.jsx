import React from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import AboutPage from './pages/AboutPage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import BlogPage from './pages/BlogPage';

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        
        <Route path='/' element={<HomePage />} />
        <Route path='/details' element={<DetailsPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/blogs' element={<BlogPage />} />
        <Route path='/blogs/:id' element={<DetailsPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;