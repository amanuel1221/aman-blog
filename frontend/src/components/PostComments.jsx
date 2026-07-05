import React, { useState,useEffect,useCallback } from "react";
import CommentItem from "./CommentItem";
import mockComments from "../store/mockComments";
import { useAuth } from "../context/AuthContext";
import { getComments, createComment, updateComment, deleteComment, likeComment, dislikeComment, } from "../api/commentApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const PostComments = ({ postId }) => {
  const [allComments, setAllComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rootCommentText, setRootCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const currentUserId = user?._id || user?.id;
  const currentUserName = user?.name;

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

  const fetchComments = useCallback(async () => {
    try {
      const res = await getComments(postId);
      setAllComments(res.data.comments || []);
    } catch (err) {
      console.error("Failed to load comments:", err);
      setAllComments([]);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);


  const rootComments = allComments.filter((c) => !c.parentComment);

  const getRepliesForComment = (commentId) => allComments.filter((c) => c.parentComment === commentId);

  const handleAddRootComment = async (e) => {
    e.preventDefault();
    if (!requireAuth()) return;
    if (!rootCommentText.trim() || submitting) return;

    setSubmitting(true);
    try {
      await createComment(postId, rootCommentText.trim());
      setRootCommentText("");
      await fetchComments();
    } catch (err) {
      console.error("Failed to post comment:", err);
      alert(err?.response?.data?.message || "Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };




  const handleAddReply = async (parentCommentId, replyTextContent) => {
    if (!requireAuth()) return false;
    if (!replyTextContent.trim()) return false;

    try {
      await createComment(postId, replyTextContent.trim(), parentCommentId);
      await fetchComments();
      return true;
    } catch (err) {
      console.error("Failed to post reply:", err);
      alert(err?.response?.data?.message || "Failed to post reply");
      return false;
    }
  };
  const handleEdit = async (commentId, newContent) => {
    try {
      await updateComment(commentId, newContent);
      await fetchComments();
      return true;
    } catch (err) {
      console.error("Failed to update comment:", err);
      alert(err?.response?.data?.message || "Failed to update comment");
      return false;
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await deleteComment(commentId);
      await fetchComments();
    } catch (err) {
      console.error("Failed to delete comment:", err);
      alert(err?.response?.data?.message || "Failed to delete comment");
    }
  };
  const handleLike = async (commentId) => {
    if (!requireAuth()) return;
    try {
      await likeComment(commentId);
      await fetchComments();
    } catch (err) {
      console.error("Failed to like comment:", err);
    }
  };

  const handleDislike = async (commentId) => {
    if (!requireAuth()) return;
    try {
      await dislikeComment(commentId);
      await fetchComments();
    } catch (err) {
      console.error("Failed to dislike comment:", err);
    }
  };

  return (
    <section className="w-full max-w-3xl mx-auto pt-12 border-t border-gray-100 mt-14" data-testid="post-comments">

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-black text-gray-900 tracking-tight" data-testid="post-comments-length" id="comments-heading">
          {allComments.length} {allComments.length === 1 ? "Response" : "Responses"}
        </h3>
      </div>

      {!user && (
        <div className="mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
          Sign in to leave comments and participate in discussions.
        </div>
      )}
      <form onSubmit={handleAddRootComment} className="mb-12 flex gap-4 items-start">
        <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
          {currentUserName ? currentUserName[0].toUpperCase() : "U"}
        </div>

        <div className="flex-grow flex flex-col items-end gap-3">
          <textarea
            rows="3"
            value={rootCommentText}
            onChange={(e) => setRootCommentText(e.target.value)}
            aria-label="Comment filled area"
            placeholder="What are your thoughts on this article?..."
            className="w-full border border-gray-200 rounded-2xl p-4 text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:border-gray-400 text-sm md:text-base resize-none shadow-sm"
            autoComplete="off"
            maxLength={1000}
          />

          <button
            type="submit"
            disabled={!rootCommentText.trim()}
            className="bg-black text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-colors hover:bg-gray-800 disabled:opacity-30"
            data-testid="post-comments-submit"
          >
            {submitting ? "Posting..." : "Comment"}
          </button>
        </div>
      </form>

      {loading ? (
        <p className="text-center text-sm font-medium text-gray-400 py-6">
          Loading comments...
        </p>
      ) : (
        <div className="space-y-6" role="feed" aria-label="Article comments">
          {rootComments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              replies={getRepliesForComment(comment._id)}
              onReply={handleAddReply}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onLike={handleLike}
              onDislike={handleDislike}
              currentUserId={currentUserId}
              currentUserName={currentUserName}
            />
          ))}

          {rootComments.length === 0 && (
            <p className="text-center text-sm font-medium text-gray-400 py-6"
              data-testid="post-comments-empty">
              No thoughts shared yet. Be the first to start the conversation!
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default PostComments;