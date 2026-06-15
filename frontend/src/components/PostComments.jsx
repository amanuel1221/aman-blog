import React, { useState } from "react";
import CommentItem from "./CommentItem";
import mockComments from "../store/mockComments";

const PostComments = ({ postId, currentUserId, currentUserName }) => {
  const [allComments, setAllComments] = useState(mockComments);
  const [rootCommentText, setRootCommentText] = useState("");

  const rootComments = allComments.filter((c) => !c.parentComment);

  const getRepliesForComment = (commentId) => {
    return allComments.filter((c) => c.parentComment === commentId);
  };

  const handleAddRootComment = (e) => {
    e.preventDefault();
    if (!rootCommentText.trim() || !currentUserId) return;

    const newComment = {
      _id: `comment_${Date.now()}`,
      content: rootCommentText.trim(),
      author: {
        _id: currentUserId,
        name: currentUserName || "Anonymous",
      },
      post: postId,
      parentComment: null,
      likes: [],
      dislikes: [],
      createdAt: new Date().toISOString(),
    };

    setAllComments([newComment, ...allComments]);
    setRootCommentText("");
  };

  const handleAddReply = (parentCommentId, replyTextContent) => {
    if (!replyTextContent.trim() || !currentUserId) return;

    const newReply = {
      _id: `reply_${Date.now()}`,
      content: replyTextContent.trim(),
      author: {
        _id: currentUserId,
        name: currentUserName || "Anonymous",
      },
      post: postId,
      parentComment: parentCommentId,
      likes: [],
      dislikes: [],
      createdAt: new Date().toISOString(),
    };

    setAllComments([...allComments, newReply]);
  };

  return (
    <div className="w-full max-w-3xl mx-auto pt-12 border-t border-gray-100 mt-14">
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-black text-gray-900 tracking-tight">
          {allComments.length} Responses
        </h3>
      </div>

      <form onSubmit={handleAddRootComment} className="mb-12 flex gap-4 items-start">
        <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
          {currentUserName ? currentUserName[0].toUpperCase() : "U"}
        </div>

        <div className="flex-grow flex flex-col items-end gap-3">
          <textarea
            rows="3"
            value={rootCommentText}
            onChange={(e) => setRootCommentText(e.target.value)}
            placeholder="What are your thoughts on this article?..."
            className="w-full border border-gray-200 rounded-2xl p-4 text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:border-gray-400 text-sm md:text-base resize-none shadow-sm"
          />

          <button
            type="submit"
            disabled={!rootCommentText.trim()}
            className="bg-black text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-colors hover:bg-gray-800 disabled:opacity-30"
          >
            Respond
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {rootComments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            replies={getRepliesForComment(comment._id)}
            onReply={handleAddReply}
            currentUserName={currentUserName}
          />
        ))}

        {rootComments.length === 0 && (
          <p className="text-center text-sm font-medium text-gray-400 py-6">
            No thoughts shared yet. Be the first to start the conversation!
          </p>
        )}
      </div>
    </div>
  );
};

export default PostComments;