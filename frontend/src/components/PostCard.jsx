import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const PostCard = ({ post }) => {
  return (
    <article 
      className="group flex flex-col h-full bg-white rounded-xl border border-slate-100/80 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-100/50"
      data-testid="post-card" 
      aria-label={`Blog post: ${post.title}`}
    >
      <NavLink 
        to={`/blogs/${post.slug}`} 
        className="relative block aspect-[16/10] w-full overflow-hidden bg-slate-50"
        tabIndex="-1"
        aria-hidden="true"
      >
        <img
          src={post.coverImage?.url || post.coverImage}
          alt=""
          className="w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-102"
          loading="lazy"
          decoding="async"
          data-testid="post-card-image"
        />
      </NavLink>

      <div className="flex flex-col flex-grow p-5 sm:p-6" data-testid="post-card-content">
        
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
          {post.category && (
            <span 
              className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-gray bg-blue-50/60 px-2.5 py-1 rounded-md" 
              data-testid="post-card-category"
            >
              {post.category}
            </span>
          )}
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400" data-testid="post-card-meta">
            <time>{post.date}</time>
            <span aria-hidden="true" className="text-slate-300">•</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        <NavLink to={`/blogs/${post.slug}`} className="focus:outline-hidden">
          <h2 
            className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight line-clamp-2 mb-2.5 group-hover:text-blue-600 transition-colors duration-200"
            data-testid="post-card-title"
          >
            {post.title}
          </h2>
        </NavLink>

        <p className="text-slate-500 text-sm sm:text-base leading-relaxed line-clamp-3 mb-5 flex-grow" data-testid="post-card-excerpt">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
          <NavLink
            to="/about"
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors focus:outline-hidden"
            aria-label={`Author profile for ${post.author?.name || post.author}`}
          >
            <FaUserCircle className="w-4 h-4 text-slate-300" aria-hidden="true" />
            <span className="text-xs font-bold text-slate-700 tracking-tight" data-testid="post-card-author">
              {post.author?.name || post.author || "Amanuel Amare"}
            </span>
          </NavLink>

          <NavLink
            to={`/blogs/${post.slug}`}
            className="text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-blue-600 inline-flex items-center gap-1 group/btn focus:outline-hidden"
            data-testid="post-card-read-more" 
            aria-label={`Read full blog post: ${post.title}`}
          >
            Read Post
            <svg 
              className="w-3.5 h-3.5 transform transition-transform duration-200 group-hover/btn:translate-x-0.5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </NavLink>
        </div>

      </div>
    </article>
  );
};

export default PostCard;