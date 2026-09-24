const express = require("express");

const router = express.Router();

const { upload } = require("../middlewares/uploadMiddleware");
const { protect, adminOnly } = require("../middlewares/authMiddlewares");

const imageController = require("../controllers/imageControllers");

router.post(
    "/",
    protect,
    adminOnly,
    upload.single("image"),
    imageController.uploadContentImage
);

module.exports = router;