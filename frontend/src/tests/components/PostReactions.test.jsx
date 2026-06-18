import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import PostReactions from  "../../components/PostReactions";


const mockUser = { id: "user-1" };

vi.mock("../../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from "../../context/AuthContext";

describe("PostReactions Component", () => {
  const postId = "post-1";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders component correctly", () => {
    useAuth.mockReturnValue({ user: mockUser });

    render(
      <PostReactions
        postId={postId}
        initialLikes={[]}
        initialDislikes={[]}
        currentUserId="user-1"
      />
    );

    expect(screen.getByTestId("post-reactions")).toBeInTheDocument();
    expect(screen.getByText("Was this article helpful?")).toBeInTheDocument();
  });

  it("shows initial like and dislike counts", () => {
    useAuth.mockReturnValue({ user: mockUser });

    render(
      <PostReactions
        postId={postId}
        initialLikes={["user-1", "user-2"]}
        initialDislikes={["user-3"]}
        currentUserId="user-1"
      />
    );

    expect(screen.getByText("2")).toBeInTheDocument(); // likes
    expect(screen.getByText("1")).toBeInTheDocument(); // dislikes
  });

  it("adds like when user clicks like button", () => {
    useAuth.mockReturnValue({ user: mockUser });

    render(
      <PostReactions
        postId={postId}
        initialLikes={[]}
        initialDislikes={[]}
        currentUserId="user-1"
      />
    );

    const likeBtn = screen.getAllByRole("button")[0];
    fireEvent.click(likeBtn);

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("removes like when already liked", () => {
    useAuth.mockReturnValue({ user: mockUser });

    render(
      <PostReactions
        postId={postId}
        initialLikes={["user-1"]}
        initialDislikes={[]}
        currentUserId="user-1"
      />
    );

    const likeBtn = screen.getAllByRole("button")[0];
    fireEvent.click(likeBtn);

    const likeCount = likeBtn.querySelector("span");

  expect(likeCount.textContent).toBe("0");
  });

  it("adds dislike and removes like when disliking", () => {
    useAuth.mockReturnValue({ user: mockUser });

    render(
      <PostReactions
        postId={postId}
        initialLikes={["user-1"]}
        initialDislikes={[]}
        currentUserId="user-1"
      />
    );

    const dislikeBtn = screen.getAllByRole("button")[1];
    fireEvent.click(dislikeBtn);

    // dislike added, like removed
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("shows alert when user is not logged in", () => {
    useAuth.mockReturnValue({ user: null });

    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(
      <PostReactions
        postId={postId}
        initialLikes={[]}
        initialDislikes={[]}
        currentUserId="user-1"
      />
    );

    const likeBtn = screen.getAllByRole("button")[0];
    fireEvent.click(likeBtn);

    expect(alertMock).toHaveBeenCalledWith("Please login to react");

    alertMock.mockRestore();
  });
  it("removes dislike when already disliked", () => {
  useAuth.mockReturnValue({ user: mockUser });

  render(
    <PostReactions
      postId={postId}
      initialLikes={[]}
      initialDislikes={["user-1"]}
      currentUserId="user-1"
    />
  );

  const dislikeBtn = screen.getAllByRole("button")[1];

  fireEvent.click(dislikeBtn);

  expect(dislikeBtn).toHaveTextContent("0");
});
it("removes dislike when user likes the post", () => {
  useAuth.mockReturnValue({ user: mockUser });

  render(
    <PostReactions
      postId={postId}
      initialLikes={[]}
      initialDislikes={["user-1"]}
      currentUserId="user-1"
    />
  );

  const likeBtn = screen.getAllByRole("button")[0];

  fireEvent.click(likeBtn);

  expect(likeBtn).toHaveTextContent("1");

  const dislikeBtn = screen.getAllByRole("button")[1];

  expect(dislikeBtn).toHaveTextContent("0");
});
it("handles invalid initialLikes prop", () => {
  useAuth.mockReturnValue({ user: mockUser });

  render(
    <PostReactions
      postId={postId}
      initialLikes={null}
      initialDislikes={[]}
      currentUserId="user-1"
    />
  );

  expect(screen.getAllByRole("button")[0]).toHaveTextContent("0");
});
it("handles invalid initialDislikes prop", () => {
  useAuth.mockReturnValue({ user: mockUser });

  render(
    <PostReactions
      postId={postId}
      initialLikes={[]}
      initialDislikes={null}
      currentUserId="user-1"
    />
  );

  expect(screen.getAllByRole("button")[1]).toHaveTextContent("0");
});
it("switches from like to dislike", () => {
  useAuth.mockReturnValue({ user: mockUser });

  render(
    <PostReactions
      postId={postId}
      initialLikes={[]}
      initialDislikes={[]}
      currentUserId="user-1"
    />
  );

  const buttons = screen.getAllByRole("button");

  fireEvent.click(buttons[0]);

  expect(buttons[0]).toHaveTextContent("1");

  fireEvent.click(buttons[1]);

  expect(buttons[0]).toHaveTextContent("0");

  expect(buttons[1]).toHaveTextContent("1");
});
it("switches from dislike to like", () => {
  useAuth.mockReturnValue({ user: mockUser });

  render(
    <PostReactions
      postId={postId}
      initialLikes={[]}
      initialDislikes={[]}
      currentUserId="user-1"
    />
  );

  const buttons = screen.getAllByRole("button");

  fireEvent.click(buttons[1]);

  expect(buttons[1]).toHaveTextContent("1");

  fireEvent.click(buttons[0]);

  expect(buttons[0]).toHaveTextContent("1");

  expect(buttons[1]).toHaveTextContent("0");
});
});