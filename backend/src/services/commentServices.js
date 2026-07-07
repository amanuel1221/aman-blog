const Comment = require("../models/comment");
const Post = require("../models/Post");
const {
  validateObjectId,
  validateCommentContent
} = require("../validators/comment.validators.js");

const createComment = async (postId, userId, content, parentCommentId = null) => {
  validateObjectId(postId);
  validateObjectId(userId);
  validateCommentContent(content);
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  if (parentCommentId) {
    validateObjectId(parentCommentId);
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
  validateObjectId(postId);
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
  validateObjectId(commentId);
  validateObjectId(userId);
  validateCommentContent(content);
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

const collectDescendantIds = async (commentId) => {
  const children = await Comment.find({ parentComment: commentId }, "_id");
  let ids = children.map((c) => c._id);

  for (const child of children) {
    const nested = await collectDescendantIds(child._id);
    ids = ids.concat(nested);
  }

  return ids;
};



const deleteComment = async (commentId, userId, userRole) => {
  validateObjectId(commentId);
  validateObjectId(userId);
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new Error("Comment not found");
  }

  const isOwner = comment.author.toString() === userId.toString();
  const isAdmin = userRole === 'admin';

 
  if (!isOwner && !isAdmin) {
    throw new Error("Not authorized to delete this comment");
  }

  const descendantIds = await collectDescendantIds(commentId);
  const allIds = [comment._id, ...descendantIds];

  await Comment.deleteMany({ _id: { $in: allIds } });

  await Post.findByIdAndUpdate(comment.post, {
    $inc: { commentsCount: -allIds.length }
  });

  return true;
};

const toggleLikeComment = async (commentId, userId) => {
  validateObjectId(commentId);
validateObjectId(userId);
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
  validateObjectId(commentId);
  validateObjectId(userId);
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