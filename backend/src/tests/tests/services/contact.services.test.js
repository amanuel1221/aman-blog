import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("../../../models/contact");

const ContactMessage = require("../../../models/contact");
const {
  createMessage,
  getAllMessages,
  getMessageById,
} = require("../../../services/contactServices");

describe("Contact Service", () => {
  beforeEach(() => {
    ContactMessage.create = vi.fn();
    ContactMessage.find = vi.fn();
    ContactMessage.countDocuments = vi.fn();
    ContactMessage.findById = vi.fn();
    ContactMessage.findByIdAndUpdate = vi.fn();
    ContactMessage.findByIdAndDelete = vi.fn();

    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("creates a contact message with normalized values", async () => {
    const createdMessage = {
      _id: "msg1",
      from_name: "Jane Doe",
      email: "jane@example.com",
      company: "Acme",
      message: "Hello from tests",
    };

    ContactMessage.create.mockResolvedValue(createdMessage);

    const result = await createMessage({
      from_name: "  Jane Doe  ",
      email: "  JANE@Example.com  ",
      company: "  Acme  ",
      message: "  Hello from tests  ",
    });

    expect(ContactMessage.create).toHaveBeenCalledWith({
      from_name: "Jane Doe",
      email: "jane@example.com",
      company: "Acme",
      message: "Hello from tests",
    });
    expect(result).toEqual(createdMessage);
  });

  it("creates a default company name when none is supplied", async () => {
    const createdMessage = {
      _id: "msg2",
      from_name: "John Doe",
      email: "john@example.com",
      company: "Personal",
      message: "Hello",
    };

    ContactMessage.create.mockResolvedValue(createdMessage);

    const result = await createMessage({
      from_name: "John Doe",
      email: "john@example.com",
      message: "Hello",
    });

    expect(ContactMessage.create).toHaveBeenCalledWith({
      from_name: "John Doe",
      email: "john@example.com",
      company: "Personal",
      message: "Hello",
    });
    expect(result).toEqual(createdMessage);
  });

  it("returns paginated contact messages for matching filters", async () => {
    const queryChain = {
      sort: vi.fn().mockReturnThis(),
      skip: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      lean: vi.fn().mockResolvedValue([{ _id: "msg1" }]),
    };

    ContactMessage.find.mockReturnValue(queryChain);
    ContactMessage.countDocuments.mockResolvedValue(1);

    const result = await getAllMessages({
      search: "hello",
      isRead: false,
      page: 2,
      limit: 5,
    });

    expect(ContactMessage.find).toHaveBeenCalledWith({
      isRead: false,
      $or: [
        { from_name: { $regex: "hello", $options: "i" } },
        { email: { $regex: "hello", $options: "i" } },
        { company: { $regex: "hello", $options: "i" } },
        { message: { $regex: "hello", $options: "i" } },
      ],
    });
    expect(result).toEqual({
      messages: [{ _id: "msg1" }],
      pagination: {
        total: 1,
        page: 2,
        limit: 5,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: true,
      },
    });
  });

  it("throws when a message cannot be found by id", async () => {
    ContactMessage.findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue(null),
    });

    await expect(getMessageById("64f0f0f0f0f0f0f0f0f0f0f0")).rejects.toThrow("Message not found");
  });
});
