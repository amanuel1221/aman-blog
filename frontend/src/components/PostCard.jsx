import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const PostCard = ({ post }) => {
  return (
    <article className="flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1">
      
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
        
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <NavLink
              to="/about"
              className="flex items-center gap-2 hover:text-blue-600"
            >
              <FaUserCircle className="w-5 h-5 text-gray-400" />
              <span className="font-semibold text-gray-900">
                {post.author}
              </span>
            </NavLink>
          </div>

          <div className="flex items-center gap-2">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        <NavLink to={`/blogs/${post.id}`}>
          <h2 className="text-2xl font-bold text-gray-900 line-clamp-2 mb-3 hover:text-blue-600 transition-colors">
            {post.title}
          </h2>
        </NavLink>

        <p className="text-gray-600 line-clamp-3 mb-6 flex-grow">
          {post.excerpt}
        </p>

        <NavLink
          to={`/blogs/${post.id}`}
          className="mt-auto inline-flex justify-center border-2 border-black text-black hover:bg-black hover:text-white font-semibold py-2 px-5 rounded-lg transition-all"
        >
          Read Article
        </NavLink>
      </div>
    </article>
  );
};

export default PostCard;