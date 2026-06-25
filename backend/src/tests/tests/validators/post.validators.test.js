import { describe, it, expect } from "vitest";
import mongoose from "mongoose";
import {
  validateCreatePostInput,
  validateUpdatePostInput,
  validateObjectId,
} from "../../../validators/post.validators";

describe("Post Validators", () => {
  describe("validateCreatePostInput", () => {
    const validPost = {
      title: "My Awesome Blog Post",
      excerpt: "This is a short excerpt.",
      content: "A".repeat(200),
      category: "Technology",
      tags: ["nodejs", "express"],
    };

    it("accepts valid post data", () => {
      expect(() =>
        validateCreatePostInput(validPost)
      ).not.toThrow();
    });

    it("throws when required fields are missing", () => {
      expect(() =>
        validateCreatePostInput({})
      ).toThrow(
        "Title, excerpt, content, and category are required"
      );
    });

    it("throws when title is too short", () => {
      expect(() =>
        validateCreatePostInput({
          ...validPost,
          title: "Test",
        })
      ).toThrow(
        "Title must be between 5 and 80 characters"
      );
    });

    it("throws when title is too long", () => {
      expect(() =>
        validateCreatePostInput({
          ...validPost,
          title: "A".repeat(81),
        })
      ).toThrow(
        "Title must be between 5 and 80 characters"
      );
    });

    it("throws when excerpt exceeds 170 characters", () => {
      expect(() =>
        validateCreatePostInput({
          ...validPost,
          excerpt: "A".repeat(171),
        })
      ).toThrow(
        "Excerpt cannot exceed 170 characters"
      );
    });

    it("throws when content is too short", () => {
      expect(() =>
        validateCreatePostInput({
          ...validPost,
          content: "Short content",
        })
      ).toThrow(
        "Content must be at least 150 characters"
      );
    });

    it("throws when category is invalid", () => {
      expect(() =>
        validateCreatePostInput({
          ...validPost,
          category: "A",
        })
      ).toThrow("Invalid category");
    });

    it("throws when tags is not an array", () => {
      expect(() =>
        validateCreatePostInput({
          ...validPost,
          tags: "nodejs",
        })
      ).toThrow("Tags must be an array");
    });

    it("throws when more than 10 tags are provided", () => {
      expect(() =>
        validateCreatePostInput({
          ...validPost,
          tags: new Array(11).fill("tag"),
        })
      ).toThrow("Maximum 10 tags allowed");
    });

    it("throws when a tag is less than 2 characters", () => {
      expect(() =>
        validateCreatePostInput({
          ...validPost,
          tags: ["a"],
        })
      ).toThrow(
        "Each tag must contain at least 2 characters"
      );
    });

    it("throws when a tag is not a string", () => {
      expect(() =>
        validateCreatePostInput({
          ...validPost,
          tags: [123],
        })
      ).toThrow(
        "Each tag must contain at least 2 characters"
      );
    });
  });

  describe("validateUpdatePostInput", () => {
    it("accepts valid update data", () => {
      expect(() =>
        validateUpdatePostInput({
          title: "Updated Blog Title",
        })
      ).not.toThrow();
    });

    it("throws when update object is empty", () => {
      expect(() =>
        validateUpdatePostInput({})
      ).toThrow("No update data provided");
    });

    it("throws when updated title is too short", () => {
      expect(() =>
        validateUpdatePostInput({
          title: "abc",
        })
      ).toThrow(
        "Title must be between 5 and 80 characters"
      );
    });

    it("throws when updated title is too long", () => {
      expect(() =>
        validateUpdatePostInput({
          title: "A".repeat(81),
        })
      ).toThrow(
        "Title must be between 5 and 80 characters"
      );
    });

    it("throws when updated excerpt exceeds limit", () => {
      expect(() =>
        validateUpdatePostInput({
          excerpt: "A".repeat(171),
        })
      ).toThrow(
        "Excerpt cannot exceed 170 characters"
      );
    });

    it("throws when updated content is too short", () => {
      expect(() =>
        validateUpdatePostInput({
          content: "short",
        })
      ).toThrow(
        "Content must be at least 150 characters"
      );
    });

    it("throws when tags is not an array", () => {
      expect(() =>
        validateUpdatePostInput({
          tags: "nodejs",
        })
      ).toThrow("Tags must be an array");
    });
  });

  describe("validateObjectId", () => {
    it("accepts valid ObjectId", () => {
      const id = new mongoose.Types.ObjectId().toString();

      expect(() =>
        validateObjectId(id)
      ).not.toThrow();
    });

    it("throws for invalid ObjectId", () => {
      expect(() =>
        validateObjectId("invalid-id")
      ).toThrow("Invalid ID");
    });
  });
});