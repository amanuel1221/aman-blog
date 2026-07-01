import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("../../../services/contactServices");

const contactService = require("../../../services/contactServices");
const {
  submitContactMessage,
  getAllMessages,
  getMessageById,
  markMessageAsRead,
  markMessageAsUnread,
  deleteMessage,
  getUnreadCount,
} = require("../../../controllers/contactControllers");

let req;
let res;

beforeEach(() => {
  req = {
    body: {},
    params: {},
    query: {},
  };

  res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  };

  contactService.createMessage = vi.fn();
  contactService.getAllMessages = vi.fn();
  contactService.getMessageById = vi.fn();
  contactService.markMessageAsRead = vi.fn();
  contactService.markMessageAsUnread = vi.fn();
  contactService.deleteMessage = vi.fn();
  contactService.getUnreadCount = vi.fn();

  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Contact Controller", () => {
  describe("submitContactMessage", () => {
    it("should save a contact message successfully", async () => {
      const message = {
        _id: "msg1",
        from_name: "Jane Doe",
        email: "jane@example.com",
        message: "Hello from tests",
      };

      req.body = {
        from_name: "Jane Doe",
        email: "jane@example.com",
        message: "Hello from tests",
      };

      contactService.createMessage.mockResolvedValue(message);

      await submitContactMessage(req, res);

      expect(contactService.createMessage).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Message saved successfully 🚀",
        data: message,
      });
    });

    it("should return 400 when validation fails", async () => {
      req.body = {
        from_name: "",
        email: "invalid",
        message: "",
      };

      await submitContactMessage(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Sender name is required and cannot be empty",
      });
    });
  });

  describe("getAllMessages", () => {
    it("should return paginated contact messages", async () => {
      const result = {
        messages: [{ _id: "msg1" }],
        pagination: {
          total: 1,
          page: 1,
          limit: 20,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        },
      };

      req.query = {
        search: "hello",
        isRead: "true",
        page: "1",
        limit: "20",
      };

      contactService.getAllMessages.mockResolvedValue(result);

      await getAllMessages(req, res);

      expect(contactService.getAllMessages).toHaveBeenCalledWith({
        search: "hello",
        isRead: true,
        page: "1",
        limit: "20",
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        ...result,
      });
    });
  });

  describe("getMessageById", () => {
    it("should return a single contact message", async () => {
      const message = { _id: "msg1", from_name: "Jane" };
      req.params = { id: "64f0f0f0f0f0f0f0f0f0f0f0" };

      contactService.getMessageById.mockResolvedValue(message);

      await getMessageById(req, res);

      expect(contactService.getMessageById).toHaveBeenCalledWith("64f0f0f0f0f0f0f0f0f0f0f0");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: message,
      });
    });
  });

  describe("markMessageAsRead", () => {
    it("should mark a message as read", async () => {
      const message = { _id: "msg1", isRead: true };
      req.params = { id: "64f0f0f0f0f0f0f0f0f0f0f0" };

      contactService.markMessageAsRead.mockResolvedValue(message);

      await markMessageAsRead(req, res);

      expect(contactService.markMessageAsRead).toHaveBeenCalledWith("64f0f0f0f0f0f0f0f0f0f0f0");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Message marked as read",
        data: message,
      });
    });
  });

  describe("markMessageAsUnread", () => {
    it("should mark a message as unread", async () => {
      const message = { _id: "msg1", isRead: false };
      req.params = { id: "64f0f0f0f0f0f0f0f0f0f0f0" };

      contactService.markMessageAsUnread.mockResolvedValue(message);

      await markMessageAsUnread(req, res);

      expect(contactService.markMessageAsUnread).toHaveBeenCalledWith("64f0f0f0f0f0f0f0f0f0f0f0");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Message marked as unread",
        data: message,
      });
    });
  });

  describe("deleteMessage", () => {
    it("should delete a contact message", async () => {
      req.params = { id: "64f0f0f0f0f0f0f0f0f0f0f0" };

      contactService.deleteMessage.mockResolvedValue(true);

      await deleteMessage(req, res);

      expect(contactService.deleteMessage).toHaveBeenCalledWith("64f0f0f0f0f0f0f0f0f0f0f0");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Message deleted successfully",
      });
    });
  });

  describe("getUnreadCount", () => {
    it("should return the number of unread messages", async () => {
      contactService.getUnreadCount.mockResolvedValue(3);

      await getUnreadCount(req, res);

      expect(contactService.getUnreadCount).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        unreadCount: 3,
      });
    });
  });
});
