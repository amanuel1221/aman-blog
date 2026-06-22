const Comment = require("../models/comment");
const Post = require("../models/Post");

const createComment = async (postId, userId, content, parentCommentId = null) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  if (parentCommentId) {
    const parentComment = await Comment.findById(parentCommentId);
    if (!parentComment) {
      throw new Error("Parent comment not found");
    }
    if (parentComment.post.toString() !== postId) {
      throw new Error("Parent comment does not belong to this post");
    }
  }

  const comment = await Comment.create({
    content,
    author: userId,
    post: postId,
    parentComment: parentCommentId || null,
  });

  await Post.findByIdAndUpdate(postId, {
    $inc: { commentsCount: 1 }
  });

  return comment;
};

const getCommentsByPost = async (postId) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  const comments = await Comment.find({ post: postId })
    .populate("author", "name email")
    .sort({ createdAt: -1 })
    .lean();

  return comments;
};

const updateComment = async (commentId, userId, content) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new Error("Comment not found");
  }

  if (comment.author.toString() !== userId.toString()) {
    throw new Error("Not authorized to update this comment");
  }

  comment.content = content;
  await comment.save();

  return comment;
};

const deleteComment = async (commentId, userId, userRole) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new Error("Comment not found");
  }

  const isOwner = comment.author.toString() === userId.toString();
  const isAdmin = userRole === 'admin';

  // Owner OR Admin can delete
  if (!isOwner && !isAdmin) {
    throw new Error("Not authorized to delete this comment");
  }

  await Comment.findByIdAndDelete(commentId);

  await Post.findByIdAndUpdate(comment.post, {
    $inc: { commentsCount: -1 }
  });

  return true;
};
const toggleLikeComment = async (commentId, userId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new Error("Comment not found");
  }

  const alreadyLiked = comment.likes.some(
    (id) => id.toString() === userId.toString()
  );

  if (alreadyLiked) {
    comment.likes = comment.likes.filter(
      (id) => id.toString() !== userId.toString()
    );
  } else {
    comment.dislikes = comment.dislikes.filter(
      (id) => id.toString() !== userId.toString()
    );
    comment.likes.push(userId);
  }

  await comment.save();

  return {
    likesCount: comment.likes.length,
    dislikesCount: comment.dislikes.length,
    liked: !alreadyLiked,
    disliked: false
  };
};

const toggleDislikeComment = async (commentId, userId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new Error("Comment not found");
  }

  const alreadyDisliked = comment.dislikes.some(
    (id) => id.toString() === userId.toString()
  );

  if (alreadyDisliked) {
    comment.dislikes = comment.dislikes.filter(
      (id) => id.toString() !== userId.toString()
    );
  } else {
    comment.likes = comment.likes.filter(
      (id) => id.toString() !== userId.toString()
    );
    comment.dislikes.push(userId);
  }

  await comment.save();

  return {
    likesCount: comment.likes.length,
    dislikesCount: comment.dislikes.length,
    liked: false,
    disliked: !alreadyDisliked
  };
};

module.exports = {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
  toggleLikeComment,
  toggleDislikeComment,
};