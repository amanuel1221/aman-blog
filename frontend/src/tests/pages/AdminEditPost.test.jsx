import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AdminEditPost from "../../admin/pages/AdminEditPost";
import * as postApi from "../../api/postApi";

// 1. Mock the API module paths entirely
vi.mock("../../api/postApi", () => ({
  getPostById: vi.fn(),
  updatePost: vi.fn(),
}));

// 2. Setup standard wrapper utilities for React Router parameters tracking
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockPost = {
  title: "Exploring React Architecture",
  excerpt: "A neat breakdown summary structural review.",
  category: "Development",
  tags: ["react", "frontend"],
  content: "This is a long body context block that easily satisfies the component layout character requirement minimum of at least one hundred and fifty string characters long to run smoothly.",
  coverImage: { url: "https://example.com/cover.jpg" },
};

const renderWithRouter = () => {
  return render(
    <MemoryRouter initialEntries={["/admin/posts/edit/mock-id-123"]}>
      <Routes>
        <Route path="/admin/posts/edit/:id" element={<AdminEditPost />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("AdminEditPost Page Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock behavior to keep success flows clear
    postApi.getPostById.mockResolvedValue({ data: { post: mockPost } });
  });

  it("shows initial loading state wheel before shifting down to production form display", async () => {
    // Force unresolved network response delay
    postApi.getPostById.mockReturnValueOnce(new Promise(() => {}));
    renderWithRouter();

    expect(screen.getByTestId("loading-state")).toBeInTheDocument();
    expect(screen.getByText(/loading post details/i)).toBeInTheDocument();
  });

  it("populates state payload variables perfectly upon mounting API cycle resolution", async () => {
    renderWithRouter();

    await waitFor(() => {
      expect(screen.queryByTestId("loading-state")).not.toBeInTheDocument();
    });

    expect(screen.getByTestId("input-title")).value = mockPost.title;
    expect(screen.getByTestId("input-category")).value = mockPost.category;
    expect(screen.getByTestId("input-excerpt")).value = mockPost.excerpt;
    expect(screen.getByTestId("input-tags")).value = "react, frontend";
    expect(screen.getByTestId("input-content")).value = mockPost.content;
    
    const previewImage = screen.getByTestId("image-preview");
    expect(previewImage).toHaveAttribute("src", mockPost.coverImage.url);
  });

  it("triggers validation errors for essential required input fields", async () => {
    const user = userEvent.setup();
    renderWithRouter();
    await screen.findByTestId("admin-edit-post-form");

    // Clear titles and contents to check client validator limits
    const titleInput = screen.getByTestId("input-title");
    const contentInput = screen.getByTestId("input-content");

    await user.clear(titleInput);
    await user.clear(contentInput);
    await user.click(screen.getByTestId("btn-submit"));

    expect(screen.getByTestId("error-title")).toHaveTextContent("Title is required");
    expect(screen.getByTestId("error-content")).toHaveTextContent("Content is required");
    expect(postApi.updatePost).not.toHaveBeenCalled();
  });

  it("enforces a strict minimum body composition constraint limit length", async () => {
    const user = userEvent.setup();
    renderWithRouter();
    await screen.findByTestId("admin-edit-post-form");

    const contentInput = screen.getByTestId("input-content");
    await user.clear(contentInput);
    await user.type(contentInput, "Short snippet");

    await user.click(screen.getByTestId("btn-submit"));

    expect(screen.getByTestId("error-content")).toHaveTextContent(
      /content must be at least 150 characters/i
    );
    expect(postApi.updatePost).not.toHaveBeenCalled();
  });

  it("updates visual layout images on custom client desktop selection", async () => {
    const user = userEvent.setup();
    global.URL.createObjectURL = vi.fn(() => "mock-blob-preview-url");
    
    renderWithRouter();
    await screen.findByTestId("admin-edit-post-form");

    const file = new File(["dummy content"], "test-cover.png", { type: "image/png" });
    const fileInput = screen.getByTestId("input-file");

    await user.upload(fileInput, file);

    expect(fileInput.files[0]).toBe(file);
    expect(fileInput.files.length).toBe(1);
    expect(screen.getByTestId("image-preview")).toHaveAttribute("src", "mock-blob-preview-url");
  });

  

  it("handles catch response network rejects gracefully and displays clear server errors", async () => {
    const user = userEvent.setup();
    postApi.updatePost.mockRejectedValueOnce({
      response: { data: { message: "Database constraint breach detected." } },
    });

    renderWithRouter();
    await screen.findByTestId("admin-edit-post-form");

    await user.click(screen.getByTestId("btn-submit"));

    await waitFor(() => {
      expect(screen.getByTestId("server-error")).toHaveTextContent(
        "Database constraint breach detected."
      );
    });
  });

  it("returns parameters upstream safely when selecting cancel workflows", async () => {
    const user = userEvent.setup();
    renderWithRouter();
    await screen.findByTestId("admin-edit-post-form");

    await user.click(screen.getByTestId("btn-cancel"));
    expect(mockNavigate).toHaveBeenCalledWith("/admin/posts");
  });
});