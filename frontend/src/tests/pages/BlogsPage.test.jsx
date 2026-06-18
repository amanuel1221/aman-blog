import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";


const mockPosts = vi.hoisted(() =>
  Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `Post ${i + 1}`,
    category: i % 2 === 0 ? "React" : "Node",
    date: `2025-01-${String(i + 1).padStart(2, "0")}`,
  }))
);


vi.mock("../../store/mockPosts", () => ({
  default: mockPosts,
}));

vi.mock("../../components/PostCard", () => ({
  default: ({ post }) => <div data-testid="post-card">{post.title}</div>,
}));

vi.mock("../../components/SearchModal", () => ({
  default: ({ open }) =>
    open ? <div data-testid="search-modal">Search Open</div> : null,
}));

import BlogsPage from "../../pages/BlogPage";

describe("BlogsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders header text correctly", () => {
    render(<BlogsPage />);

    expect(screen.getByTestId("blog-page-header")).toBeInTheDocument();
    expect(screen.getByTestId("blog-page-title")).toBeInTheDocument();
    expect(screen.getByTestId("blog-page-description")).toBeInTheDocument();
  });

  it("shows correct article count", () => {
    render(<BlogsPage />);

    expect(screen.getByTestId("blog-page-article-count")).toHaveTextContent(
      "8"
    );
  });

  it("renders categories correctly", () => {
    render(<BlogsPage />);

    // All + React + Node = 3
    expect(screen.getByTestId("blog-page-category-count")).toHaveTextContent(
      "2"
    );
  });

  it("renders first page posts (pagination logic)", () => {
    render(<BlogsPage />);

    const posts = screen.getAllByTestId("post-card");

    expect(posts.length).toBe(6);
  });

  it("filters posts by category", () => {
    render(<BlogsPage />);

    fireEvent.click(screen.getByTestId("blog-page-category-React"));

    const posts = screen.getAllByTestId("post-card");

    expect(posts.length).toBe(4); 
  });

  it("resets to page 1 when category changes", () => {
    render(<BlogsPage />);

    fireEvent.click(screen.getByTestId("blog-page-category-Node"));

    expect(screen.getAllByTestId("post-card").length).toBe(4);
  });

  it("opens search modal", () => {
    render(<BlogsPage />);

    fireEvent.click(screen.getByTestId("blog-page-search-button"));

    expect(screen.getByTestId("search-modal")).toBeInTheDocument();
  });

  it("shows pagination controls", () => {
    render(<BlogsPage />);

    expect(screen.getByTestId("blog-page-pagination")).toBeInTheDocument();
    expect(
      screen.getByTestId("blog-page-pagination-next")
    ).toBeInTheDocument();
  });

  it("navigates to next page correctly", () => {
    render(<BlogsPage />);

    const firstPagePosts = screen.getAllByTestId("post-card").map(
      (p) => p.textContent
    );

    fireEvent.click(screen.getByTestId("blog-page-pagination-next"));

    const secondPagePosts = screen.getAllByTestId("post-card").map(
      (p) => p.textContent
    );

    expect(firstPagePosts).not.toEqual(secondPagePosts);
  });

  it("shows empty state UI safely", () => {
    render(<BlogsPage />);

    fireEvent.click(screen.getByTestId("blog-page-category-React"));

    expect(
      screen.getByTestId("blog-page-featured-articles")
    ).toBeInTheDocument();
  });
});