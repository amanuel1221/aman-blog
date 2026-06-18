import React from "react";
import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import AnimatedNumber from "../../components/AnimatedNumber";

describe("AnimatedNumber Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("renders with initial count of 0", () => {
    render(<AnimatedNumber value={15} />);

    expect(screen.getByText("0+")).toBeInTheDocument();
  });

  it("animates until reaching the target value", () => {
    render(<AnimatedNumber value={15} />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText("15+")).toBeInTheDocument();
  });

  it("renders correct final value for large numbers", () => {
    render(<AnimatedNumber value={500} />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText("500+")).toBeInTheDocument();
  });

  it("uses custom duration correctly", () => {
    render(<AnimatedNumber value={10} duration={1000} />);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText("10+")).toBeInTheDocument();
  });

  it("updates when value prop changes", () => {
    const { rerender } = render(<AnimatedNumber value={5} />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText("5+")).toBeInTheDocument();

    rerender(<AnimatedNumber value={8} />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText("8+")).toBeInTheDocument();
  });

  it("handles value of 0", () => {
    render(<AnimatedNumber value={0} />);

    expect(screen.getByText("0+")).toBeInTheDocument();
  });

  it("renders plus sign after the number", () => {
    render(<AnimatedNumber value={25} />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText("25+")).toBeInTheDocument();
  });
});