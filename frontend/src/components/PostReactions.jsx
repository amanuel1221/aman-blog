import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

export default function PostReactions({
  postId,
  initialLikes = [],
  initialDislikes = [],
  currentUserId,
}) {
  const [likes, setLikes] = useState(Array.isArray(initialLikes) ? initialLikes : []);
  const [dislikes, setDislikes] = useState(Array.isArray(initialDislikes) ? initialDislikes : []);

  const isLiked = likes.includes(currentUserId);
  const isDisliked = dislikes.includes(currentUserId);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes.filter((id) => id !== currentUserId));
      return;
    }
    setLikes([...likes, currentUserId]);
    setDislikes(dislikes.filter((id) => id !== currentUserId));
  };

  const handleDislike = () => {
    if (isDisliked) {
      setDislikes(dislikes.filter((id) => id !== currentUserId));
      return;
    }
    setDislikes([...dislikes, currentUserId]);
    setLikes(likes.filter((id) => id !== currentUserId));
  };

  return (
    <section className="max-w-3xl mx-auto mt-16 pt-12 border-t border-gray-100 text-center" data-testid="post-reactions">
      <h3 className="text-gray-900 text-lg font-black tracking-tight mb-6" data-testid="post-reactions-title">
        Was this article helpful?
      </h3>

      <div className="flex justify-center items-center gap-4" data-testid="post-reactions-buttons">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2.5 px-6 py-3 rounded-xl border font-bold text-sm transition-all duration-200 transform active:scale-95 cursor-pointer
            data-testid="post-reactions-like"
          ${
            isLiked
              ? "bg-white border-gray-900 text-gray-900 scale-105 shadow-sm"
              : "bg-white border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-600"
          }`}
        >
          {isLiked ? <FaThumbsUp className="text-gray-900" size={14} /> : <FaRegThumbsUp size={14} />}
          <span>{likes.length}</span>
        </button>

        <button
          onClick={handleDislike}
          className={`flex items-center gap-2.5 px-6 py-3 rounded-xl border font-bold text-sm transition-all duration-200 transform active:scale-95 cursor-pointer
            data-testid="post-reactions-dislike"
          ${
            isDisliked
              ? "bg-white border-gray-900 text-gray-900 scale-105 shadow-sm"
              : "bg-white border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-600"
          }`}
        >
          {isDisliked ? <FaThumbsDown className="text-gray-900" size={14} /> : <FaRegThumbsDown size={14} />}
          <span>{dislikes.length}</span>
        </button>
      </div>
    </section>
  );
}