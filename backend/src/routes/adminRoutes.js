const express = require("express");
const router = express.Router();

const adminDashboardController = require("../controllers/dashboardControllers");
const contactController = require("../controllers/contactControllers");
const { protect, adminOnly } = require("../middlewares/authMiddlewares");


router.get("/dashboard", protect,adminOnly,adminDashboardController.getDashboard);
router.get("/dashboard/stats", protect,adminOnly,adminDashboardController.getStats);
router.get("/dashboard/top-posts", protect,adminOnly,adminDashboardController.getTopPosts);
router.get("/dashboard/messages", protect,adminOnly,adminDashboardController.getRecentMessages);
router.get("/dashboard/engagement", protect,adminOnly,adminDashboardController.getEngagement);
router.get("/contact/messages",protect,adminOnly,contactController.getAllMessages);
router.get("/dashboard/activity", protect,adminOnly,adminDashboardController.getMonthlyActivity);
router.get("/getusers",protect,adminOnly,adminDashboardController.getUsers);

router.put("/contact/messages/:id/read",protect,adminOnly,contactController.markMessageAsRead);

router.put("/contact/messages/:id/unread",protect,adminOnly,contactController.markMessageAsUnread);
router.delete("/contact/messages/:id",protect,adminOnly,contactController.deleteMessage);

module.exports = router;