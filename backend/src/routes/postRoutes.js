const express = require("express");
const router = express.Router();

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
    "/create",
    protect,
    adminOnly,
    postController.createPost
);


router.put(
    "/:id",
    protect,
    adminOnly,
    postController.updatePost
);


router.delete(
    "/:id",
    protect,
    adminOnly,
    postController.deletePost
);

module.exports = router;