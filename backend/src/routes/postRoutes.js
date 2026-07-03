const express = require("express");
const router = express.Router();

const { upload } = require("../middlewares/uploadMiddleware");
const { protect, adminOnly } = require("../middlewares/authMiddlewares");
const postController = require("../controllers/postControllers");

router.get("/", postController.getAllPosts);

router.get("/:slug", postController.getPostBySlug);

router.post("/:id/view", postController.incrementPostView);

router.post(
    "/:id/like",
    protect,
    postController.toggleLikePost
);

router.post(
    "/",
    protect,
    adminOnly,
    upload.single("coverImage"),
    postController.createPost
);

router.patch(
    "/:id",
    protect,
    adminOnly,
    upload.single("coverImage"),
    postController.updatePost
);

router.delete(
    "/:id",
    protect,
    adminOnly,
    postController.deletePost
);

module.exports = router;