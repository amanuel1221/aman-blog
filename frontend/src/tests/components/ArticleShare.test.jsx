import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ArticleShare from "../../components/ArticleShare";

const mockTitle = "Test Article Title";

describe("ArticleShare Component", () => {
  beforeEach(() => {
    vi.stubGlobal("window", {
      location: {
        href: "https://example.com/article/1",
      },
    });

    vi.stubGlobal("navigator", {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(),
      },
    });
  });

  it("renders share section", () => {
    render(<ArticleShare title={mockTitle} />);

    expect(screen.getByTestId("article-share-section")).toBeInTheDocument();
  });

  it("renders share title", () => {
    render(<ArticleShare title={mockTitle} />);

    expect(screen.getByTestId("article-share-title")).toHaveTextContent(
      "Share this article"
    );
  });

  it("renders social share buttons", () => {
    render(<ArticleShare title={mockTitle} />);

    expect(screen.getByTestId("share-linkedin")).toBeInTheDocument();
    expect(screen.getByTestId("share-twitter")).toBeInTheDocument();
    expect(screen.getByTestId("copy-link")).toBeInTheDocument();
  });

  it("copies link when copy button is clicked", async () => {
    render(<ArticleShare title={mockTitle} />);

    const button = screen.getByTestId("copy-link");

    fireEvent.click(button);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "https://example.com/article/1"
    );
  });

  it("shows copied state after clicking copy button", async () => {
    render(<ArticleShare title={mockTitle} />);

    const button = screen.getByTestId("copy-link");

    fireEvent.click(button);

    expect(await screen.findByText("Link copied")).toBeInTheDocument();
  });

  it("renders linkedin share link with correct href", () => {
    render(<ArticleShare title={mockTitle} />);

    const linkedin = screen.getByTestId("share-linkedin");

    expect(linkedin).toHaveAttribute(
      "href",
      expect.stringContaining("linkedin.com")
    );
  });

  it("renders twitter share link with correct href", () => {
    render(<ArticleShare title={mockTitle} />);

    const twitter = screen.getByTestId("share-twitter");

    expect(twitter).toHaveAttribute(
      "href",
      expect.stringContaining("twitter.com")
    );

    expect(twitter.getAttribute("href")).toContain(
      encodeURIComponent(mockTitle)
    );
  });
  
});