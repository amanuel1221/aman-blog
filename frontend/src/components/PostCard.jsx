import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const PostCard = ({ post }) => {
  return (
    <article className="flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1"
      data-testid="post-card" aria-label={`Blog post: ${post.title}`} >

      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100" data-testid="post-card-image-container">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
          data-testid="post-card-image"
          decoding="async"
        />

        {post.category && (
          <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm" data-testid="post-card-category" aria-label={`Category: ${post.category}`}>
            {post.category}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-grow p-6" data-testid="post-card-content">

        <div className="flex items-center justify-between mb-4 text-sm text-gray-500 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <NavLink
              to="/about"
              className="flex items-center gap-2 hover:text-blue-600"
              aria-label={`Author profile for ${post.author?.name || post.author}`}
            >
              <FaUserCircle className="w-5 h-5 text-gray-400" aria-hidden="true"/>
              <span className="font-semibold text-gray-900">

                <span data-testid="post-card-author">{post.author?.name || post.author}</span>
              </span>
            </NavLink>
          </div>

          <div className="flex items-center gap-2" data-testid="post-card-meta">
            <span>{post.date}</span>
            <span aria-hidden="true">•</span>
            <span>{post.readTime}</span>
          </div>
        </div>

<NavLink to={`/blogs/${post.slug}`} aria-label={`Read full article: ${post.title}`}> 
<h2 className="text-2xl font-bold text-gray-900 line-clamp-2 mb-3 hover:text-blue-600 transition-colors"
            data-testid="post-card-title"
            >
            {post.title}
          </h2>
        </NavLink>

        <p className="text-gray-600 line-clamp-3 mb-6 flex-grow" data-testid="post-card-excerpt">
          {post.excerpt}
        </p>

         <NavLink
  to={`/blogs/${post.slug}`}

          className="mt-auto inline-flex justify-center border-2 border-black text-black hover:bg-black hover:text-white font-semibold py-2 px-5 rounded-lg transition-all"
          data-testid="post-card-read-more" aria-label={`Read full blog post: ${post.title}`}
        >
          Read Article
        </NavLink>
      </div>
    </article>
  );
};

export default PostCard;