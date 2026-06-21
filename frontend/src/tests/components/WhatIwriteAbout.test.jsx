import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import WhatIWriteAbout from "../../components/WhatAbout";

describe("WhatIWriteAbout Component", () => {
  const renderComponent = () => {
    render(<WhatIWriteAbout />);
  };

  it("renders component correctly", () => {
    renderComponent();

    expect(
      screen.getByTestId("what-about-section")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("what-about-topics")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("what-about-content")
    ).toBeInTheDocument();
  });

  it("renders title correctly", () => {
    renderComponent();

    expect(
      screen.getByTestId("what-about-title")
    ).toBeInTheDocument();

    expect(
      screen.getByText("What do I write about?")
    ).toBeInTheDocument();
  });

  it("renders description correctly", () => {
    renderComponent();

    expect(
      screen.getByTestId("what-about-description")
    ).toBeInTheDocument();

    expect(
      screen.getByText(/modern frontend engineering/i)
    ).toBeInTheDocument();
  });

  it("renders all topic cards", () => {
    renderComponent();

    expect(
      screen.getByTestId("what-about-topic-0")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("what-about-topic-1")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("what-about-topic-2")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("what-about-topic-3")
    ).toBeInTheDocument();
  });

  it("renders all topic images with correct alt text", () => {
    renderComponent();

    expect(
      screen.getByAltText("Backend")
    ).toBeInTheDocument();

    expect(
      screen.getByAltText("Performance")
    ).toBeInTheDocument();

    expect(
      screen.getByAltText("Vitest")
    ).toBeInTheDocument();

    expect(
      screen.getByAltText("Agile Development")
    ).toBeInTheDocument();
  });

  it("renders correct number of topic images", () => {
    renderComponent();

    const images = screen.getAllByRole("img");

    expect(images).toHaveLength(4);
  });

  it("renders checklist container", () => {
    renderComponent();

    expect(
      screen.getByTestId("what-about-checklist")
    ).toBeInTheDocument();
  });

  it("renders all checklist items", () => {
    renderComponent();

    const checklistItems = [
      "React & Component Architecture",
      "Performance Optimization (Lighthouse 78 → 99)",
      "Vitest & Testing Strategies",
      "Node.js & Fullstack APIs",
      "Scalable Web Application Design",
      "Real-world project development",
    ];

    checklistItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("renders correct number of checklist items", () => {
    renderComponent();

    const checklistItems = [
      screen.getByTestId("what-about-checklist-item-0"),
      screen.getByTestId("what-about-checklist-item-1"),
      screen.getByTestId("what-about-checklist-item-2"),
      screen.getByTestId("what-about-checklist-item-3"),
      screen.getByTestId("what-about-checklist-item-4"),
      screen.getByTestId("what-about-checklist-item-5"),
    ];

    expect(checklistItems).toHaveLength(6);
  });

  it("renders divider element", () => {
    renderComponent();

    expect(
      screen.getByTestId("what-about-divider")
    ).toBeInTheDocument();
  });
});