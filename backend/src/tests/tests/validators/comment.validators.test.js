import { describe, it, expect } from "vitest";
import mongoose from "mongoose";
import {
  validateObjectId,
  validateCommentContent,
} from "../../../validators/comment.validators";

describe("Comment Validators", () => {
  describe("validateObjectId", () => {
    it("accepts a valid ObjectId", () => {
      const id = new mongoose.Types.ObjectId().toString();

      expect(() =>
        validateObjectId(id)
      ).not.toThrow();
    });

    it("throws when ObjectId is invalid", () => {
      expect(() =>
        validateObjectId("invalid-id")
      ).toThrow("Invalid ID");
    });
  });

  describe("validateCommentContent", () => {
    it("accepts valid comment content", () => {
      expect(() =>
        validateCommentContent(
          "This is a valid comment."
        )
      ).not.toThrow();
    });

    it("throws when content is missing", () => {
      expect(() =>
        validateCommentContent()
      ).toThrow("Comment content is required");
    });

    it("throws when content is null", () => {
      expect(() =>
        validateCommentContent(null)
      ).toThrow("Comment content is required");
    });

    it("throws when content is not a string", () => {
      expect(() =>
        validateCommentContent(123)
      ).toThrow("Comment content is required");
    });

    it("throws when content is less than 2 characters", () => {
      expect(() =>
        validateCommentContent("a")
      ).toThrow(
        "Comment must be at least 2 characters"
      );
    });

    it("throws when content only contains spaces", () => {
      expect(() =>
        validateCommentContent("   ")
      ).toThrow(
        "Comment must be at least 2 characters"
      );
    });

    it("throws when content exceeds 500 characters", () => {
      expect(() =>
        validateCommentContent(
          "a".repeat(501)
        )
      ).toThrow(
        "Comment cannot exceed 500 characters"
      );
    });

    it("accepts content at maximum length", () => {
      expect(() =>
        validateCommentContent(
          "a".repeat(500)
        )
      ).not.toThrow();
    });
  });
});