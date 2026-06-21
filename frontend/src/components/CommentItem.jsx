import React, { useState,useMemo,useCallback } from "react";
import { FaReply } from "react-icons/fa";

export default function CommentItem({
  comment,
  replies = [],
  onReply,
  currentUserName,
}) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");


const commentDate = useMemo(() => {
    return comment?.createdAt
      ? new Date(comment.createdAt).toLocaleDateString()
      : "Recently";
  }, [comment]);

  if (!comment) {
    return null;
  }

const submitReply = useCallback(
    (e) => {
      if (e && e.preventDefault) e.preventDefault();
      if (!replyText.trim()) return;

      onReply(comment._id, replyText.trim());
      setReplyText("");
      setShowReply(false);
    },
    [replyText, onReply, comment]
  );

const authorName = useMemo(
    () => comment?.author?.name || "Anonymous",
    [comment]
  );
 

  return (
    <article className="bg-white border border-gray-200 rounded-3xl p-6 mb-4"
    data-testid="comment-item" aria-label="User comment">
      <div className="flex gap-4"
      data-testid="comment-content">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=f3f4f6&color=111827&bold=true`}
          alt={`${authorName} avatar`}
          className="w-12 h-12 rounded-full object-cover shrink-0"
          data-testid="comment-avatar"
          loading="lazy"
          decoding="async"
        />

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h4 className="font-bold text-gray-900"
            data-testid="comment-author">
              {authorName}
            </h4>

            <time className="text-sm text-gray-400" dateTime={comment?.createdAt || undefined}>
              {commentDate}
            </time>
          </div>

          <p className="mt-3 text-gray-600 leading-relaxed"
           data-testid="comment-content">
            {comment.content || ""}
          </p>

          <button
            onClick={() => setShowReply(!showReply)}
            className="mt-4 flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black cursor-pointer"
             data-testid="comment-reply-button"
             aria-expanded={showReply}
            aria-label="Reply to comment"
          >
            <FaReply size={12}  data-testid="comment-reply-icon" aria-hidden="true"/>
            Reply
          </button>

          {showReply && (
            <section className="mt-4 bg-gray-50 p-4 rounded-xl">
              <textarea
                rows={3}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full border rounded-xl p-3 bg-white text-gray-800"
                placeholder={`Write a reply to ${authorName}...`}
                 data-testid="comment-reply-textarea"
                 aria-label="Reply text"
              />

              <div className="flex gap-2 mt-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowReply(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
                  data-testid="comment-reply-cancel-button"
                  aria-label="cancel Buttton"
                >
                  Cancel
                </button>
                <button
                  onClick={submitReply}
                  disabled={!replyText.trim()}
                  className="bg-black text-white px-5 py-2 rounded-xl text-xs font-bold disabled:opacity-30 cursor-pointer"
                  data-testid="comment-reply-submit-button"
                  aria-label="Submit reply"
                >
                  Reply
                </button>
              </div>
            </section>
          )}

          {Array.isArray(replies) && replies.length > 0 && (
            <div className="mt-6 pl-6 border-l-2 border-gray-100 space-y-4"
            data-testid="comment-replies" aria-label="Replies">
              {replies.map((reply) => {
             
                if (!reply) return null;
                const replyAuthorName = reply.author?.name || "Anonymous";

                return (
                  <article key={reply._id}>
                    <div className="flex gap-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(replyAuthorName)}&background=f9fafb&color=4b5563`}
                         alt={`${replyAuthorName} avatar`}
                        className="w-10 h-10 rounded-full shrink-0"
                        data-testid="comment-reply-avatar"
                        loading="lazy"
                        decoding="async"
                      />

                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm"
                        data-testid="comment-reply-author">
                          {replyAuthorName}
                        </p>

                        <p className="text-gray-600 mt-1 text-sm"
                        data-testid="comment-reply-content">
                          {reply.content || ""}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}