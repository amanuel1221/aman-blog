import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ScrollToTopButton from "../../components/ScrollToTopButton";

describe("ScrollToTopButton Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    window.scrollTo = vi.fn();
  });

  it("does not render initially", () => {
    render(<ScrollToTopButton />);

    expect(
      screen.queryByTestId("scroll-to-top-button")
    ).not.toBeInTheDocument();
  });

  it("shows button when scrollY exceeds 600", () => {
    Object.defineProperty(window, "scrollY", {
      writable: true,
      value: 700,
    });

    render(<ScrollToTopButton />);

    fireEvent.scroll(window);

    expect(
      screen.getByTestId("scroll-to-top-button")
    ).toBeInTheDocument();
  });

  it("calls window.scrollTo when clicked", () => {
    Object.defineProperty(window, "scrollY", {
      writable: true,
      value: 700,
    });

    render(<ScrollToTopButton />);

    fireEvent.scroll(window);

    const button = screen.getByTestId(
      "scroll-to-top-button"
    );

    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("hides button when scrollY is less than 600", () => {
    Object.defineProperty(window, "scrollY", {
      writable: true,
      value: 500,
    });

    render(<ScrollToTopButton />);

    fireEvent.scroll(window);

    expect(
      screen.queryByTestId("scroll-to-top-button")
    ).not.toBeInTheDocument();
  });
});