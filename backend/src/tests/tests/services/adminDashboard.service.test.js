import { describe, it, expect, vi, beforeEach } from "vitest";

// -------------------- MOCK MODELS --------------------
vi.mock("../../../models/Post", () => ({}));
vi.mock("../../../models/User", () => ({}));
vi.mock("../../../models/contact", () => ({}));

// -------------------- IMPORT AFTER MOCK --------------------
const service = require("../../../services/dashboardServices");

const Post = require("../../../models/Post");
const User = require("../../../models/User");
const ContactMessage = require("../../../models/contact");

// -------------------- HELPERS --------------------
const mockChain = (data) => ({
  sort: vi.fn().mockReturnThis(),
  limit: vi.fn().mockReturnThis(),
  select: vi.fn().mockResolvedValue(data),
  lean: vi.fn().mockResolvedValue(data),
});

describe("Admin Dashboard Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // reset mocks
    Post.find = vi.fn();
    Post.countDocuments = vi.fn();
    Post.aggregate = vi.fn();

    User.countDocuments = vi.fn();
    User.find = vi.fn();

    ContactMessage.countDocuments = vi.fn();
    ContactMessage.find = vi.fn();
  });

  // -------------------- DASHBOARD STATS --------------------
  it("should return dashboard stats correctly", async () => {
    Post.find.mockResolvedValue([
      { views: 100, likes: [1, 2], commentsCount: 5 },
    ]);

    Post.countDocuments.mockResolvedValue(10);
    User.countDocuments.mockResolvedValue(5);
    ContactMessage.countDocuments
      .mockResolvedValueOnce(20) // total
      .mockResolvedValueOnce(3);  // unread

    const result = await service.getDashboardStats();

    expect(result.totalPosts).toBe(10);
    expect(result.totalUsers).toBe(5);
    expect(result.totalMessages).toBe(20);
    expect(result.unreadMessages).toBe(3);
    expect(result.totalViews).toBe(100);
    expect(result.totalLikes).toBe(2);
    expect(result.totalComments).toBe(5);
  });

  // -------------------- TOP POSTS --------------------
  it("should return top posts", async () => {
    Post.find.mockReturnValue({
      sort: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      select: vi.fn().mockResolvedValue([
        { title: "Post 1", views: 500 },
      ]),
    });

    const result = await service.getTopPosts();

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Post 1");
  });

  // -------------------- RECENT MESSAGES --------------------
  it("should return recent messages", async () => {
    ContactMessage.find.mockReturnValue({
      sort: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      select: vi.fn().mockResolvedValue([
        { from_name: "John", email: "john@test.com" },
      ]),
    });

    const result = await service.getRecentMessages();

    expect(result).toHaveLength(1);
    expect(result[0].from_name).toBe("John");
  });

  // -------------------- ENGAGEMENT BREAKDOWN --------------------
  it("should return engagement breakdown", async () => {
    Post.find.mockResolvedValue([
      { views: 100, likes: [1, 2], commentsCount: 3 },
      { views: 200, likes: [1], commentsCount: 2 },
    ]);

    const result = await service.getEngagementBreakdown();

    expect(result).toEqual([
      { name: "Likes", value: 3 },
      { name: "Comments", value: 5 },
      { name: "Views", value: 300 },
    ]);
  });

  // -------------------- MONTHLY ACTIVITY --------------------
  it("should return monthly activity", async () => {
    Post.aggregate.mockResolvedValue([
      { _id: 1, posts: 2 },
      { _id: 3, posts: 5 },
    ]);

    const result = await service.getMonthlyActivity(2026);

    expect(result[0]).toHaveProperty("month");
    expect(result.length).toBe(12);
    expect(result[0]).toHaveProperty("posts");
  });

  // -------------------- USERS --------------------
  it("should return formatted users", async () => {
    User.find.mockReturnValue({
      sort: vi.fn().mockReturnThis(),
      lean: vi.fn().mockResolvedValue([
        {
          name: "Amanuel",
          email: "amanuel@test.com",
          createdAt: new Date("2026-01-01"),
        },
      ]),
    });

    const result = await service.getUsers();

    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty("name", "Amanuel");
    expect(result[0]).toHaveProperty("email");
    expect(result[0]).toHaveProperty("joinedAt");
  });
});