import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const commentService = require("../../../services/commentServices");

const {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
  toggleLikeComment,
  toggleDislikeComment,
} = require("../../../controllers/commentControllers");

describe("Comment Controller", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
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

  describe("createComment", () => {
    it("should create comment successfully", async () => {
      const comment = {
        _id: "comment1",
        content: "Nice post!",
      };

      req.params.postId = "post1";
      req.user._id = "user1";
      req.body = {
        content: "Nice post!",
      };

      vi.spyOn(commentService, "createComment")
        .mockResolvedValue(comment);

      await createComment(req, res);

      expect(commentService.createComment)
        .toHaveBeenCalledWith(
          "post1",
          "user1",
          "Nice post!",
          undefined
        );

      expect(res.status)
        .toHaveBeenCalledWith(201);

      expect(res.json)
        .toHaveBeenCalledWith({
          success: true,
          message: "Comment created successfully",
          comment,
        });
    });

    it("should return 400 on error", async () => {
      vi.spyOn(commentService, "createComment")
        .mockRejectedValue(new Error("Content is required"));

      await createComment(req, res);

      expect(res.status)
        .toHaveBeenCalledWith(400);

      expect(res.json)
        .toHaveBeenCalledWith({
          success: false,
          message: "Content is required",
        });
    });
  });

  describe("getCommentsByPost", () => {
    it("should return comments", async () => {
      const comments = [
        { _id: "1", content: "Comment 1" },
        { _id: "2", content: "Comment 2" },
      ];

      req.params.postId = "post1";

      vi.spyOn(commentService, "getCommentsByPost")
        .mockResolvedValue(comments);

      await getCommentsByPost(req, res);

      expect(commentService.getCommentsByPost)
        .toHaveBeenCalledWith("post1");

      expect(res.status)
        .toHaveBeenCalledWith(200);

      expect(res.json)
        .toHaveBeenCalledWith({
          success: true,
          comments,
          count: 2,
        });
    });

    it("should return 404 on error", async () => {
      vi.spyOn(commentService, "getCommentsByPost")
        .mockRejectedValue(new Error("Post not found"));

      await getCommentsByPost(req, res);

      expect(res.status)
        .toHaveBeenCalledWith(404);

      expect(res.json)
        .toHaveBeenCalledWith({
          success: false,
          message: "Post not found",
        });
    });
  });

  describe("updateComment", () => {
    it("should update comment successfully", async () => {
      const updatedComment = {
        _id: "comment1",
        content: "Updated comment",
      };

      req.params.id = "comment1";
      req.user._id = "user1";
      req.body.content = "Updated comment";

      vi.spyOn(commentService, "updateComment")
        .mockResolvedValue(updatedComment);

      await updateComment(req, res);

      expect(commentService.updateComment)
        .toHaveBeenCalledWith(
          "comment1",
          "user1",
          "Updated comment"
        );

      expect(res.status)
        .toHaveBeenCalledWith(200);

      expect(res.json)
        .toHaveBeenCalledWith({
          success: true,
          message: "Comment updated successfully",
          comment: updatedComment,
        });
    });

    it("should return 403 if unauthorized", async () => {
      vi.spyOn(commentService, "updateComment")
        .mockRejectedValue(
          new Error("Not authorized to update this comment")
        );

      await updateComment(req, res);

      expect(res.status)
        .toHaveBeenCalledWith(403);
    });

    it("should return 400 for other errors", async () => {
      vi.spyOn(commentService, "updateComment")
        .mockRejectedValue(
          new Error("Comment not found")
        );

      await updateComment(req, res);

      expect(res.status)
        .toHaveBeenCalledWith(400);
    });
  });

  describe("deleteComment", () => {
    it("should delete comment successfully", async () => {
      req.params.id = "comment1";
      req.user._id = "user1";

      vi.spyOn(commentService, "deleteComment")
        .mockResolvedValue();

      await deleteComment(req, res);

      expect(commentService.deleteComment)
        .toHaveBeenCalledWith(
          "comment1",
          "user1"
        );

      expect(res.status)
        .toHaveBeenCalledWith(200);

      expect(res.json)
        .toHaveBeenCalledWith({
          success: true,
          message: "Comment deleted successfully",
        });
    });

    it("should return 403 if unauthorized", async () => {
      vi.spyOn(commentService, "deleteComment")
        .mockRejectedValue(
          new Error("Not authorized to delete this comment")
        );

      await deleteComment(req, res);

      expect(res.status)
        .toHaveBeenCalledWith(403);
    });

    it("should return 404 for other errors", async () => {
      vi.spyOn(commentService, "deleteComment")
        .mockRejectedValue(
          new Error("Comment not found")
        );

      await deleteComment(req, res);

      expect(res.status)
        .toHaveBeenCalledWith(404);
    });
  });

  describe("toggleLikeComment", () => {
    it("should like comment", async () => {
      const result = {
        likesCount: 1,
        dislikesCount: 0,
        liked: true,
        disliked: false,
      };

      req.params.id = "comment1";
      req.user._id = "user1";

      vi.spyOn(commentService, "toggleLikeComment")
        .mockResolvedValue(result);

      await toggleLikeComment(req, res);

      expect(res.status)
        .toHaveBeenCalledWith(200);

      expect(res.json)
        .toHaveBeenCalledWith({
          success: true,
          message: "Comment liked",
          ...result,
        });
    });
  });

  describe("toggleDislikeComment", () => {
    it("should dislike comment", async () => {
      const result = {
        likesCount: 0,
        dislikesCount: 1,
        liked: false,
        disliked: true,
      };

      req.params.id = "comment1";
      req.user._id = "user1";

      vi.spyOn(commentService, "toggleDislikeComment")
        .mockResolvedValue(result);

      await toggleDislikeComment(req, res);

      expect(res.status)
        .toHaveBeenCalledWith(200);

      expect(res.json)
        .toHaveBeenCalledWith({
          success: true,
          message: "Comment disliked",
          ...result,
        });
    });
  });
});