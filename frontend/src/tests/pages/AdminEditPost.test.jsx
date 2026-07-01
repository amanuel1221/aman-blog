import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect } from "vitest";
import AdminEditPost from "../../admin/pages/AdminEditPost";

describe("AdminEditPost Page", () => {
  it("loads the post data and allows updating the post", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/admin/posts/edit/1"]}>
        <Routes>
          <Route path="/admin/posts/edit/:id" element={<AdminEditPost />} />
          <Route path="/admin/posts" element={<div>Admin posts list</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("admin-edit-post-page")).toBeInTheDocument();
    expect(screen.getByTestId("edit-post-title")).toHaveValue("React Performance Tips");
    expect(screen.getByTestId("edit-post-category")).toBeInTheDocument();

    await user.clear(screen.getByTestId("edit-post-title"));
    await user.type(screen.getByTestId("edit-post-title"), "React Performance Best Practices");
    await user.click(screen.getByRole("button", { name: /update post/i }));

    expect(await screen.findByText(/admin posts list/i)).toBeInTheDocument();
  });

  it("shows a not found message for an invalid post id and navigates back", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/admin/posts/edit/999"]}>
        <Routes>
          <Route path="/admin/posts/edit/:id" element={<AdminEditPost />} />
          <Route path="/admin/posts" element={<div>Admin posts list</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("admin-edit-post-not-found")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /back to posts/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /back to posts/i }));
    expect(await screen.findByText(/admin posts list/i)).toBeInTheDocument();
  });
});
