import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ReadingProgressBar from "../../components/ReadingProgressBar";

describe("ReadingProgressBar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders progress bar", () => {
    render(<ReadingProgressBar />);

    expect(
      screen.getByTestId("reading-progress-bar")
    ).toBeInTheDocument();
  });

  it("updates progress width on scroll", () => {
    Object.defineProperty(window, "scrollY", {
      writable: true,
      value: 500,
    });

    Object.defineProperty(
      document.documentElement,
      "scrollHeight",
      {
        writable: true,
        value: 2000,
      }
    );

    Object.defineProperty(window, "innerHeight", {
      writable: true,
      value: 1000,
    });

    render(<ReadingProgressBar />);

    fireEvent.scroll(window);

    const progressBar = screen.getByTestId(
      "reading-progress-bar"
    );

    expect(progressBar.style.width).toBe("50%");
  });

  it("starts with 0% width", () => {
    render(<ReadingProgressBar />);

    const progressBar = screen.getByTestId(
      "reading-progress-bar"
    );

    expect(progressBar.style.width).toBe("0%");
  });
});