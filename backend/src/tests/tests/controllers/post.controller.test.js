import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const postService = require("../../../services/postServices");

const {
  createPost,
  getAllPosts,
  getPostBySlug,
} = require("../../../controllers/postControllers");

describe("Post Controller", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      query: {},
      user: {},
    };

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("createPost", () => {
    it("should create a post successfully", async () => {
      const post = {
        _id: "123",
        title: "Test Post",
      };

      req.body = {
        title: "Test Post",
      };

      req.user = {
        _id: "user123",
      };

      vi.spyOn(postService, "createPost")
        .mockResolvedValue(post);

      await createPost(req, res);

      expect(postService.createPost)
        .toHaveBeenCalledWith(
          req.body,
          req.user._id
        );

      expect(res.status)
        .toHaveBeenCalledWith(201);

      expect(res.json)
        .toHaveBeenCalledWith({
          success: true,
          message: "Post created successfully",
          post,
        });
    });

    it("should return 400 when service throws error", async () => {
      req.body = {};
      req.user = { _id: "user123" };

      vi.spyOn(postService, "createPost")
        .mockRejectedValue(
          new Error("Title is required")
        );

      await createPost(req, res);

      expect(res.status)
        .toHaveBeenCalledWith(400);

      expect(res.json)
        .toHaveBeenCalledWith({
          success: false,
          message: "Title is required",
        });
    });
  });

  describe("getAllPosts", () => {
    it("should return posts successfully", async () => {
      const result = {
        posts: [
          {
            _id: "1",
            title: "Post 1",
          },
        ],
        total: 1,
        page: 1,
        totalPages: 1,
      };

      req.query = {
        page: "1",
        limit: "10",
        search: "",
      };

      vi.spyOn(postService, "getAllPosts")
        .mockResolvedValue(result);

      await getAllPosts(req, res);

      expect(postService.getAllPosts)
        .toHaveBeenCalledWith(
          "",
          1,
          10
        );

      expect(res.status)
        .toHaveBeenCalledWith(200);

      expect(res.json)
        .toHaveBeenCalledWith({
          success: true,
          ...result,
        });
    });

    it("should return empty posts message", async () => {
      req.query = {};

      vi.spyOn(postService, "getAllPosts")
        .mockResolvedValue({
          posts: [],
        });

      await getAllPosts(req, res);

      expect(res.status)
        .toHaveBeenCalledWith(200);

      expect(res.json)
        .toHaveBeenCalledWith({
          success: true,
          message: "No posts found",
          posts: [],
          total: 0,
          page: 1,
          totalPages: 0,
        });
    });

    it("should return 500 when service fails", async () => {
      vi.spyOn(postService, "getAllPosts")
        .mockRejectedValue(
          new Error("Database error")
        );

      await getAllPosts(req, res);

      expect(res.status)
        .toHaveBeenCalledWith(500);

      expect(res.json)
        .toHaveBeenCalledWith({
          success: false,
          message: "Database error",
        });
    });
  });

  describe("getPostBySlug", () => {
    it("should return a post", async () => {
      const post = {
        _id: "1",
        title: "My Post",
      };

      req.params = {
        slug: "my-post",
      };

      vi.spyOn(postService, "getPostBySlug")
        .mockResolvedValue(post);

      await getPostBySlug(req, res);

      expect(postService.getPostBySlug)
        .toHaveBeenCalledWith(
          "my-post"
        );

      expect(res.status)
        .toHaveBeenCalledWith(200);

      expect(res.json)
        .toHaveBeenCalledWith({
          success: true,
          post,
        });
    });

    it("should return 404 when post not found", async () => {
      req.params = {
        slug: "unknown-post",
      };

      vi.spyOn(postService, "getPostBySlug")
        .mockRejectedValue(
          new Error("Post not found")
        );

      await getPostBySlug(req, res);

      expect(res.status)
        .toHaveBeenCalledWith(404);

      expect(res.json)
        .toHaveBeenCalledWith({
          success: false,
          message: "Post not found",
        });
    });
  });
});