const express = require("express");

const authController = require("../controllers/authControllers.js");
const { protect } = require("../middlewares/authMiddlewares.js");

const router = express.Router();


router.post("/register", authController.register);

router.post("/login", authController.login);


router.post("/logout", protect, authController.logout);

router.get("/profile", protect, authController.getProfile);
router.get(
    "/me",
    protect,
    authController.getMe
);

module.exports = router;