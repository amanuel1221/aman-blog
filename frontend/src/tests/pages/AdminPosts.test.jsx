import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect } from "vitest";
import AdminPosts from "../../admin/pages/AdminPosts";

describe("AdminPosts Page", () => {
  it("renders the admin posts page and create button", () => {
    render(
      <MemoryRouter>
        <AdminPosts />
      </MemoryRouter>
    );

    expect(screen.getByTestId("admin-posts-page")).toBeInTheDocument();
    expect(screen.getByTestId("admin-posts-heading")).toHaveTextContent("Posts Management");
    expect(screen.getByTestId("admin-create-post-button")).toBeInTheDocument();
  });

  it("navigates to create page when the create button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/admin/posts"]}>
        <Routes>
          <Route path="/admin/posts" element={<AdminPosts />} />
          <Route path="/admin/posts/create" element={<div>Create page</div>} />
        </Routes>
      </MemoryRouter>
    );

    await user.click(screen.getByTestId("admin-create-post-button"));
    expect(await screen.findByText(/create page/i)).toBeInTheDocument();
  });

  it("removes a post from the list when delete is clicked", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <AdminPosts />
      </MemoryRouter>
    );

    const deleteButtons = screen.getAllByTestId("post-delete-1");
    expect(deleteButtons.length).toBeGreaterThan(0);

    await user.click(deleteButtons[0]);
    expect(screen.queryByText(/React Performance Tips/i)).not.toBeInTheDocument();
  });
});
