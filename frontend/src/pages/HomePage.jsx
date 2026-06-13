import React from 'react'
import {Link} from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';


const HomePage = () => {
  return (
    <div className='w-full bg-gray-100 flex flex-col'>
         <h1 className='text-3xl font-bold mt-8'>Welcome to Aman Blog</h1>
         <Link to='/blog' className='text-lg mt-4 text-blue-500'>Go to Blog Page</Link>
         <Link to='/about' className='text-lg mt-4 text-blue-500'>Go to About Page</Link>
         <Link to='/details' className='text-lg mt-4 text-blue-500'>Go to Details Page</Link>
       <div> <PostCard /> </div>
    </div>
  )
}

export default HomePage