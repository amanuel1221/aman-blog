import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import SearchModal from "../../components/SearchModal";
import mockPosts from "../../store/mockPosts";

const renderModal = (open = true, onClose = vi.fn()) => {
  return render(
    <MemoryRouter>
      <SearchModal open={open} onClose={onClose} />
    </MemoryRouter>
  );
};

describe("SearchModal Component", () => {
  it("does not render when open is false", () => {
    renderModal(false);

    expect(screen.queryByTestId("search-modal")).not.toBeInTheDocument();
  });

  it("renders modal when open is true", () => {
    renderModal(true);

    expect(screen.getByTestId("search-modal")).toBeInTheDocument();
    expect(screen.getByTestId("search-modal-content")).toBeInTheDocument();
    expect(screen.getByTestId("search-modal-title")).toHaveTextContent(
      "Search Articles"
    );
  });

  it("renders all posts initially", () => {
    renderModal(true);

    const results = screen.getByTestId("search-modal-results");

    expect(results).toBeInTheDocument();
    expect(results.textContent).toContain(mockPosts[0].title);
  });

  it("filters posts by search input", () => {
    renderModal(true);

    const input = screen.getByTestId("search-modal-input");

    fireEvent.change(input, {
      target: { value: mockPosts[0].title },
    });

    expect(screen.getByText(mockPosts[0].title)).toBeInTheDocument();
  });

  it("shows no results message when search fails", () => {
    renderModal(true);

    const input = screen.getByTestId("search-modal-input");

    fireEvent.change(input, {
      target: { value: "random-non-existing-text-xyz" },
    });

    expect(screen.getByTestId("search-modal-no-results")).toBeInTheDocument();
    expect(
      screen.getByTestId("search-modal-no-results-description")
    ).toBeInTheDocument();
  });

  it("calls onClose when clicking backdrop", () => {
    const onClose = vi.fn();

    renderModal(true, onClose);

    fireEvent.click(screen.getByTestId("search-modal"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();

    renderModal(true, onClose);

    fireEvent.click(screen.getByTestId("search-modal-close-button"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes modal when ESC key is pressed", () => {
    const onClose = vi.fn();

    renderModal(true, onClose);

    fireEvent.keyDown(window, { key: "Escape" });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});