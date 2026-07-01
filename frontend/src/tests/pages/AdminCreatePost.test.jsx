import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect } from "vitest";
import AdminCreatePost from "../../admin/pages/AdminCreatePost";

describe("AdminCreatePost Page", () => {
  it("renders the create post form and navigates back after saving", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/admin/posts/create"]}>
        <Routes>
          <Route path="/admin/posts/create" element={<AdminCreatePost />} />
          <Route path="/admin/posts" element={<div>Admin posts list</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("admin-create-post-page")).toBeInTheDocument();
    expect(screen.getByTestId("create-post-title")).toBeInTheDocument();

    await user.type(screen.getByTestId("create-post-title"), "New admin post title");
    await user.type(screen.getByTestId("create-post-category"), "Tutorial");
    await user.type(screen.getByTestId("create-post-excerpt"), "Short summary of the new post.");
    await user.type(screen.getByTestId("create-post-content"), "This is the body text for the new post.");
    await user.type(screen.getByTestId("create-post-coverimage"), "https://example.com/cover.jpg");

    await user.click(screen.getByRole("button", { name: /save post/i }));

    expect(await screen.findByText(/admin posts list/i)).toBeInTheDocument();
  });
});
