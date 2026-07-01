const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middlewares/authMiddlewares");
const contactController = require("../controllers/contactControllers");

router.post(
  "/contact",
  contactController.submitContactMessage
);

router.get(
  "/contact/messages",
  protect,
  adminOnly,
  contactController.getAllMessages
);

router.get(
  "/contact/messages/:id",
  protect,
  adminOnly,
  contactController.getMessageById
);

router.put(
  "/contact/messages/:id/read",
  protect,
  adminOnly,
  contactController.markMessageAsRead
);

router.put(
  "/contact/messages/:id/unread",
  protect,
  adminOnly,
  contactController.markMessageAsUnread
);

router.delete(
  "/contact/messages/:id",
  protect,
  adminOnly,
  contactController.deleteMessage
);

router.get(
  "/contact/unread-count",
  protect,
  adminOnly,
  contactController.getUnreadCount
);

module.exports = router;
