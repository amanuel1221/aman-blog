import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import PostComments from "../../components/PostComments";
import { useAuth } from "../../context/AuthContext";
import * as commentApi from "../../api/commentApi";

const mockUser = {
  id: "user-1",
  name: "Amanuel",
};

const mockNavigate = vi.fn();

// Mock all internal structural dependencies 
vi.mock("../../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../api/commentApi", () => ({
  getComments: vi.fn(),
  createComment: vi.fn(),
  updateComment: vi.fn(),
  deleteComment: vi.fn(),
  likeComment: vi.fn(),
  dislikeComment: vi.fn(),
}));

// Mock CommentItem to isolate the list rendering cleanly
vi.mock("../../components/CommentItem", () => ({
  default: ({ comment }) => (
    <div data-testid="comment-item">
      {comment.content}
    </div>
  ),
}));

const mockCommentsPayload = [
  {
    _id: "comment1",
    content: "First comment",
    post: "post-1",
    parentComment: null,
    author: { _id: "user-1", name: "Amanuel" },
  },
];

const renderComponent = (postId = "post-1") => {
  return render(
    <MemoryRouter>
      <PostComments postId={postId} />
    </MemoryRouter>
  );
};

describe("PostComments Component", () => {
  const postId = "post-1";

  beforeEach(() => {
    vi.clearAllMocks();
    // Default resolve profile matching standard conditions
    commentApi.getComments.mockResolvedValue({
      data: { comments: mockCommentsPayload },
    });
  });

  it("renders component correctly", async () => {
    useAuth.mockReturnValue({ user: mockUser });
    renderComponent(postId);

    expect(await screen.findByTestId("post-comments")).toBeInTheDocument();
    expect(screen.getByTestId("post-comments-length")).toHaveTextContent("1 Response");
  });

  it("shows login warning when user is not logged in", async () => {
    useAuth.mockReturnValue({ user: null });
    renderComponent(postId);

    expect(
      await screen.findByText("Sign in to leave comments and participate in discussions.")
    ).toBeInTheDocument();
  });

  it("renders empty state when no root comments exist", async () => {
    useAuth.mockReturnValue({ user: mockUser });
    commentApi.getComments.mockResolvedValueOnce({ data: { comments: [] } });

    renderComponent("no-comments-post");

    expect(await screen.findByTestId("post-comments-empty")).toBeInTheDocument();
  });

  it("allows user to type in comment box", async () => {
    useAuth.mockReturnValue({ user: mockUser });
    const user = userEvent.setup();
    renderComponent(postId);

    const textarea = await screen.findByPlaceholderText("What are your thoughts on this article?...");
    await user.type(textarea, "Hello world comment");

    expect(textarea.value).toBe("Hello world comment");
  });

  it("enables submit button when text is entered", async () => {
    useAuth.mockReturnValue({ user: mockUser });
    const user = userEvent.setup();
    renderComponent(postId);

    const textarea = await screen.findByPlaceholderText("What are your thoughts on this article?...");
    const button = screen.getByTestId("post-comments-submit");

    expect(button).toBeDisabled();

    await user.type(textarea, "My comment");
    expect(button).not.toBeDisabled();
  });

  it("prevents submission and redirects when user is not logged in", async () => {
    useAuth.mockReturnValue({ user: null });
    const user = userEvent.setup();
    renderComponent(postId);

    const textarea = await screen.findByPlaceholderText("What are your thoughts on this article?...");
    await user.type(textarea, "Test comment");

    const button = screen.getByTestId("post-comments-submit");
    await user.click(button);

    // Should not trigger create api calls
    expect(commentApi.createComment).not.toHaveBeenCalled();
  });

  it("adds a new comment successfully and clears text box", async () => {
    useAuth.mockReturnValue({ user: mockUser });
    const user = userEvent.setup();
    
    commentApi.createComment.mockResolvedValueOnce({ data: {} });
    renderComponent(postId);

    const textarea = await screen.findByPlaceholderText("What are your thoughts on this article?...");
    const button = screen.getByTestId("post-comments-submit");

    await user.type(textarea, "New comment content");
    
    // Setup refreshed mock list return for the reload sequence trigger
    commentApi.getComments.mockResolvedValueOnce({
      data: {
        comments: [
          ...mockCommentsPayload,
          { _id: "comment2", content: "New comment content", parentComment: null },
        ],
      },
    });

    await user.click(button);

    await waitFor(() => {
      expect(commentApi.createComment).toHaveBeenCalledWith(postId, "New comment content");
      expect(textarea.value).toBe("");
    });
  });

  it("shows first letter of user name", async () => {
    useAuth.mockReturnValue({ user: mockUser });
    renderComponent(postId);

    expect(await screen.findByText("A")).toBeInTheDocument();
  });

  it("shows U when user has no name", async () => {
    useAuth.mockReturnValue({ user: { id: "1" } });
    renderComponent(postId);

    expect(await screen.findByText("U")).toBeInTheDocument();
  });

  it("does not allow whitespace comments", async () => {
    useAuth.mockReturnValue({ user: mockUser });
    const user = userEvent.setup();
    renderComponent(postId);

    const textarea = await screen.findByPlaceholderText("What are your thoughts on this article?...");
    const button = screen.getByTestId("post-comments-submit");

    await user.type(textarea, "      ");
    expect(button).toBeDisabled();
  });
});