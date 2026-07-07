import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AdminCreatePost from "../../admin/pages/AdminCreatePost";
import * as postApi from "../../api/postApi";

// Intercept backend API requests
vi.mock("../../api/postApi", () => ({
  createPost: vi.fn(),
}));

describe("AdminCreatePost Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the create post form and navigates back after saving", async () => {
    const user = userEvent.setup();
    postApi.createPost.mockResolvedValue({ data: { success: true } });

    render(
      <MemoryRouter initialEntries={["/admin/posts/create"]}>
        <Routes>
          <Route path="/admin/posts/create" element={<AdminCreatePost />} />
          <Route path="/admin/posts" element={<div>Admin posts list</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Confirm core initial UI layers render properly
    expect(screen.getByTestId("admin-create-post-page")).toBeInTheDocument();
    expect(screen.getByTestId("create-post-title")).toBeInTheDocument();

    // Populate data that clears the minimum 150 character schema validation requirement
    const validLongBodyContent = "This is a comprehensive deep dive body text that satisfies the frontend validation threshold requirements by extending beyond one hundred and fifty characters easily.";

    await user.type(screen.getByTestId("create-post-title"), "New admin post title");
    await user.type(screen.getByTestId("create-post-category"), "Tutorial");
    await user.type(screen.getByTestId("create-post-excerpt"), "Short summary of the new post.");
    await user.type(screen.getByTestId("create-post-content"), validLongBodyContent);
    await user.type(screen.getByTestId("create-post-tags"), "react, vitest, quality");

    // Handle file input mock safely instead of passing a text URL string
    const mockFile = new File(["fake-image-bits"], "cover.jpg", { type: "image/jpeg" });
    const fileInput = screen.getByTestId("create-post-coverimage");
    await user.upload(fileInput, mockFile);

    // Verify the image component preview wrapper mounts safely
    expect(screen.getByTestId("create-post-image-preview")).toBeInTheDocument();

    // Submit form payload action
    const submitBtn = screen.getByTestId("create-post-submit");
    await user.click(submitBtn);

    // Confirm backend transmission matches expectations
    await waitFor(() => {
      expect(postApi.createPost).toHaveBeenCalledTimes(1);
      expect(screen.getByText("Admin posts list")).toBeInTheDocument();
    });
  });

  it("displays client side validation errors if form parameters are invalid", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/admin/posts/create"]}>
        <Routes>
          <Route path="/admin/posts/create" element={<AdminCreatePost />} />
        </Routes>
      </MemoryRouter>
    );

    const submitBtn = screen.getByTestId("create-post-submit");
    await user.click(submitBtn);

    // Verify error responses fire correctly
    expect(screen.getByTestId("error-title")).toHaveTextContent("Title must be between 5 and 80 characters");
    expect(screen.getByTestId("error-content")).toHaveTextContent("Content is required and must be at least 150 characters");
    expect(postApi.createPost).not.toHaveBeenCalled();
  });
});