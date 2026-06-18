import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import TableOfContents from "../../components/TableOfContents";

describe("TableOfContents Component", () => {
  const mockContent = `
# Introduction

Some content here.

## Getting Started

More content.

### Installation

Installation guide.

## Testing

Testing section.
`;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders component correctly", () => {
    render(<TableOfContents content={mockContent} />);

    expect(
      screen.getByTestId("table-of-contents")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("table-of-contents-toggle")
    ).toBeInTheDocument();
  });

  it("renders title correctly", () => {
    render(<TableOfContents content={mockContent} />);

    expect(
      screen.getByTestId("table-of-contents-title")
    ).toHaveTextContent("Table of Contents");
  });

  it("is closed initially", () => {
  render(<TableOfContents content={mockContent} />);

  const content =
    screen.getByTestId("table-of-contents-content").parentElement;

  expect(content).toHaveClass("max-h-0");
  expect(content).toHaveClass("opacity-0");
});

  it("opens table of contents when toggle button is clicked", () => {
    render(<TableOfContents content={mockContent} />);

    const toggleBtn = screen.getByTestId(
      "table-of-contents-toggle"
    );

    fireEvent.click(toggleBtn);

    expect(
      screen.getByTestId("table-of-contents-content")
    ).toBeVisible();
  });

  it("renders all markdown headings", () => {
    render(<TableOfContents content={mockContent} />);

    fireEvent.click(
      screen.getByTestId("table-of-contents-toggle")
    );

    expect(
      screen.getByText("Introduction")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Getting Started")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Installation")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Testing")
    ).toBeInTheDocument();
  });

  it("closes content when toggle button is clicked again", () => {
  render(<TableOfContents content={mockContent} />);

  const toggleBtn = screen.getByTestId(
    "table-of-contents-toggle"
  );

  fireEvent.click(toggleBtn);
  fireEvent.click(toggleBtn);

  const content =
    screen.getByTestId("table-of-contents-content").parentElement;

  expect(content).toHaveClass("max-h-0");
  expect(content).toHaveClass("opacity-0");
});

  it("scrolls to heading when item is clicked", () => {
    const heading = document.createElement("div");
    heading.id = "introduction";

    heading.scrollIntoView = vi.fn();

    document.body.appendChild(heading);

    render(<TableOfContents content={mockContent} />);

    fireEvent.click(
      screen.getByTestId("table-of-contents-toggle")
    );

    fireEvent.click(screen.getByText("Introduction"));

    expect(heading.scrollIntoView).toHaveBeenCalled();

    document.body.removeChild(heading);
  });

  it("renders empty list when no headings exist", () => {
    render(
      <TableOfContents content="This content has no markdown headings." />
    );

    fireEvent.click(
      screen.getByTestId("table-of-contents-toggle")
    );

    expect(
      screen.getByTestId("table-of-contents-list")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("table-of-contents-list").children.length
    ).toBe(0);
  });
});