import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import PostComments from "../../components/PostComments";

const mockUser = {
  id: "user-1",
  name: "Amanuel",
};

vi.mock("../../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

vi.mock("../../components/CommentItem", () => ({
  default: ({ comment }) => (
    <div data-testid="comment-item">
      {comment.content}
    </div>
  ),
}));

vi.mock("../../store/mockComments", () => ({
  default: [
    {
      _id: "comment1",
      content: "First comment",
      post: "post-1",
      parentComment: null,
      author: {
        _id: "1",
        name: "Amanuel",
      },
    },
  ],
}));

import { useAuth } from "../../context/AuthContext";


describe("PostComments Component", () => {
  const postId = "post-1";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders component correctly", () => {
    useAuth.mockReturnValue({ user: mockUser });

    render(<PostComments postId={postId} />);

    expect(screen.getByTestId("post-comments")).toBeInTheDocument();
    expect(screen.getByTestId("post-comments-length")).toBeInTheDocument();
  });

  it("shows login warning when user is not logged in", () => {
    useAuth.mockReturnValue({ user: null });

    render(<PostComments postId={postId} />);

    expect(
      screen.getByText(
        "Sign in to leave comments and participate in discussions."
      )
    ).toBeInTheDocument();
  });

  it("renders empty state when no root comments exist", () => {
    useAuth.mockReturnValue({ user: mockUser });

    render(<PostComments postId="no-comments-post" />);

    expect(screen.getByTestId("post-comments-empty")).toBeInTheDocument();
  });

  it("allows user to type in comment box", () => {
    useAuth.mockReturnValue({ user: mockUser });

    render(<PostComments postId={postId} />);

    const textarea = screen.getByPlaceholderText(
      "What are your thoughts on this article?..."
    );

    fireEvent.change(textarea, {
      target: { value: "Hello world comment" },
    });

    expect(textarea.value).toBe("Hello world comment");
  });

  it("enables submit button when text is entered", () => {
    useAuth.mockReturnValue({ user: mockUser });

    render(<PostComments postId={postId} />);

    const textarea = screen.getByPlaceholderText(
      "What are your thoughts on this article?..."
    );

    const button = screen.getByTestId("post-comments-submit");

    fireEvent.change(textarea, {
      target: { value: "My comment" },
    });

    expect(button).not.toBeDisabled();
  });

  it("prevents submission when user is not logged in", () => {
    useAuth.mockReturnValue({ user: null });

    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<PostComments postId={postId} />);

    const textarea = screen.getByPlaceholderText(
      "What are your thoughts on this article?..."
    );

    fireEvent.change(textarea, {
      target: { value: "Test comment" },
    });

    const button = screen.getByTestId("post-comments-submit");
    fireEvent.click(button);

    expect(alertMock).toHaveBeenCalledWith("Please login to react");

    alertMock.mockRestore();
  });
  it("adds a new comment successfully", () => {
  useAuth.mockReturnValue({ user: mockUser });

  render(<PostComments postId={postId} />);

  const textarea = screen.getByPlaceholderText(
    "What are your thoughts on this article?..."
  );

  fireEvent.change(textarea, {
    target: { value: "New comment" },
  });

  fireEvent.click(
    screen.getByTestId("post-comments-submit")
  );

  expect(
    screen.getByText("New comment")
  ).toBeInTheDocument();
});
it("clears textarea after successful submission", () => {
  useAuth.mockReturnValue({ user: mockUser });

  render(<PostComments postId={postId} />);

  const textarea = screen.getByPlaceholderText(
    "What are your thoughts on this article?..."
  );

  fireEvent.change(textarea, {
    target: { value: "Testing comment" },
  });

  fireEvent.click(
    screen.getByTestId("post-comments-submit")
  );

  expect(textarea.value).toBe("");
});
it("shows first letter of user name", () => {
  useAuth.mockReturnValue({ user: mockUser });

  render(<PostComments postId={postId} />);

  expect(screen.getByText("A")).toBeInTheDocument();
});
it("shows U when user has no name", () => {
  useAuth.mockReturnValue({
    user: {
      id: "1",
    },
  });

  render(<PostComments postId={postId} />);

  expect(screen.getByText("U")).toBeInTheDocument();
});
it("disables submit button initially", () => {
  useAuth.mockReturnValue({ user: mockUser });

  render(<PostComments postId={postId} />);

  expect(
    screen.getByTestId("post-comments-submit")
  ).toBeDisabled();
});
it("does not allow whitespace comments", () => {
  useAuth.mockReturnValue({ user: mockUser });

  render(<PostComments postId={postId} />);

  const textarea = screen.getByPlaceholderText(
    "What are your thoughts on this article?..."
  );

  fireEvent.change(textarea, {
    target: { value: "      " },
  });

  expect(
    screen.getByTestId("post-comments-submit")
  ).toBeDisabled();
});

it("enables submit button when text is entered", async () => {
  useAuth.mockReturnValue({ user: mockUser });

  const user = userEvent.setup();

  render(<PostComments postId={postId} />);

  const textarea = screen.getByPlaceholderText(
    "What are your thoughts on this article?..."
  );

  const button = screen.getByTestId(
    "post-comments-submit"
  );

  await user.type(textarea, "My comment");

  expect(button).not.toBeDisabled();
});
});