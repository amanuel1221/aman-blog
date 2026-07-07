import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import BlogsPage from "../../pages/BlogPage";
import * as postApi from "../../api/postApi";

vi.mock("../../api/postApi", () => ({
  getPosts: vi.fn(),
}));

vi.mock("../../components/PostCard", () => ({
  default: ({ post }) => (
    <div data-testid="post-card">
      {post.title}
    </div>
  ),
}));

vi.mock("../../components/SearchModal", () => ({
  default: ({ open }) =>
    open ? (
      <div data-testid="search-modal">
        Search Open
      </div>
    ) : null,
}));

const mockPostsPayload = {
  data: {
    posts: Array.from({ length: 8 }, (_, i) => ({
      _id: `id-${i + 1}`,
      title: `Post ${i + 1}`,
      category: i % 2 === 0 ? "React" : "Node",
      createdAt: new Date(`2026-01-${String(i + 1).padStart(2, "0")}T00:00:00.000Z`),
    })),
  },
};

describe("BlogsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollTo = vi.fn();
    postApi.getPosts.mockResolvedValue(mockPostsPayload);
  });

  const renderPage = () =>
    render(
      <HelmetProvider>
        <MemoryRouter>
          <BlogsPage />
        </MemoryRouter>
      </HelmetProvider>
    );

  it("renders header text correctly after data loads", async () => {
    renderPage();

    expect(await screen.findByTestId("blog-page-header")).toBeInTheDocument();
    expect(screen.getByTestId("blog-page-title")).toBeInTheDocument();
    expect(screen.getByTestId("blog-page-description")).toBeInTheDocument();
  });

  it("shows correct current items slice count on active page", async () => {
    renderPage();

    const articleCount = await screen.findByTestId("blog-page-article-count");
    expect(articleCount).toHaveTextContent("6");
  });

  it("renders categories correctly excluding All", async () => {
    renderPage();

    const categoryCount = await screen.findByTestId("blog-page-category-count");
    expect(categoryCount).toHaveTextContent("2");
  });

  it("renders first page posts limited by pagination constraint", async () => {
    renderPage();

    const posts = await screen.findAllByTestId("post-card");
    expect(posts.length).toBe(6);
  });

  it("filters posts by category correctly", async () => {
    renderPage();

    const filterButton = await screen.findByTestId("blog-page-category-React");
    fireEvent.click(filterButton);

    const posts = await screen.findAllByTestId("post-card");
    expect(posts.length).toBe(4);
  });

  it("resets to page 1 when category changes", async () => {
    renderPage();

    const nextButton = await screen.findByTestId("blog-page-pagination-next");
    fireEvent.click(nextButton);

    const filterButton = screen.getByTestId("blog-page-category-Node");
    fireEvent.click(filterButton);

    const posts = screen.getAllByTestId("post-card");
    expect(posts.length).toBe(4);
  });

  it("opens search modal click loop layer", async () => {
    renderPage();

    const searchButton = await screen.findByTestId("blog-page-search-button");
    fireEvent.click(searchButton);

    expect(screen.getByTestId("search-modal")).toBeInTheDocument();
  });

  it("shows pagination controls when total counts overflow items threshold", async () => {
    renderPage();

    expect(await screen.findByTestId("blog-page-pagination")).toBeInTheDocument();
    expect(screen.getByTestId("blog-page-pagination-next")).toBeInTheDocument();
  });

  it("navigates to next page correctly and resets frame array", async () => {
    renderPage();

    const initialPosts = (await screen.findAllByTestId("post-card")).map(
      (p) => p.textContent
    );

    const nextButton = screen.getByTestId("blog-page-pagination-next");
    fireEvent.click(nextButton);

    const updatedPosts = screen.getAllByTestId("post-card").map(
      (p) => p.textContent
    );

    expect(initialPosts).not.toEqual(updatedPosts);
    expect(updatedPosts.length).toBe(2);
  });

  it("shows empty state UI safely if payload is dry", async () => {
    postApi.getPosts.mockResolvedValueOnce({ data: { posts: [] } });
    renderPage();

    expect(await screen.findByTestId("blog-page-no-articles")).toBeInTheDocument();
    expect(screen.getByTestId("blog-page-no-articles-text")).toHaveTextContent(
      "No posts found in this category."
    );
  });
});