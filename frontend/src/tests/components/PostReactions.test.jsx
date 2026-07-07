import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import PostReactions from "../../components/PostReactions";
import { useAuth } from "../../context/AuthContext";
import * as postApi from "../../api/postApi";

// Corrected mock fields using _id to match the component's tracking logic
const mockUser = { _id: "user-1" };
const mockNavigate = vi.fn();

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

vi.mock("../../api/postApi", () => ({
  likePost: vi.fn(),
  dislikePost: vi.fn(),
}));

const renderComponent = (props) => {
  return render(
    <MemoryRouter>
      <PostReactions postId="post-1" {...props} />
    </MemoryRouter>
  );
};

describe("PostReactions Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    postApi.likePost.mockResolvedValue({ data: { liked: true, disliked: false } });
    postApi.dislikePost.mockResolvedValue({ data: { liked: false, disliked: true } });
  });

  it("renders component correctly", () => {
    useAuth.mockReturnValue({ user: mockUser });

    renderComponent({ initialLikes: [], initialDislikes: [] });

    expect(screen.getByTestId("post-reactions")).toBeInTheDocument();
    expect(screen.getByText("Was this article helpful?")).toBeInTheDocument();
  });

  it("shows initial like and dislike counts", () => {
    useAuth.mockReturnValue({ user: mockUser });

    renderComponent({
      initialLikes: ["user-1", "user-2"],
      initialDislikes: ["user-3"],
    });

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("adds like when user clicks like button", async () => {
    useAuth.mockReturnValue({ user: mockUser });
    const user = userEvent.setup();

    renderComponent({ initialLikes: [], initialDislikes: [] });

    const likeBtn = screen.getAllByRole("button")[0];
    await user.click(likeBtn);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(postApi.likePost).toHaveBeenCalledWith("post-1");
  });



  it("adds dislike and removes like when disliking", async () => {
    useAuth.mockReturnValue({ user: mockUser });
    const user = userEvent.setup();

    renderComponent({ initialLikes: ["user-1"], initialDislikes: [] });

    const dislikeBtn = screen.getAllByRole("button")[1];
    await user.click(dislikeBtn);

    expect(screen.getByText("0")).toBeInTheDocument(); // Likes decremented
    expect(screen.getByText("1")).toBeInTheDocument(); // Dislikes incremented
  });

  it("triggers login redirect sequence when user is not logged in", async () => {
    useAuth.mockReturnValue({ user: null });
    const user = userEvent.setup();

    renderComponent({ initialLikes: [], initialDislikes: [] });

    const likeBtn = screen.getAllByRole("button")[0];
    await user.click(likeBtn);

    // Confirms interaction blocks API propagation safely
    expect(postApi.likePost).not.toHaveBeenCalled();
  });

  it("removes dislike when already disliked", async () => {
    useAuth.mockReturnValue({ user: mockUser });
    const user = userEvent.setup();
    postApi.dislikePost.mockResolvedValueOnce({ data: { liked: false, disliked: false } });

    renderComponent({ initialLikes: [], initialDislikes: ["user-1"] });

    const dislikeBtn = screen.getAllByRole("button")[1];
    await user.click(dislikeBtn);

    expect(dislikeBtn).toHaveTextContent("0");
  });

  it("removes dislike when user likes the post", async () => {
    useAuth.mockReturnValue({ user: mockUser });
    const user = userEvent.setup();

    renderComponent({ initialLikes: [], initialDislikes: ["user-1"] });

    const likeBtn = screen.getAllByRole("button")[0];
    await user.click(likeBtn);

    expect(likeBtn).toHaveTextContent("1");
    expect(screen.getAllByRole("button")[1]).toHaveTextContent("0");
  });

  it("handles invalid initialLikes prop safely", () => {
    useAuth.mockReturnValue({ user: mockUser });

    renderComponent({ initialLikes: null, initialDislikes: [] });

    expect(screen.getAllByRole("button")[0]).toHaveTextContent("0");
  });

  it("handles invalid initialDislikes prop safely", () => {
    useAuth.mockReturnValue({ user: mockUser });

    renderComponent({ initialLikes: [], initialDislikes: null });

    expect(screen.getAllByRole("button")[1]).toHaveTextContent("0");
  });

  it("switches back and forth dynamically from like to dislike layout states", async () => {
    useAuth.mockReturnValue({ user: mockUser });
    const user = userEvent.setup();

    renderComponent({ initialLikes: [], initialDislikes: [] });

    const buttons = screen.getAllByRole("button");

    await user.click(buttons[0]);
    expect(buttons[0]).toHaveTextContent("1");

    await user.click(buttons[1]);
    expect(buttons[0]).toHaveTextContent("0");
    expect(buttons[1]).toHaveTextContent("1");
  });
});