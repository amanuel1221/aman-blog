import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CommentItem from "../../components/CommentItem";

describe("CommentItem Component", () => {
  const mockComment = {
    _id: "c1",
    content: "This is a test comment",
    createdAt: new Date().toISOString(),
    author: {
      name: "Amanuel",
    },
  };

  const mockReplyFn = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders comment correctly", () => {
    render(
      <CommentItem comment={mockComment} onReply={mockReplyFn} />
    );

    expect(screen.getByTestId("comment-item")).toBeInTheDocument();
    expect(screen.getByText("Amanuel")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test comment")
    ).toBeInTheDocument();
  });

  it("renders fallback author when missing", () => {
    const noAuthorComment = {
      ...mockComment,
      author: null,
    };

    render(
      <CommentItem comment={noAuthorComment} onReply={mockReplyFn} />
    );

    expect(screen.getByText("Anonymous")).toBeInTheDocument();
  });

  it("toggles reply box when reply button is clicked", () => {
    render(
      <CommentItem comment={mockComment} onReply={mockReplyFn} />
    );

    const replyBtn = screen.getByTestId("comment-reply-button");

    fireEvent.click(replyBtn);

    expect(
      screen.getByTestId("comment-reply-textarea")
    ).toBeInTheDocument();
  });

  it("allows user to type reply text", () => {
    render(
      <CommentItem comment={mockComment} onReply={mockReplyFn} />
    );

    fireEvent.click(screen.getByTestId("comment-reply-button"));

    const textarea = screen.getByTestId("comment-reply-textarea");

    fireEvent.change(textarea, {
      target: { value: "This is a reply" },
    });

    expect(textarea.value).toBe("This is a reply");
  });

  it("calls onReply when submitting reply", () => {
    render(
      <CommentItem comment={mockComment} onReply={mockReplyFn} />
    );

    fireEvent.click(screen.getByTestId("comment-reply-button"));

    fireEvent.change(
      screen.getByTestId("comment-reply-textarea"),
      {
        target: { value: "My reply" },
      }
    );

    fireEvent.click(
      screen.getByTestId("comment-reply-submit-button")
    );

    expect(mockReplyFn).toHaveBeenCalledWith(
      "c1",
      "My reply"
    );
  });

  it("does not submit empty reply", () => {
    render(
      <CommentItem comment={mockComment} onReply={mockReplyFn} />
    );

    fireEvent.click(screen.getByTestId("comment-reply-button"));

    fireEvent.click(
      screen.getByTestId("comment-reply-submit-button")
    );

    expect(mockReplyFn).not.toHaveBeenCalled();
  });

  it("renders replies when provided", () => {
    const mockReplies = [
      {
        _id: "r1",
        content: "This is a reply",
        author: { name: "User1" },
      },
    ];

    render(
      <CommentItem
        comment={mockComment}
        replies={mockReplies}
        onReply={mockReplyFn}
      />
    );

    expect(
      screen.getByText("This is a reply")
    ).toBeInTheDocument();

    expect(screen.getByText("User1")).toBeInTheDocument();
  });
});