import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import SearchModal from "../../components/SearchModal";
import * as postApi from "../../api/postApi";

vi.mock("../../api/postApi", () => ({
  getPosts: vi.fn(),
}));

vi.mock("./categoryFilter", () => ({
  default: ({ selectedCategory, onCategoryChange, categories }) => (
    <select
      data-testid="category-filter"
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
    >
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  ),
}));

const mockPostsData = [
  {
    _id: "1",
    slug: "react-testing-guide",
    title: "React Testing Guide",
    excerpt: "Learn testing React apps",
    category: "React",
    date: "June 2026",
    readTime: "5 min read",
    author: { name: "Amanuel" },
    coverImage: "/cover.jpg",
  },
  {
    _id: "2",
    slug: "node-api-guide",
    title: "Node API Guide",
    excerpt: "Build APIs",
    category: "Node",
    date: "June 2026",
    readTime: "6 min read",
    author: { name: "Amanuel" },
    coverImage: "/node.jpg",
  },
];

const renderModal = (open = true, onClose = vi.fn()) => {
  return render(
    <MemoryRouter>
      <SearchModal open={open} onClose={onClose} />
    </MemoryRouter>
  );
};

describe("SearchModal Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    postApi.getPosts.mockResolvedValue({
      data: { posts: mockPostsData },
    });
  });

  it("does not render when open is false", () => {
    renderModal(false);
    expect(screen.queryByTestId("search-modal")).not.toBeInTheDocument();
  });

  it("renders modal when open is true", async () => {
    renderModal(true);

    expect(screen.getByTestId("search-modal")).toBeInTheDocument();
    expect(screen.getByTestId("search-modal-content")).toBeInTheDocument();
    expect(screen.getByTestId("search-modal-title")).toHaveTextContent("Search Articles");

    await waitFor(() => expect(postApi.getPosts).toHaveBeenCalled());
  });

  it("renders all posts initially", async () => {
    renderModal(true);

    const titleElement = await screen.findByText("React Testing Guide");
    expect(titleElement).toBeInTheDocument();
    expect(screen.getByText("Node API Guide")).toBeInTheDocument();
  });

  it("filters posts by search input", async () => {
    const user = userEvent.setup();
    renderModal(true);

    await screen.findByText("React Testing Guide");

    postApi.getPosts.mockResolvedValueOnce({
      data: { posts: [mockPostsData[0]] },
    });

    const input = screen.getByTestId("search-modal-input");
    await user.type(input, "React");

    await waitFor(() => {
      expect(screen.getByText("React Testing Guide")).toBeInTheDocument();
      expect(screen.queryByText("Node API Guide")).not.toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it("shows no results message when search fails", async () => {
    const user = userEvent.setup();
    renderModal(true);

    await screen.findByText("React Testing Guide");

    postApi.getPosts.mockResolvedValueOnce({
      data: { posts: [] },
    });

    const input = screen.getByTestId("search-modal-input");
    await user.type(input, "xyz-unmatched-term");

    await waitFor(() => {
      expect(screen.getByTestId("search-modal-no-results")).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it("calls onClose when clicking backdrop", async () => {
    const onClose = vi.fn();
    renderModal(true, onClose);

    const backdrop = screen.getByTestId("search-modal");
    await userEvent.click(backdrop);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when close button is clicked", async () => {
    const onClose = vi.fn();
    renderModal(true, onClose);

    const closeBtn = screen.getByTestId("search-modal-close-button");
    await userEvent.click(closeBtn);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes modal when ESC key is pressed", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderModal(true, onClose);

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});