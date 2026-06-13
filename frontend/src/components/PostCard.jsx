import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import mockPosts from '../store/mockPosts';

const PostCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {mockPosts.map((post) => (
        <article
          key={post.id}
          className="flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
        >

          <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />

            {post.category && (
              <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">
                {post.category}
              </span>
            )}
          </div>

          <div className="flex flex-col flex-grow p-6">


            <div className="flex items-center justify-between w-full mb-4 text-base text-gray-700 border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2 min-w-0">
                <NavLink to="/about" className="hover:text-blue-600 transition-colors flex items-center gap-2 cursor-pointer">
                <FaUserCircle className="text-gray-400 w-6 h-6 shrink-0" /> </NavLink>
               
                 <NavLink to="/about" className="hover:text-blue-600 transition-colors flex items-center gap-2 cursor-pointer"><span className="font-bold text-gray-900 truncate">{post.author}</span> </NavLink>
              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 whitespace-nowrap">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </div>


           <NavLink
                to={`/blogs/${post.id}`} ><h2 className="text-2xl font-extrabold text-gray-900 line-clamp-2 mb-3 hover:text-blue-600 transition-colors tracking-tight">
              {post.title}
            </h2>
</NavLink>

            <p className="text-gray-600 text-base line-clamp-3 mb-6 flex-grow leading-relaxed">
              {post.excerpt}
            </p>


            <div className="mt-auto pt-2">
              <NavLink
                to={`/blogs/${post.id}`}
                className="inline-block text-center border-2 border-black text-black hover:bg-black hover:text-white font-bold py-2 px-5 rounded-lg transition-all duration-300 text-sm w-full sm:w-auto"
              >
                Read Article
              </NavLink>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default PostCard;