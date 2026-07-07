import { describe, it, expect, vi, beforeEach } from "vitest";
vi.mock("../../../services/commentServices");

const commentService = require("../../../services/commentServices");

commentService.createComment = vi.fn();
commentService.getCommentsByPost = vi.fn();
commentService.updateComment = vi.fn();
commentService.deleteComment = vi.fn();
commentService.toggleLikeComment = vi.fn();
commentService.toggleDislikeComment = vi.fn();

const {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
  toggleLikeComment,
  toggleDislikeComment,
} = require("../../../controllers/commentControllers");

let req, res;

beforeEach(() => {
  req = {
    body: {},
    params: {},
    query: {},
    user: { _id: "user123", role: "user" },
  };

  res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  };

  vi.clearAllMocks();
});


describe("createComment", () => {
  it("should return 201 and created comment", async () => {
    const comment = { _id: "c1", content: "hello" };

    req.params = { postId: "post1" };
    req.body = { content: "hello" };

    commentService.createComment.mockResolvedValue(comment);

    await createComment(req, res);

    expect(commentService.createComment).toHaveBeenCalledWith(
      "post1",
      "user123",
      "hello",
      undefined
    );

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("should return 400 on error", async () => {
    req.params = { postId: "post1" };
    req.body = { content: "hi" };

    commentService.createComment.mockRejectedValue(
      new Error("Post not found")
    );

    await createComment(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});


describe("getCommentsByPost", () => {
  it("should return comments", async () => {
    req.params = { postId: "post1" };

    commentService.getCommentsByPost.mockResolvedValue([
      { content: "c1" },
      { content: "c2" },
    ]);

    await getCommentsByPost(req, res);

    expect(commentService.getCommentsByPost).toHaveBeenCalledWith("post1");

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      comments: [
        { content: "c1" },
        { content: "c2" },
      ],
      count: 2,
    });
  });

  it("should handle empty comments", async () => {
    req.params = { postId: "post1" };

    commentService.getCommentsByPost.mockResolvedValue([]);

    await getCommentsByPost(req, res);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      comments: [],
      count: 0,
    });
  });
});

describe("updateComment", () => {
  it("should update comment", async () => {
    req.params = { id: "c1" };
    req.body = { content: "updated" };

    commentService.updateComment.mockResolvedValue({
      _id: "c1",
      content: "updated",
    });

    await updateComment(req, res);

    expect(commentService.updateComment).toHaveBeenCalledWith(
      "c1",
      "user123",
      "updated"
    );

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should return 403 if not owner", async () => {
    req.params = { id: "c1" };
    req.body = { content: "updated" };

    commentService.updateComment.mockRejectedValue(
      new Error("Not authorized to update this comment")
    );

    await updateComment(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
  });
});

describe("deleteComment", () => {
 

  it("should return 403 if not authorized", async () => {
    req.params = { id: "c1" };

    commentService.deleteComment.mockRejectedValue(
      new Error("Not authorized to delete this comment")
    );

    await deleteComment(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
  });
});

describe("toggleLikeComment", () => {
  it("should like comment", async () => {
    req.params = { id: "c1" };

    commentService.toggleLikeComment.mockResolvedValue({
      liked: true,
      likesCount: 3,
      dislikesCount: 0,
    });

    await toggleLikeComment(req, res);

    expect(commentService.toggleLikeComment).toHaveBeenCalledWith(
      "c1",
      "user123"
    );

    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe("toggleDislikeComment", () => {
  it("should dislike comment", async () => {
    req.params = { id: "c1" };

    commentService.toggleDislikeComment.mockResolvedValue({
      disliked: true,
      dislikesCount: 2,
      likesCount: 0,
    });

    await toggleDislikeComment(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});