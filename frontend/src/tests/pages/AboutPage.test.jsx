import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AboutPage from "../../pages/AboutPage";

vi.mock("../../components/NotesGrid", () => ({
  default: () => <div data-testid="notes-grid" />,
}));

const renderPage = () => {
  render(
    <MemoryRouter>
      <AboutPage />
    </MemoryRouter>
  );
};

describe("AboutPage - UI + Content Validation", () => {
  it("renders main heading text correctly", () => {
    renderPage();

    expect(
      screen.getByText(/treat every project as a lab/i)
    ).toBeInTheDocument();
  });

  it("renders about description text", () => {
    renderPage();

    expect(
      screen.getByText(/software engineering, web development/i)
    ).toBeInTheDocument();
  });

  it("renders and validates portfolio link", () => {
    renderPage();

    const portfolioLink = screen.getByTestId("about-view-portfolio");

    expect(portfolioLink).toBeInTheDocument();
    expect(portfolioLink).toHaveAttribute(
      "href",
      "https://amanuel-portfolio-flame.vercel.app"
    );
    expect(portfolioLink).toHaveAttribute("target", "_blank");
    expect(portfolioLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders Why I Started section correctly", () => {
    renderPage();

    expect(
      screen.getByText(/Why I Started/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/mistakes, performance bottlenecks/i)
    ).toBeInTheDocument();
  });

  it("renders quote text correctly", () => {
    renderPage();

    expect(
      screen.getByText(/Measure\. Break\. Optimize\. Repeat\./i)
    ).toBeInTheDocument();
  });

  it("renders NotesGrid component", () => {
    renderPage();

    expect(screen.getByTestId("notes-grid")).toBeInTheDocument();
  });

  it("validates external links section (LinkedIn + GitHub)", () => {
    renderPage();

    const linkedin = screen.getByTestId("about-beyond-blog-linkedin-link");
    const github = screen.getByTestId("about-beyond-blog-github-link");

    expect(linkedin).toHaveAttribute(
      "href",
      "https://linkedin.com/in/amanuel-amare-684234372"
    );

    expect(github).toHaveAttribute(
      "href",
      "https://github.com/amanuel1221"
    );
  });

  it("validates CTA navigation to blogs", () => {
    renderPage();

    const cta = screen.getByTestId("about-beyond-blog-journey-link");

    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "/blogs");
  });
});