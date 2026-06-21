import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import WhyReadMyBlog from "../../components/WhyReadMyBlog";

describe("WhyReadMyBlog Component", () => {
  const renderComponent = () => {
    render(<WhyReadMyBlog />);
  };

  it("renders component correctly", () => {
    renderComponent();

    expect(
      screen.getByTestId("why-read-my-blog-section")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("why-read-my-blog-features")
    ).toBeInTheDocument();
  });

  it("renders title correctly", () => {
    renderComponent();

    expect(
      screen.getByTestId("why-read-my-blog-title")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Why Read My Blog")
    ).toBeInTheDocument();
  });

  it("renders description correctly", () => {
    renderComponent();

    expect(
      screen.getByTestId("why-read-my-blog-description")
    ).toBeInTheDocument();

    expect(
      screen.getByText(/real engineering experience/i)
    ).toBeInTheDocument();
  });

  it("renders all feature cards", () => {
    renderComponent();

    expect(
      screen.getByTestId("why-read-my-blog-feature-0")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("why-read-my-blog-feature-1")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("why-read-my-blog-feature-2")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("why-read-my-blog-feature-3")
    ).toBeInTheDocument();
  });

  it("renders correct number of feature cards", () => {
    renderComponent();

    const featureCards = [
      screen.getByTestId("why-read-my-blog-feature-0"),
      screen.getByTestId("why-read-my-blog-feature-1"),
      screen.getByTestId("why-read-my-blog-feature-2"),
      screen.getByTestId("why-read-my-blog-feature-3"),
    ];

    expect(featureCards).toHaveLength(4);
  });

  it("renders all feature titles", () => {
    renderComponent();

    expect(
      screen.getByTestId("why-read-my-blog-feature-title-0")
    ).toHaveTextContent("Real Engineering Work");

    expect(
      screen.getByTestId("why-read-my-blog-feature-title-1")
    ).toHaveTextContent("Performance Focus");

    expect(
      screen.getByTestId("why-read-my-blog-feature-title-2")
    ).toHaveTextContent("Testing Mindset");

    expect(
      screen.getByTestId("why-read-my-blog-feature-title-3")
    ).toHaveTextContent("Fullstack Thinking");
  });

  it("renders all feature descriptions", () => {
    renderComponent();

    expect(
      screen.getByTestId("why-read-my-blog-feature-description-0")
    ).toHaveTextContent(
      "Learn from real projects, not tutorials."
    );

    expect(
      screen.getByTestId("why-read-my-blog-feature-description-1")
    ).toHaveTextContent(
      "How I optimize applications from 78 → 99 Lighthouse score."
    );

    expect(
      screen.getByTestId("why-read-my-blog-feature-description-2")
    ).toHaveTextContent(
      "Practical Vitest strategies used in real applications."
    );

    expect(
      screen.getByTestId("why-read-my-blog-feature-description-3")
    ).toHaveTextContent(
      "Building complete systems using frontend + backend."
    );
  });

  it("renders all feature titles in the document", () => {
    renderComponent();

    expect(
      screen.getByText("Real Engineering Work")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Performance Focus")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Testing Mindset")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Fullstack Thinking")
    ).toBeInTheDocument();
  });
});