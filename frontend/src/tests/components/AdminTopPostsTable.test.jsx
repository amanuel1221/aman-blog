import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import TopPostsTable from "../../admin/components/TopPostsTable";

const posts = [
  {
    id: "1",
    title: "Test Post One",
    excerpt: "Short excerpt for test post one.",
    views: 1000,
    likes: 80,
    comments: 5,
    createdAt: "2026-07-01T00:00:00.000Z",
  },
];

describe("Admin TopPostsTable", () => {
  it("renders the top posts table container", () => {
    render(
      <MemoryRouter>
        <TopPostsTable posts={posts} />
      </MemoryRouter>
    );

    expect(screen.getByTestId("top-posts-table")).toBeInTheDocument();
  });

  it("renders the post title and link correctly", () => {
    render(
      <MemoryRouter>
        <TopPostsTable posts={posts} />
      </MemoryRouter>
    );

    const titleNodes = screen.getAllByText(posts[0].title);
    expect(titleNodes.length).toBeGreaterThan(0);

    const postLink = screen.getByRole("link", { name: /view details for post test post one/i });
    expect(postLink).toHaveAttribute("href", "/blogs/1");
  });

  it("calls edit and delete callbacks for admin post actions", async () => {
    const onEditPost = vi.fn();
    const onDeletePost = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <TopPostsTable posts={posts} onEditPost={onEditPost} onDeletePost={onDeletePost} />
      </MemoryRouter>
    );

    const editButtons = screen.getAllByTestId("post-edit-1");
    const deleteButtons = screen.getAllByTestId("post-delete-1");

    await user.click(editButtons[0]);
    await user.click(deleteButtons[0]);

    expect(onEditPost).toHaveBeenCalledWith("1");
    expect(onDeletePost).toHaveBeenCalledWith("1");
  });
});
