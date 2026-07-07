import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AdminPosts from "../../admin/pages/AdminPosts";
import * as postApi from "../../api/postApi";

vi.mock("../../api/postApi", () => ({
  getPosts: vi.fn(),
  deletePost: vi.fn(),
}));

vi.mock("../components/StatCard", () => ({
  default: ({ title, value }) => (
    <div data-testid="stat-card">
      {title}: {value}
    </div>
  ),
}));

vi.mock("../components/TopPostsTable", () => ({
  default: ({ posts, onDeletePost }) => (
    <table>
      <tbody>
        {posts.map((post) => (
          <tr key={post._id}>
            <td>{post.title}</td>
            <td>
              <button
                data-testid={`post-delete-${post._id}`}
                onClick={() => onDeletePost(post._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}));

const mockPostsPayload = [
  {
    _id: "1",
    title: "React Performance Tips",
    views: 120,
    commentsCount: 5,
  },
];

describe("AdminPosts Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    postApi.getPosts.mockResolvedValue({
      data: { posts: mockPostsPayload },
    });
  });

  it("renders the admin posts page and matching dashboard headings", async () => {
    render(
      <MemoryRouter>
        <AdminPosts />
      </MemoryRouter>
    );

    expect(await screen.findByTestId("admin-posts-page")).toBeInTheDocument();
    expect(screen.getByTestId("admin-posts-heading")).toHaveTextContent("Content Studio");
    expect(screen.getByTestId("admin-create-post-button")).toBeInTheDocument();
  });

  it("navigates to the creation page when the create button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/admin/posts"]}>
        <Routes>
          <Route path="/admin/posts" element={<AdminPosts />} />
          <Route path="/admin/posts/create" element={<div>Create page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const createBtn = await screen.findByTestId("admin-create-post-button");
    await user.click(createBtn);
    
    expect(await screen.findByText(/create page/i)).toBeInTheDocument();
  });

});