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
   
    <div className='w-full min-h-[80vh] py-16 md:py-24 flex flex-col p-4 md:px-8 gap-16 md:gap-24 items-center justify-center bg-theme-light mb-16'>
        <HomeHero/>
        <WhatIWriteAbout/>
        <DevelopmentJourney/>
        <WhyReadMyBlog/>
        <div className='w-full max-w-8xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-8 md:gap-12'>
            <PostCard/>
        </div>
    </div>
  )
}

export default HomePage;