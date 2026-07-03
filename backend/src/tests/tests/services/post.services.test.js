import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../../services/postServices");

vi.mock("../../../services/cloudinaryService", () => ({
  uploadImage: vi.fn(),
  deleteCloudinaryImage: vi.fn(),
}));

const postService = require("../../../services/postServices");

postService.createPost       = vi.fn();
postService.getAllPosts       = vi.fn();
postService.getPostBySlug    = vi.fn();
postService.incrementPostView= vi.fn();
postService.updatePost       = vi.fn();
postService.deletePost       = vi.fn();
postService.toggleLikePost   = vi.fn();

const {
  createPost,
  getAllPosts,
  getPostBySlug,
  incrementPostView,
  updatePost,
  deletePost,
  toggleLikePost,
} = require("../../../controllers/postControllers");


let req, res;

beforeEach(() => {
  req = { body: {}, params: {}, query: {}, user: { _id: "user123" } };
  res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
  vi.clearAllMocks();
});


describe("createPost", () => {
  it("returns 201 and the created post", async () => {
    const post = { _id: "abc", title: "Hello" };
    req.body = { title: "Hello" };
    postService.createPost.mockResolvedValue(post);

    await createPost(req, res);

    expect(postService.createPost).toHaveBeenCalledWith({ title: "Hello" }, "user123",undefined);
    
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Post created successfully",
      post,
    });
  });

  it("returns 400 when service throws", async () => {
    postService.createPost.mockRejectedValue(new Error("Title is required"));

    await createPost(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: "Title is required" });
  });
});


describe("getAllPosts", () => {
  it("returns 200 with posts when posts exist", async () => {
    const result = { posts: [{ title: "Post 1" }], total: 1, page: 1, totalPages: 1 };
    req.query = { page: "1", limit: "10", search: "hello" };
    postService.getAllPosts.mockResolvedValue(result);

    await getAllPosts(req, res);

    expect(postService.getAllPosts).toHaveBeenCalledWith("hello", 1, 10);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, ...result });
  });

  it("uses default page/limit/search when query params are missing", async () => {
    req.query = {};
    postService.getAllPosts.mockResolvedValue({
      posts: [{ title: "Post 1" }], total: 1, page: 1, totalPages: 1,
    });

    await getAllPosts(req, res);

    expect(postService.getAllPosts).toHaveBeenCalledWith("", 1, 10);
  });

  it("returns 200 empty-posts message when no posts found", async () => {
    req.query = {};
    postService.getAllPosts.mockResolvedValue({ posts: [] });

    await getAllPosts(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "No posts found",
      posts: [],
      total: 0,
      page: 1,
      totalPages: 0,
    });
  });

  it("returns 500 when service throws", async () => {
    postService.getAllPosts.mockRejectedValue(new Error("DB error"));

    await getAllPosts(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: "DB error" });
  });
});


describe("getPostBySlug", () => {
  it("returns 200 with the post", async () => {
    const post = { title: "My Post" };
    req.params = { slug: "my-post" };
    postService.getPostBySlug.mockResolvedValue(post);

    await getPostBySlug(req, res);

    expect(postService.getPostBySlug).toHaveBeenCalledWith("my-post");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, post });
  });

  it("returns 404 when post is not found", async () => {
    req.params = { slug: "ghost" };
    postService.getPostBySlug.mockRejectedValue(new Error("Post not found"));

    await getPostBySlug(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: "Post not found" });
  });
});


describe("incrementPostView", () => {
  it("returns 200 with updated view count", async () => {
    req.params = { id: "post123" };
    postService.incrementPostView.mockResolvedValue(42);

    await incrementPostView(req, res);

    expect(postService.incrementPostView).toHaveBeenCalledWith("post123");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, views: 42 });
  });

  it("returns 404 when service throws", async () => {
    req.params = { id: "bad-id" };
    postService.incrementPostView.mockRejectedValue(new Error("Post not found"));

    await incrementPostView(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: "Post not found" });
  });
});


describe("updatePost", () => {
  it("returns 200 with updated post", async () => {
    const post = { _id: "post123", title: "Updated" };
    req.params = { id: "post123" };
    req.body = { title: "Updated" };
    postService.updatePost.mockResolvedValue(post);

    await updatePost(req, res);

    expect(postService.updatePost).toHaveBeenCalledWith("post123", "user123", { title: "Updated" },undefined);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Post updated successfully",
      post,
    });
  });

  it("returns 403 when not authorized", async () => {
    req.params = { id: "post123" };
    postService.updatePost.mockRejectedValue(new Error("Not authorized to update this post"));

    await updatePost(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Not authorized to update this post",
    });
  });

  it("returns 404 when post not found", async () => {
    req.params = { id: "ghost" };
    postService.updatePost.mockRejectedValue(new Error("Post not found"));

    await updatePost(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: "Post not found" });
  });

  it("returns 400 for other errors", async () => {
    req.params = { id: "post123" };
    postService.updatePost.mockRejectedValue(new Error("Validation failed"));

    await updatePost(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: "Validation failed" });
  });
});


describe("deletePost", () => {
  it("returns 200 on successful delete", async () => {
    req.params = { id: "post123" };
    postService.deletePost.mockResolvedValue();

    await deletePost(req, res);

    expect(postService.deletePost).toHaveBeenCalledWith("post123", "user123");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, message: "Post deleted successfully" });
  });

  it("returns 403 when not authorized", async () => {
    req.params = { id: "post123" };
    postService.deletePost.mockRejectedValue(new Error("Not authorized to delete this post"));

    await deletePost(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Not authorized to delete this post",
    });
  });

  it("returns 404 when post not found", async () => {
    req.params = { id: "ghost" };
    postService.deletePost.mockRejectedValue(new Error("Post not found"));

    await deletePost(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: "Post not found" });
  });

  it("returns 500 for other errors", async () => {
    req.params = { id: "post123" };
    postService.deletePost.mockRejectedValue(new Error("DB error"));

    await deletePost(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: "DB error" });
  });
});


describe("toggleLikePost", () => {
  it("returns 200 with 'Post liked' when liked is true", async () => {
    req.params = { id: "post123" };
    postService.toggleLikePost.mockResolvedValue({ liked: true, likesCount: 5 });

    await toggleLikePost(req, res);

    expect(postService.toggleLikePost).toHaveBeenCalledWith("post123", "user123");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Post liked",
      liked: true,
      likesCount: 5,
    });
  });

  it("returns 200 with 'Post unliked' when liked is false", async () => {
    req.params = { id: "post123" };
    postService.toggleLikePost.mockResolvedValue({ liked: false, likesCount: 4 });

    await toggleLikePost(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Post unliked",
      liked: false,
      likesCount: 4,
    });
  });

  it("returns 400 when service throws", async () => {
    req.params = { id: "bad-id" };
    postService.toggleLikePost.mockRejectedValue(new Error("Post not found"));

    await toggleLikePost(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: "Post not found" });
  });
});