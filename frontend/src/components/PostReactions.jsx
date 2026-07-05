import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { likePost, dislikePost } from "../api/postApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PostReactions({
  postId,
  initialLikes = [],
  initialDislikes = [],

}) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const currentUserId = user?._id;

  const [likes, setLikes] = useState(Array.isArray(initialLikes) ? initialLikes : []);
  const [dislikes, setDislikes] = useState(Array.isArray(initialDislikes) ? initialDislikes : []);
  const [busy, setBusy] = useState(false);

  const isLiked = currentUserId ? likes.includes(currentUserId) : false;
  const isDisliked = currentUserId ? dislikes.includes(currentUserId) : false;


 const requireAuth = () => {
  if (!user) {
    toast.info("Please sign in to react to this article.", {
      position: "top-right",
      autoClose: 1800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });

    setTimeout(() => {
      navigate("/signin");
    }, 1800);

    return false;
  }

  return true;
};

  const handleLike = async () => {
    if (!requireAuth() || busy) return;

    const prevLikes = likes;
    const prevDislikes = dislikes;

    if (isLiked) {
      setLikes(likes.filter((id) => id !== currentUserId));
    } else {
      setLikes([...likes, currentUserId]);
      setDislikes(dislikes.filter((id) => id !== currentUserId));
    }

    setBusy(true);
    try {
      const res = await likePost(postId);
      const { likesCount, dislikesCount, liked, disliked } = res.data;
      setLikes((curr) => {
        const withoutMe = curr.filter((id) => id !== currentUserId);
        return liked ? [...withoutMe, currentUserId] : withoutMe;
      });
      setDislikes((curr) => {
        const withoutMe = curr.filter((id) => id !== currentUserId);
        return disliked ? [...withoutMe, currentUserId] : withoutMe;
      });
      void likesCount;
      void dislikesCount;
    } catch (err) {
      console.error("Failed to like post:", err);
      setLikes(prevLikes);
      setDislikes(prevDislikes);
    } finally {
      setBusy(false);
    }
  };


  const handleDislike = async () => {
    if (!requireAuth() || busy) return;

    const prevLikes = likes;
    const prevDislikes = dislikes;

    if (isDisliked) {
      setDislikes(dislikes.filter((id) => id !== currentUserId));
    } else {
      setDislikes([...dislikes, currentUserId]);
      setLikes(likes.filter((id) => id !== currentUserId));
    }
    setBusy(true);
    try {
      const res = await dislikePost(postId);
      const { liked, disliked } = res.data;
      setLikes((curr) => {
        const withoutMe = curr.filter((id) => id !== currentUserId);
        return liked ? [...withoutMe, currentUserId] : withoutMe;
      });
      setDislikes((curr) => {
        const withoutMe = curr.filter((id) => id !== currentUserId);
        return disliked ? [...withoutMe, currentUserId] : withoutMe;
      });
    } catch (err) {
      console.error("Failed to dislike post:", err);
      setLikes(prevLikes);
      setDislikes(prevDislikes);
    } finally {
      setBusy(false);
    }
  };


  return (
    <section className="max-w-3xl mx-auto mt-16 pt-12 border-t border-gray-100 text-center" data-testid="post-reactions" aria-labelledby="post-reactions-heading">
      <h3 className="text-gray-900 text-lg font-black tracking-tight mb-6" data-testid="post-reactions-title">
        Was this article helpful?
      </h3>

      <div className="flex justify-center items-center gap-4" data-testid="post-reactions-buttons" role="group"
        aria-label="Article reaction buttons">
        <button
          onClick={handleLike}
          disabled={busy}
          aria-label={`Like article. ${likes.length} likes`}
          className={`flex items-center gap-2.5 px-6 py-3 rounded-xl border font-bold text-sm transition-all duration-200 transform active:scale-95 cursor-pointer
            data-testid="post-reactions-like"
            aria-label="Like article"
          aria-pressed={isLiked}

          ${isLiked
              ? "bg-white border-gray-900 text-gray-900 scale-105 shadow-sm"
              : "bg-white border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-600"
            }`}
        >
          {isLiked ? <FaThumbsUp className="text-gray-900" size={14} aria-hidden="true" /> : <FaRegThumbsUp size={14} aria-hidden="true" />}
          <span>{likes.length}</span>
        </button>

        <button
          onClick={handleDislike}
          disabled={busy}
          aria-label={`Dislike article. ${dislikes.length} dislikes`}

          className={`flex items-center gap-2.5 px-6 py-3 rounded-xl border font-bold text-sm transition-all duration-200 transform active:scale-95 cursor-pointer
            data-testid="post-reactions-dislike"
          ${isDisliked
              ? "bg-white border-gray-900 text-gray-900 scale-105 shadow-sm"
              : "bg-white border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-600"
            }`}
        >
          {isDisliked ? <FaThumbsDown className="text-gray-900" size={14} aria-hidden="true" /> : <FaRegThumbsDown size={14} aria-hidden="true" />}
          <span>{dislikes.length}</span>
        </button>
      </div>
      <p className="sr-only">
        Readers can vote whether this blog post was helpful.
      </p>
    </section>
  );
}