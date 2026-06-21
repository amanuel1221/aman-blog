import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import PostCard from "../../components/PostCard";
const mockPost = {
  id: "1",
  title: "Test Blog Post",
  excerpt: "This is a test excerpt for the blog post.",
  coverImage: "https://example.com/image.jpg",
  category: "Tech",
  author: {
    name: "Amanuel Amare",
  },
  date: "June 17, 2026",
  readTime: "5 min read",
};

const renderComponent = () => {
     return render(
    <MemoryRouter>
      <PostCard post={mockPost} />
    </MemoryRouter>
  );
 
};

describe("PostCard Component", () => {
  it("renders post card container", () => {
    renderComponent();

    expect(screen.getByTestId("post-card")).toBeInTheDocument();
  });

  it("renders post image correctly", () => {
     render(
    <MemoryRouter>
      <PostCard post={mockPost} />
    </MemoryRouter>
  );

    const image = screen.getByTestId("post-card-image");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockPost.coverImage);
    expect(image).toHaveAttribute("alt", mockPost.title);
  });

  it("renders category when available", () => {
    renderComponent();

    expect(screen.getByTestId("post-card-category")).toBeInTheDocument();
    expect(screen.getByText(mockPost.category)).toBeInTheDocument();
  });

  it("renders author name correctly", () => {
    renderComponent();

    expect(screen.getByTestId("post-card-author")).toHaveTextContent(
      mockPost.author.name
    );
  });

  it("renders post metadata (date and read time)", () => {
    renderComponent();

    const meta = screen.getByTestId("post-card-meta");

    expect(meta).toHaveTextContent(mockPost.date);
    expect(meta).toHaveTextContent(mockPost.readTime);
  });

  it("renders post title correctly", () => {
    renderComponent();

    const title = screen.getByTestId("post-card-title");

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(mockPost.title);
  });

  it("renders post excerpt correctly", () => {
    renderComponent();

    expect(screen.getByTestId("post-card-excerpt")).toHaveTextContent(
      mockPost.excerpt
    );
  });

  it("renders read article link with correct route", () => {
    renderComponent();

    const link = screen.getByTestId("post-card-read-more");

    expect(link).toBeInTheDocument();
    expect(link.getAttribute("href")).toBe(`/blogs/${mockPost.id}`);
  });

  it("renders author link to about page", () => {
    renderComponent();

    const authorLink = screen.getByRole("link", { name: /Amanuel Amare/i });

    expect(authorLink).toHaveAttribute("href", "/about");
  });
});