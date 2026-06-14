import React from 'react'
import {Link} from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';
import NotesGrid from '../components/NotesGrid';
import HomeHero from '../components/HomeHero';
import WhatIWriteAbout from '../components/WhatAbout';
import DevelopmentJourney from '../components/DevelopmentJourney';
import WhyReadMyBlog from '../components/WhyReadMyBlog';


const HomePage = () => {
  return (
    <div className='w-full py-16 md:py-24  flex-col'>
        <HomeHero/>
        <WhatIWriteAbout/>
        <DevelopmentJourney/>
        <WhyReadMyBlog/>
      
    </div>
  )
}

export default HomePage