import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ReadingMode from "../../components/ReadingMode";

describe("ReadingMode Component", () => {
  const mockOnToggle = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <ReadingMode onToggle={mockOnToggle} />
    );
  };

  it("renders component correctly", () => {
    renderComponent();

    expect(
      screen.getByTestId("reading-mode-toggle")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("reading-mode-toggle-text")
    ).toBeInTheDocument();
  });

  it("shows Reading Mode text initially", () => {
    renderComponent();

    expect(
      screen.getByText("Reading Mode")
    ).toBeInTheDocument();
  });

  it("toggles to Exit Reading when clicked", () => {
    renderComponent();

    const button = screen.getByTestId(
      "reading-mode-toggle"
    );

    fireEvent.click(button);

    expect(
      screen.getByText("Exit Reading")
    ).toBeInTheDocument();
  });

  it("calls onToggle with true when enabled", () => {
    renderComponent();

    const button = screen.getByTestId(
      "reading-mode-toggle"
    );

    fireEvent.click(button);

    expect(mockOnToggle).toHaveBeenCalledWith(
      true
    );
  });

  it("calls onToggle with false when disabled", () => {
    renderComponent();

    const button = screen.getByTestId(
      "reading-mode-toggle"
    );

    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockOnToggle).toHaveBeenLastCalledWith(
      false
    );
  });

  it("toggles text back to Reading Mode after second click", () => {
    renderComponent();

    const button = screen.getByTestId(
      "reading-mode-toggle"
    );

    fireEvent.click(button);
    fireEvent.click(button);

    expect(
      screen.getByText("Reading Mode")
    ).toBeInTheDocument();
  });

  it("calls onToggle correct number of times", () => {
    renderComponent();

    const button = screen.getByTestId(
      "reading-mode-toggle"
    );

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockOnToggle).toHaveBeenCalledTimes(
      3
    );
  });
});