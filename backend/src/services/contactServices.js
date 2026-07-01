const ContactMessage = require("../models/contact");
const { validateObjectId } = require("../validators/post.validators");
const { validateContactInput } = require("../validators/contact.validator");

const createMessage = async (messageData) => {
  validateContactInput(messageData);

  const contactMessage = await ContactMessage.create({
    from_name: messageData.from_name.trim(),
    email: messageData.email.trim().toLowerCase(),
    company: messageData.company?.trim() || "Personal",
    message: messageData.message.trim(),
  });

  return contactMessage;
};

const getAllMessages = async ({ search, isRead, page = 1, limit = 20 } = {}) => {
  page = Number(page) || 1;
  limit = Number(limit) || 20;
  const skip = (page - 1) * limit;

  const query = {};

  if (typeof isRead === "boolean") {
    query.isRead = isRead;
  }

  const searchValue = typeof search === "string" ? search.trim() : "";
  if (searchValue) {
    query.$or = [
      { from_name: { $regex: searchValue, $options: "i" } },
      { email: { $regex: searchValue, $options: "i" } },
      { company: { $regex: searchValue, $options: "i" } },
      { message: { $regex: searchValue, $options: "i" } },
    ];
  }

  const [messages, total] = await Promise.all([
    ContactMessage.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    ContactMessage.countDocuments(query),
  ]);

  return {
    messages,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  };
};

const getMessageById = async (messageId) => {
  validateObjectId(messageId);

  const message = await ContactMessage.findById(messageId).lean();
  if (!message) {
    throw new Error("Message not found");
  }

  return message;
};

const markMessageAsRead = async (messageId) => {
  validateObjectId(messageId);

  const message = await ContactMessage.findByIdAndUpdate(
    messageId,
    { isRead: true },
    { new: true }
  );

  if (!message) {
    throw new Error("Message not found");
  }

  return message;
};

const markMessageAsUnread = async (messageId) => {
  validateObjectId(messageId);

  const message = await ContactMessage.findByIdAndUpdate(
    messageId,
    { isRead: false },
    { new: true }
  );

  if (!message) {
    throw new Error("Message not found");
  }

  return message;
};

const deleteMessage = async (messageId) => {
  validateObjectId(messageId);

  const message = await ContactMessage.findByIdAndDelete(messageId);
  if (!message) {
    throw new Error("Message not found");
  }

  return true;
};

const getUnreadCount = async () => {
  return ContactMessage.countDocuments({ isRead: false });
};

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  markMessageAsRead,
  markMessageAsUnread,
  deleteMessage,
  getUnreadCount,
};
