import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach,afterEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import userEvent from "@testing-library/user-event";
import DetailsPage from "../../pages/DetailsPage";
import * as postApi from "../../api/postApi";

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ user: null }),
}));

vi.mock("../../api/postApi", () => ({
  getPostBySlug: vi.fn(),
  getPosts: vi.fn(),
  viewPost: vi.fn(),
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
  default: ({ children, inline }) => {
    if (inline) {
      return (
        <code data-testid="inline-code">
          {children}
        </code>
      );
    }

    return (
      <pre data-testid="code-block">
        <code>{children}</code>
      </pre>
    );
  },
}));

afterEach(() => {
  vi.restoreAllMocks();
});

const mockPost = {
  _id: "1",
  slug: "react-testing-guide",
  title: "React Testing Guide",
  excerpt: "Learn testing React apps",
  category: "React",
  date: "June 2026",
  readTime: "5 min read",
  author: { name: "Amanuel" },
  coverImage: { url: "/cover.jpg" },
  tags: ["react", "testing"],
  content: `
# Hello World
## Second Heading
This is a paragraph with some \`inline code\`.
Visit [Google](https://google.com).
> This is a blockquote.
| Name | Age |
| ---- | --- |
| John | 20 |
| Jane | 21 |
`,content: `
# Hello World

## Second Heading

This is a paragraph without inline code.

Visit [Google](https://google.com).

\`\`\`js
const test = true;
\`\`\`
`
};

const mockRelatedPosts = {
  data: {
    posts: [
      mockPost,
      {
        _id: "2",
        slug: "node-api-guide",
        title: "Node API Guide",
        excerpt: "Build APIs",
        category: "React",
        date: "June 2026",
        readTime: "6 min read",
        author: { name: "Amanuel" },
        coverImage: { url: "/node-cover.jpg" },
      },
    ],
  },
};

const renderPage = (slug = "react-testing-guide") => {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[`/blogs/${slug}`]}>
        <Routes>
          <Route path="/blogs/:id" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );
};

describe("DetailsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollTo = vi.fn();

    postApi.getPostBySlug.mockResolvedValue({ data: { post: mockPost } });
    postApi.getPosts.mockResolvedValue(mockRelatedPosts);
  });

  it("renders main article structure", async () => {
    renderPage();

    expect(await screen.findByTestId("details-page")).toBeInTheDocument();
    expect(screen.getByTestId("details-page-article")).toBeInTheDocument();
    expect(screen.getByText("React Testing Guide")).toBeInTheDocument();
  });

  it("renders excerpt using getByText", async () => {
    renderPage();
    expect(await screen.findByText(/Learn testing React apps/i)).toBeInTheDocument();
  });

  it("renders author and meta info", async () => {
    renderPage();
    expect(await screen.findByText("Amanuel")).toBeInTheDocument();
    expect(screen.getByText("June 2026")).toBeInTheDocument();
    expect(screen.getByText(/5 min read/i)).toBeInTheDocument();
  });

  it("renders related articles section", async () => {
    renderPage();
    expect(await screen.findByTestId("details-page-related-articles")).toBeInTheDocument();
    expect(screen.getAllByTestId("post-card").length).toBeGreaterThan(0);
  });

  it("renders TOC and toggles reading mode", async () => {
    const user = userEvent.setup();
    renderPage();

    expect(await screen.findByTestId("toc")).toBeInTheDocument();
    await user.click(screen.getByTestId("reading-toggle"));
    expect(screen.queryByTestId("toc")).not.toBeInTheDocument();
  });

  it("handles invalid post id safely", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});

  postApi.getPostBySlug.mockRejectedValueOnce(
    new Error("Not Found")
  );

  renderPage("invalid-slug");

  expect(
    await screen.findByText(/Post not found/i)
  ).toBeInTheDocument();
});

  it("renders interaction components", async () => {
    renderPage();
    expect(await screen.findByTestId("reactions")).toBeInTheDocument();
    expect(screen.getByTestId("comments")).toBeInTheDocument();
    expect(screen.getByTestId("share")).toBeInTheDocument();
  });

  it("renders post tags", async () => {
    renderPage();
    expect(await screen.findByText("#react")).toBeInTheDocument();
    expect(screen.getByText("#testing")).toBeInTheDocument();
  });

  it("renders breadcrumb navigation", async () => {
    renderPage();
    expect(await screen.findByTestId("details-page-breadcrumb")).toHaveTextContent("Home / Blog / React");
  });

  it("renders author profile link", async () => {
    renderPage();
    const authorLink = await screen.findByTestId("details-page-author-link");
    expect(authorLink).toHaveAttribute("href", "/about");
  });

  it("hides toc, share, comments and reactions in reading mode", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(await screen.findByTestId("reading-toggle"));

    expect(screen.queryByTestId("toc")).not.toBeInTheDocument();
    expect(screen.queryByTestId("share")).not.toBeInTheDocument();
    expect(screen.queryByTestId("comments")).not.toBeInTheDocument();
    expect(screen.queryByTestId("reactions")).not.toBeInTheDocument();
  });

  it("changes layout when reading mode is enabled", async () => {
    const user = userEvent.setup();
    renderPage();

    const page = await screen.findByTestId("details-page");
    expect(page).toHaveClass("bg-white");

    await user.click(screen.getByTestId("reading-toggle"));
    expect(page).toHaveClass("bg-stone-50");
  });

  it("renders table of contents by default", async () => {
    renderPage();
    expect(await screen.findByTestId("details-page-toc")).toBeInTheDocument();
  });

  it("renders article share section", async () => {
    renderPage();
    expect(await screen.findByTestId("share")).toBeInTheDocument();
  });

  it("renders reading utilities", async () => {
    renderPage();
    expect(await screen.findByTestId("progress")).toBeInTheDocument();
    expect(screen.getByTestId("scroll")).toBeInTheDocument();
  });

  it("renders cover image", async () => {
    renderPage();
    expect(await screen.findByTestId("details-page-cover-image")).toBeInTheDocument();
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



  it("changes content layout in reading mode", async () => {
    const user = userEvent.setup();
    renderPage();

    const content = await screen.findByTestId("details-page-content");
    expect(content.className).toContain("grid");

    await user.click(screen.getByTestId("reading-toggle"));
    expect(content.className).toContain("max-w-3xl");
  });

  it("changes typography in reading mode", async () => {
    const user = userEvent.setup();
    renderPage();

    const section = await screen.findByTestId("details-page-section");
    expect(section.className).toContain("text-lg");

    await user.click(screen.getByTestId("reading-toggle"));
    expect(section.className).toContain("text-xl");
  });
});