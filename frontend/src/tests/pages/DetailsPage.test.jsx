import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import DetailsPage from "../../pages/DetailsPage";

vi.mock("../../store/mockPosts", () => ({
  default: [
    {
      id: 1,
      _id: "1",
      title: "React Testing Guide",
      excerpt: "Learn testing React apps",
      category: "React",
      date: "June 2026",
      readTime: "5 min read",
      author: { name: "Amanuel" },
      coverImage: "/cover.jpg",
      tags: ["react", "testing"],
      comments: [],
      likes: [],
      dislikes: [],
      content: `
# Hello World

## Second Heading

### Third Heading

This is a paragraph with some \`inline code\`.

Visit [Google](https://google.com).

> This is a blockquote.

---

### Unordered List

- React
- Vitest
- RTL

### Ordered List

1. Install
2. Test
3. Deploy

### Table

| Name | Age |
| ---- | --- |
| John | 20 |
| Jane | 21 |

\`\`\`js
const x = 1;
console.log(x);
\`\`\`
`,
    },
    {
      id: 2,
      _id: "2",
      title: "Node API Guide",
      excerpt: "Build APIs",
      category: "Node",
      date: "June 2026",
      readTime: "6 min read",
      author: { name: "Amanuel" },
      content: "# Node Guide",
      tags: ["node"],
      comments: [],
      likes: [],
      dislikes: [],
    },
  ],
}));

vi.mock("../../store/mockComments", () => ({
  default: [],
}));

vi.mock("../../components/PostCard", () => ({
  default: ({ post }) => <div data-testid="post-card">{post.title}</div>,
}));

vi.mock("../../components/PostReactions", () => ({
  default: () => <div data-testid="reactions" />,
}));

vi.mock("../../components/PostComments", () => ({
  default: () => <div data-testid="comments" />,
}));

vi.mock("../../components/TableOfContents", () => ({
  default: () => <div data-testid="toc" />,
}));

vi.mock("../../components/ReadingProgressBar", () => ({
  default: () => <div data-testid="progress" />,
}));

vi.mock("../../components/ScrollToTopButton", () => ({
  default: () => <div data-testid="scroll" />,
}));

vi.mock("../../components/ArticleShare", () => ({
  default: () => <div data-testid="share" />,
}));

vi.mock("../../components/ReadingMode", () => ({
  default: ({ onToggle }) => (
    <button data-testid="reading-toggle" onClick={() => onToggle((p) => !p)}>
      Toggle
    </button>
  ),
}));

vi.mock("../../components/CodeBlock", () => ({
  default: ({ children }) => (
    <div data-testid="code-block">
      {children}
    </div>
  ),
}));

