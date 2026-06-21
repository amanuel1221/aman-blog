import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DevelopmentJourney from "../../components/DevelopmentJourney";

describe("DevelopmentJourney Component", () => {
  it("renders development journey section", () => {
    render(<DevelopmentJourney />);

    expect(screen.getByTestId("development-journey")).toBeInTheDocument();
  });

  it("renders title correctly", () => {
    render(<DevelopmentJourney />);

    expect(screen.getByTestId("development-journey-title")).toHaveTextContent(
      "My Development Journey"
    );
  });

  it("renders description correctly", () => {
    render(<DevelopmentJourney />);

    expect(
      screen.getByTestId("development-journey-description")
    ).toHaveTextContent(
      "Building projects, writing code, and continuously learning modern web technologies."
    );
  });

  it("renders stats container", () => {
    render(<DevelopmentJourney />);

    expect(
      screen.getByTestId("development-journey-stats")
    ).toBeInTheDocument();
  });

  it("renders all stat cards", () => {
    render(<DevelopmentJourney />);

    const cards = screen.getAllByTestId(
      "development-journey-stat-cards"
    );

    expect(cards.length).toBe(4);
  });

  it("renders stat labels correctly", () => {
    render(<DevelopmentJourney />);

    expect(screen.getByText("Repositories")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("GitHub Commits")).toBeInTheDocument();
    expect(
      screen.getByText("Focused on Performance & Testing")
    ).toBeInTheDocument();
  });

  it("renders stat numbers (AnimatedNumber wrapper)", () => {
    render(<DevelopmentJourney />);

    const numbers = screen.getAllByTestId(
      "development-journey-number"
    );

    expect(numbers.length).toBe(4);
  });

  it("renders stat labels container correctly", () => {
    render(<DevelopmentJourney />);

    const labels = screen.getAllByTestId(
      "development-journey-label"
    );

    expect(labels.length).toBe(4);
  });
});