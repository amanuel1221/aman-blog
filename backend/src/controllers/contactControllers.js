const contactService = require("../services/contactServices");
const { validateContactInput } = require("../validators/contact.validator");

const submitContactMessage = async (req, res) => {
  try {
    validateContactInput(req.body);

    const message = await contactService.createMessage(req.body);

    res.status(201).json({
      success: true,
      message: "Message saved successfully 🚀",
      data: message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const { search, isRead, page, limit } = req.query;
    const parsedIsRead = typeof isRead === "string" ? isRead === "true" : undefined;

    const result = await contactService.getAllMessages({
      search,
      isRead: parsedIsRead,
      page,
      limit,
    });

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMessageById = async (req, res) => {
  try {
    const message = await contactService.getMessageById(req.params.id);

    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const markMessageAsRead = async (req, res) => {
  try {
    const message = await contactService.markMessageAsRead(req.params.id);

    res.status(200).json({
      success: true,
      message: "Message marked as read",
      data: message,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const markMessageAsUnread = async (req, res) => {
  try {
    const message = await contactService.markMessageAsUnread(req.params.id);

    res.status(200).json({
      success: true,
      message: "Message marked as unread",
      data: message,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteMessage = async (req, res) => {
  try {
    await contactService.deleteMessage(req.params.id);

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const getUnreadCount = async (req, res) => {
  try {
    const count = await contactService.getUnreadCount();

    res.status(200).json({
      success: true,
      unreadCount: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  submitContactMessage,
  getAllMessages,
  getMessageById,
  markMessageAsRead,
  markMessageAsUnread,
  deleteMessage,
  getUnreadCount,
};