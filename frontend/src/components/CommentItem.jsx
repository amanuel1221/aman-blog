import React, { useState } from "react";
import { FaReply } from "react-icons/fa";

export default function CommentItem({
  comment,
  replies = [],
  onReply,
  currentUserName,
}) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");


  if (!comment) {
    return null; 
  }

  const submitReply = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!replyText.trim()) return;

    onReply(comment._id, replyText.trim());
    setReplyText("");
    setShowReply(false);
  };


  const authorName = comment.author?.name || "Anonymous";
  const commentDate = comment.createdAt 
    ? new Date(comment.createdAt).toLocaleDateString() 
    : "Recently";

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 mb-4">
      <div className="flex gap-4">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=f3f4f6&color=111827&bold=true`}
          alt={authorName}
          className="w-12 h-12 rounded-full object-cover shrink-0"
        />

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h4 className="font-bold text-gray-900">
              {authorName}
            </h4>

            <span className="text-sm text-gray-400">
              {commentDate}
            </span>
          </div>

          <p className="mt-3 text-gray-600 leading-relaxed">
            {comment.content || ""}
          </p>

          <button
            onClick={() => setShowReply(!showReply)}
            className="mt-4 flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black cursor-pointer"
          >
            <FaReply size={12} />
            Reply
          </button>

          {showReply && (
            <div className="mt-4 bg-gray-50 p-4 rounded-xl">
              <textarea
                rows={3}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full border rounded-xl p-3 bg-white text-gray-800"
                placeholder={`Write a reply to ${authorName}...`}
              />

              <div className="flex gap-2 mt-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowReply(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={submitReply}
                  disabled={!replyText.trim()}
                  className="bg-black text-white px-5 py-2 rounded-xl text-xs font-bold disabled:opacity-30 cursor-pointer"
                >
                  Reply
                </button>
              </div>
            </div>
          )}

          {Array.isArray(replies) && replies.length > 0 && (
            <div className="mt-6 pl-6 border-l-2 border-gray-100 space-y-4">
              {replies.map((reply) => {
             
                if (!reply) return null;
                const replyAuthorName = reply.author?.name || "Anonymous";

                return (
                  <div key={reply._id}>
                    <div className="flex gap-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(replyAuthorName)}&background=f9fafb&color=4b5563`}
                        alt={replyAuthorName}
                        className="w-10 h-10 rounded-full shrink-0"
                      />

                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">
                          {replyAuthorName}
                        </p>

                        <p className="text-gray-600 mt-1 text-sm">
                          {reply.content || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}