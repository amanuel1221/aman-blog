const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddlewares");
const commentController = require("../controllers/commentControllers");


router.post(
  "/posts/:postId/comments",
  protect,
  commentController.createComment
);
router.get(
  "/posts/:postId/comments",
  commentController.getCommentsByPost
);
router.delete(
  "/comments/:id",
  protect,
  commentController.deleteComment
);
router.put(
  "/comments/:id",
  protect,
  commentController.updateComment
);
router.post("/comments/:id/like", protect, commentController.toggleLikeComment);
router.post("/comments/:id/dislike", protect, commentController.toggleDislikeComment);

module.exports = router;