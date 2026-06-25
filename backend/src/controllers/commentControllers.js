const commentService = require("../services/commentServices");

const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, parentCommentId } = req.body;

    const comment = await commentService.createComment(
      postId,
      req.user._id,
      content,
      parentCommentId
    );

    res.status(201).json({
      success: true,
      message: "Comment created successfully",
      comment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await commentService.getCommentsByPost(postId);

    res.status(200).json({
      success: true,
      comments,
      count: comments.length,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const comment = await commentService.updateComment(
      id,
      req.user._id,
      content
    );

    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    if (error.message === "Not authorized to update this comment") {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    await commentService.deleteComment(id, req.user._id);

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    if (error.message === "Not authorized to delete this comment") {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
const toggleLikeComment = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await commentService.toggleLikeComment(id, req.user._id);

    res.status(200).json({
      success: true,
      message: result.liked ? "Comment liked" : "Comment unliked",
      likesCount: result.likesCount,
      dislikesCount: result.dislikesCount,
      liked: result.liked,
      disliked: result.disliked,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const toggleDislikeComment = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await commentService.toggleDislikeComment(id, req.user._id);

    res.status(200).json({
      success: true,
      message: result.disliked ? "Comment disliked" : "Comment undisliked",
      likesCount: result.likesCount,
      dislikesCount: result.dislikesCount,
      liked: result.liked,
      disliked: result.disliked,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
  toggleLikeComment,
  toggleDislikeComment,
};