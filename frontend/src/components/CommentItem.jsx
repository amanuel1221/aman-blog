import React, { useState, useMemo, useCallback } from "react";
import { FaReply, FaThumbsUp, FaThumbsDown, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

const ReactionButtons = ({ item, currentUserId, onLike, onDislike, testIdPrefix }) => {
  const isLiked = currentUserId ? item.likes?.includes(currentUserId) : false;
  const isDisliked = currentUserId ? item.dislikes?.includes(currentUserId) : false;

  const baseBtnClass = "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer";

  return (
    <div className="flex items-center bg-gray-50 border border-gray-200/80 rounded-lg p-0.5">
      <button
        type="button"
        onClick={() => onLike(item._id)}
        className={`${baseBtnClass} ${isLiked ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"}`}
        data-testid={`${testIdPrefix}-like-button`}
        aria-label={`Like. ${item.likes?.length || 0} likes`}
        aria-pressed={isLiked}
      >
        {isLiked ? <FaThumbsUp size={11} aria-hidden="true" /> : <FaRegThumbsUp size={11} aria-hidden="true" />}
        <span>{item.likes?.length || 0}</span>
      </button>

      <div className="w-[1px] h-3 bg-gray-200 mx-0.5" />

      <button
        type="button"
        onClick={() => onDislike(item._id)}
        className={`${baseBtnClass} ${isDisliked ? "bg-red-50 text-red-600 font-semibold" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"}`}
        data-testid={`${testIdPrefix}-dislike-button`}
        aria-label={`Dislike. ${item.dislikes?.length || 0} dislikes`}
        aria-pressed={isDisliked}
      >
        {isDisliked ? <FaThumbsDown size={11} aria-hidden="true" /> : <FaRegThumbsDown size={11} aria-hidden="true" />}
        <span>{item.dislikes?.length || 0}</span>
      </button>
    </div>
  );
};


export default function CommentItem({
  comment,
  replies = [],
  onReply,
  onEdit,
  onDelete,
  onLike,
  onDislike,
  currentUserId,
  currentUserName,
}) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const commentDate = useMemo(() => {
    return comment?.createdAt
      ? new Date(comment.createdAt).toLocaleDateString()
      : "Recently";
  }, [comment]);

  if (!comment) return null;

  const submitReply = useCallback(
    async (e) => {
      if (e && e.preventDefault) e.preventDefault();
      if (!replyText.trim()) return;

      const success = await onReply(comment._id, replyText.trim());
      if (success !== false) {
        setReplyText("");
        setShowReply(false);
      }
    },
    [replyText, onReply, comment]
  );

  const startEditing = (item) => {
    setEditingId(item._id);
    setEditText(item.content);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  const submitEdit = async (itemId) => {
    if (!editText.trim()) return;
    const success = await onEdit(itemId, editText.trim());
    if (success !== false) {
      cancelEditing();
    }
  };

  const authorName = useMemo(() => comment?.author?.name || "Anonymous", [comment]);
  const isOwnComment = currentUserId && comment.author?._id === currentUserId;

  return (
    <article className="bg-white border border-gray-200 rounded-2xl p-5 mb-4 shadow-sm" data-testid="comment-item" aria-label="User comment">
      <div className="flex gap-4" data-testid="comment-content">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=f3f4f6&color=111827&bold=true`}
          alt={`${authorName} avatar`}
          className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-100"
          data-testid="comment-avatar"
          loading="lazy"
          decoding="async"
        />

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-sm text-gray-900 truncate" data-testid="comment-author">
              {authorName}
            </h4>
            <time className="text-xs text-gray-400 font-mono" dateTime={comment?.createdAt || undefined}>
              {commentDate}
            </time>
          </div>

          {editingId === comment._id ? (
            <div className="mt-2.5">
              <textarea
                rows={3}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                maxLength={1000}
                className="w-full border border-gray-200 rounded-xl p-3 bg-white text-sm text-gray-800 focus:outline-none focus:border-gray-400 transition"
                data-testid="comment-edit-textarea"
                aria-label="Edit comment text"
              />
              <div className="flex gap-2 mt-2 justify-end">
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition"
                  data-testid="comment-edit-cancel-button"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => submitEdit(comment._id)}
                  disabled={!editText.trim()}
                  className="bg-gray-900 hover:bg-black text-white px-4 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-30 cursor-pointer transition"
                  data-testid="comment-edit-save-button"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-2 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words" data-testid="comment-content">
              {comment.content || ""}
            </p>
          )}

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ReactionButtons
                item={comment}
                currentUserId={currentUserId}
                onLike={onLike}
                onDislike={onDislike}
                testIdPrefix="comment"
              />

              <button
                onClick={() => setShowReply(!showReply)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition cursor-pointer"
                data-testid="comment-reply-button"
                aria-expanded={showReply}
                aria-label="Reply to comment"
              >
                <FaReply size={11} className="opacity-70" aria-hidden="true" />
                Reply
              </button>
            </div>

            {isOwnComment && editingId !== comment._id && (
              <div className="flex items-center gap-1 border-l border-gray-200 pl-2">
                <button
                  type="button"
                  onClick={() => startEditing(comment)}
                  className="px-2 py-1 rounded-md text-xs font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition cursor-pointer"
                  data-testid="comment-edit-button"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(comment._id)}
                  className="px-2 py-1 rounded-md text-xs font-medium text-gray-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                  data-testid="comment-delete-button"
                >
                  Delete
                </button>
              </div>
            )}
          </div> 

          {showReply && (
            <section className="mt-3 bg-gray-50 border border-gray-100 rounded-xl p-3.5">
              <textarea
                rows={3}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-2.5 bg-white text-sm text-gray-800 focus:outline-none focus:border-gray-300 transition"
                placeholder={`Write a reply to ${authorName}...`}
                data-testid="comment-reply-textarea"
                aria-label="Reply text"
              />

              <div className="flex gap-2 mt-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowReply(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition"
                  data-testid="comment-reply-cancel-button"
                >
                  Cancel
                </button>
                <button
                  onClick={submitReply}
                  disabled={!replyText.trim()}
                  className="bg-black text-white px-4 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-30 cursor-pointer transition"
                  data-testid="comment-reply-submit-button"
                >
                  Reply
                </button>
              </div>
            </section>
          )}

          {Array.isArray(replies) && replies.length > 0 && (
            <div className="mt-5 pl-4 border-l-2 border-gray-100 space-y-4" data-testid="comment-replies" aria-label="Replies">
              {replies.map((reply) => {
                if (!reply) return null;
                const replyAuthorName = reply.author?.name || "Anonymous";
                const isOwnReply = currentUserId && reply.author?._id === currentUserId;
                const isEditingReply = editingId === reply._id;

                return (
                  <article key={reply._id} className="group/reply">
                    <div className="flex gap-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(replyAuthorName)}&background=f9fafb&color=4b5563`}
                        alt={`${replyAuthorName} avatar`}
                        className="w-8 h-8 rounded-full shrink-0 border border-gray-100"
                        data-testid="comment-reply-avatar"
                        loading="lazy"
                        decoding="async"
                      />

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-xs" data-testid="comment-reply-author">
                          {replyAuthorName}
                        </p>

                        {isEditingReply ? (
                          <div className="mt-2">
                            <textarea
                              rows={2}
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              maxLength={1000}
                              className="w-full border border-gray-200 rounded-xl p-2 bg-white text-gray-800 text-sm focus:outline-none focus:border-gray-300"
                              data-testid="comment-reply-edit-textarea"
                              aria-label="Edit reply text"
                            />
                            <div className="flex gap-2 mt-2 justify-end">
                              <button
                                type="button"
                                onClick={cancelEditing}
                                className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => submitEdit(reply._id)}
                                disabled={!editText.trim()}
                                className="bg-black text-white px-4 py-1.5 rounded-md text-xs font-semibold disabled:opacity-30 cursor-pointer"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-700 mt-1 text-xs leading-relaxed break-words" data-testid="comment-reply-content">
                            {reply.content || ""}
                          </p>
                        )}
                        
                        <div className="mt-2.5 flex items-center justify-between gap-4">
                          <div className="scale-90 origin-left">
                            <ReactionButtons
                              item={reply}
                              currentUserId={currentUserId}
                              onLike={onLike}
                              onDislike={onDislike}
                              testIdPrefix="comment-reply"
                            />
                          </div>

                          {isOwnReply && !isEditingReply && (
                            <div className="flex items-center gap-0.5 md:opacity-0 group-hover/reply:opacity-100 transition duration-150">
                              <button
                                type="button"
                                onClick={() => startEditing(reply)}
                                className="px-2 py-1 rounded text-[11px] font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => onDelete(reply._id)}
                                className="px-2 py-1 rounded text-[11px] font-medium text-gray-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
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