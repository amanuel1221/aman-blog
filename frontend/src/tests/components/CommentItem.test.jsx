import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import CommentItem from "../../components/CommentItem";

describe("CommentItem Component", () => {
  const mockComment = {
    _id: "c1",
    content: "This is a test comment",
    createdAt: new Date().toISOString(),
    author: {
      _id: "u1",
      name: "Amanuel",
    },
    likes: [],
    dislikes: [],
  };

  const defaultProps = {
    comment: mockComment,
    replies: [],
    onReply: vi.fn(),
    onEdit: vi.fn(),
    onDelete: vi.fn(),
    onLike: vi.fn(),
    onDislike: vi.fn(),
    currentUserId: "u1",
    currentUserName: "Amanuel",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders comment correctly", () => {
    render(<CommentItem {...defaultProps} />);

    expect(screen.getByTestId("comment-item")).toBeInTheDocument();
    expect(screen.getByText("Amanuel")).toBeInTheDocument();
    expect(screen.getByText("This is a test comment")).toBeInTheDocument();
  });

  it("renders fallback author when missing", () => {
    const noAuthorComment = {
      ...mockComment,
      author: null,
    };

    render(<CommentItem {...defaultProps} comment={noAuthorComment} />);

    expect(screen.getByText("Anonymous")).toBeInTheDocument();
  });

  it("toggles reply box when reply button is clicked", async () => {
    const user = userEvent.setup();
    render(<CommentItem {...defaultProps} />);

    const replyBtn = screen.getByTestId("comment-reply-button");
    await user.click(replyBtn);

    expect(screen.getByTestId("comment-reply-textarea")).toBeInTheDocument();
  });

  it("allows user to type reply text", async () => {
    const user = userEvent.setup();
    render(<CommentItem {...defaultProps} />);

    await user.click(screen.getByTestId("comment-reply-button"));

    const textarea = screen.getByTestId("comment-reply-textarea");
    await user.type(textarea, "This is a reply");

    expect(textarea.value).toBe("This is a reply");
  });

  it("calls onReply when submitting reply", async () => {
    const user = userEvent.setup();
    defaultProps.onReply.mockResolvedValue(true);

    render(<CommentItem {...defaultProps} />);

    await user.click(screen.getByTestId("comment-reply-button"));
    await user.type(screen.getByTestId("comment-reply-textarea"), "My reply");
    await user.click(screen.getByTestId("comment-reply-submit-button"));

    expect(defaultProps.onReply).toHaveBeenCalledWith("c1", "My reply");
  });

  it("does not submit empty reply", async () => {
    const user = userEvent.setup();
    render(<CommentItem {...defaultProps} />);

    await user.click(screen.getByTestId("comment-reply-button"));
    await user.click(screen.getByTestId("comment-reply-submit-button"));

    expect(defaultProps.onReply).not.toHaveBeenCalled();
  });

  it("renders replies when provided", () => {
    const mockReplies = [
      {
        _id: "r1",
        content: "This is a reply",
        author: { _id: "u2", name: "User1" },
        likes: [],
        dislikes: [],
      },
    ];

    render(<CommentItem {...defaultProps} replies={mockReplies} />);

    expect(screen.getByTestId("comment-replies")).toBeInTheDocument();
    expect(screen.getByText("This is a reply")).toBeInTheDocument();
    expect(screen.getByText("User1")).toBeInTheDocument();
  });

  it("triggers edit mode and saves comment changes", async () => {
    const user = userEvent.setup();
    defaultProps.onEdit.mockResolvedValue(true);

    render(<CommentItem {...defaultProps} />);

    const editBtn = screen.getByTestId("comment-edit-button");
    await user.click(editBtn);

    const textarea = screen.getByTestId("comment-edit-textarea");
    await user.clear(textarea);
    await user.type(textarea, "Updated comment text");

    await user.click(screen.getByTestId("comment-edit-save-button"));
    expect(defaultProps.onEdit).toHaveBeenCalledWith("c1", "Updated comment text");
  });

  it("calls onLike when comment like button is clicked", async () => {
    const user = userEvent.setup();
    render(<CommentItem {...defaultProps} />);

    const likeBtn = screen.getByTestId("comment-like-button");
    await user.click(likeBtn);

    expect(defaultProps.onLike).toHaveBeenCalledWith("c1");
  });

  it("calls onDelete when comment delete button is clicked", async () => {
    const user = userEvent.setup();
    render(<CommentItem {...defaultProps} />);

    const deleteBtn = screen.getByTestId("comment-delete-button");
    await user.click(deleteBtn);

    expect(defaultProps.onDelete).toHaveBeenCalledWith("c1");
  });
});