import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CategoryFilter from "../../components/categoryFilter";

describe("CategoryFilter Component", () => {
  const mockCategories = [
    "React",
    "Node.js",
    "Testing",
    "Performance",
  ];

  const mockOnCategoryChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (
    selectedCategory = "All"
  ) => {
    return render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={mockOnCategoryChange}
      />
    );
  };

  it("renders component correctly", () => {
    renderComponent();

    expect(
      screen.getByTestId("category-filter")
    ).toBeInTheDocument();
  });

  it("renders All Categories option", () => {
    renderComponent();

    expect(
      screen.getByTestId("category-all")
    ).toBeInTheDocument();

    expect(
      screen.getByText("All Categories")
    ).toBeInTheDocument();
  });

  it("renders all category options", () => {
    renderComponent();

    mockCategories.forEach((category) => {
      expect(
        screen.getByText(category)
      ).toBeInTheDocument();
    });
  });

  it("displays selected category", () => {
    renderComponent("React");

    const select =
      screen.getByTestId("category-filter");

    expect(select.value).toBe("React");
  });

  it("calls onCategoryChange when selection changes", () => {
    renderComponent();

    const select =
      screen.getByTestId("category-filter");

    fireEvent.change(select, {
      target: { value: "Testing" },
    });

    expect(mockOnCategoryChange).toHaveBeenCalledTimes(1);

    expect(mockOnCategoryChange).toHaveBeenCalledWith(
      "Testing"
    );
  });

  it("allows selecting different categories", () => {
    renderComponent();

    const select =
      screen.getByTestId("category-filter");

    fireEvent.change(select, {
      target: { value: "Node.js" },
    });

    expect(mockOnCategoryChange).toHaveBeenCalledWith(
      "Node.js"
    );
  });

  it("renders correct number of options", () => {
    renderComponent();

    const options =
      screen.getAllByRole("option");

    expect(options.length).toBe(
      mockCategories.length + 1
    );
  });
});