const renderPage = (id = "1") => {
  return render(
    <MemoryRouter initialEntries={[`/blog/${id}`]}>
      <Routes>
        <Route path="/blog/:id" element={<DetailsPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("DetailsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollTo = vi.fn();
  });

  it("renders main article structure", () => {
    renderPage();

    expect(screen.getByTestId("details-page")).toBeInTheDocument();
    expect(screen.getByTestId("details-page-article")).toBeInTheDocument();
    expect(screen.getByText("React Testing Guide")).toBeInTheDocument();
  });

  it("renders excerpt using getByText", () => {
    renderPage();
    expect(screen.getByText(/Learn testing React apps/i)).toBeInTheDocument();
  });

  it("renders author and meta info", () => {
    renderPage();
    expect(screen.getByText("Amanuel")).toBeInTheDocument();
    expect(screen.getByText("June 2026")).toBeInTheDocument();
    expect(screen.getByText(/5 min read/i)).toBeInTheDocument();
  });

  it("renders markdown content", async () => {
    renderPage();
    expect(await screen.findByText(/Hello World/i)).toBeInTheDocument();
  });

  it("renders related articles section", () => {
    renderPage();
    expect(screen.getByTestId("details-page-related-articles")).toBeInTheDocument();
    expect(screen.getAllByTestId("post-card").length).toBeGreaterThan(0);
  });

  it("renders TOC and toggles reading mode", async () => {
    const user = userEvent.setup();
    renderPage();

    expect(screen.getByTestId("toc")).toBeInTheDocument();
    await user.click(screen.getByTestId("reading-toggle"));
    expect(screen.queryByTestId("toc")).not.toBeInTheDocument();
  });

  it("handles invalid post id", () => {
    renderPage("999");
    expect(screen.getByText(/Resource target not found/i)).toBeInTheDocument();
  });

  it("renders interaction components", () => {
    renderPage();
    expect(screen.getByTestId("reactions")).toBeInTheDocument();
    expect(screen.getByTestId("comments")).toBeInTheDocument();
    expect(screen.getByTestId("share")).toBeInTheDocument();
  });

  it("renders post tags", () => {
    renderPage();
    expect(screen.getByText("#react")).toBeInTheDocument();
    expect(screen.getByText("#testing")).toBeInTheDocument();
  });

  it("renders breadcrumb navigation", () => {
    renderPage();
    expect(screen.getByTestId("details-page-breadcrumb")).toHaveTextContent("Home / Blog / React");
  });

  it("renders author profile link", () => {
    renderPage();
    const authorLink = screen.getByTestId("details-page-author-link");
    expect(authorLink).toHaveAttribute("href", "/about");
  });

  it("renders fallback related articles", () => {
    renderPage();
    expect(screen.getByText("Node API Guide")).toBeInTheDocument();
  });

  it("hides toc, share, comments and reactions in reading mode", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByTestId("reading-toggle"));

    expect(screen.queryByTestId("toc")).not.toBeInTheDocument();
    expect(screen.queryByTestId("share")).not.toBeInTheDocument();
    expect(screen.queryByTestId("comments")).not.toBeInTheDocument();
    expect(screen.queryByTestId("reactions")).not.toBeInTheDocument();
  });

  it("changes layout when reading mode is enabled", async () => {
    const user = userEvent.setup();
    renderPage();

    const page = screen.getByTestId("details-page");
    expect(page).toHaveClass("bg-white");

    await user.click(screen.getByTestId("reading-toggle"));
    expect(page).toHaveClass("bg-stone-50");
  });

  it("renders table of contents by default", () => {
    renderPage();
    expect(screen.getByTestId("details-page-toc")).toBeInTheDocument();
  });

  it("renders article share section", () => {
    renderPage();
    expect(screen.getByTestId("share")).toBeInTheDocument();
  });

  it("renders related article grid", () => {
    renderPage();
    expect(screen.getByTestId("details-page-related-articles-grid")).toBeInTheDocument();
  });

  it("renders reading utilities", () => {
    renderPage();
    expect(screen.getByTestId("progress")).toBeInTheDocument();
    expect(screen.getByTestId("scroll")).toBeInTheDocument();
  });

  it("scrolls to top when a related article is clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    const article = screen.getByTestId("details-page-related-article");
    await user.click(article);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0
    });
  });

  it("renders cover image", () => {
    renderPage();
    expect(screen.getByTestId("details-page-cover-image")).toBeInTheDocument();
  });

  it("renders markdown h2", async () => {
    renderPage();
    expect(await screen.findByText("Second Heading")).toBeInTheDocument();
  });

 

  it("renders markdown links", async () => {
    renderPage();
    const link = await screen.findByRole("link", { name: "Google" });

    expect(link).toHaveAttribute("href", "https://google.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders blockquote", async () => {
    renderPage();
    expect(await screen.findByText("This is a blockquote.")).toBeInTheDocument();
  });

  it("renders markdown table", async () => {
    renderPage();
    expect(await screen.findByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
  });

  it("scrolls to top when clicking related article", async () => {
    const user = userEvent.setup();
    renderPage();

    const article = screen.getByTestId("details-page-related-article");
    await user.click(article);

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0 });
  });

  it("changes content layout in reading mode", async () => {
    const user = userEvent.setup();
    renderPage();

    const content = screen.getByTestId("details-page-content");
    expect(content.className).toContain("grid");

    await user.click(screen.getByTestId("reading-toggle"));
    expect(content.className).toContain("max-w-3xl");
  });

  it("changes typography in reading mode", async () => {
    const user = userEvent.setup();
    renderPage();

    const section = screen.getByTestId("details-page-section");
    expect(section.className).toContain("text-lg");

    await user.click(screen.getByTestId("reading-toggle"));
    expect(section.className).toContain("text-xl");
  });
});