import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import HomeHero from "../../components/HomeHero";

const renderComponent = () => {
  return render(
    <MemoryRouter>
      <HomeHero />
    </MemoryRouter>
  );
};

describe("HomeHero Component", () => {
  it("renders hero section", () => {
    renderComponent();

    expect(screen.getByTestId("home-hero")).toBeInTheDocument();
  });

  it("renders hero tag text", () => {
    renderComponent();

    expect(screen.getByTestId("home-hero-tag")).toHaveTextContent(
      "Building Fast, Tested & Scalable Web Applications"
    );
  });

  it("renders hero title", () => {
    renderComponent();

    expect(screen.getByTestId("home-hero-title")).toHaveTextContent(
      "Amanuel Blogs Collection"
    );
  });

  it("renders hero description", () => {
    renderComponent();

    expect(screen.getByTestId("home-hero-description")).toHaveTextContent(
      "A collection of engineering notes and blog posts"
    );
  });

  it("renders CTA button", () => {
    renderComponent();

    const button = screen.getByTestId("home-hero-button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Read Blogs");
  });

  it("CTA button links to blogs page", () => {
    renderComponent();

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", "/blogs");
  });

  it("renders hero image with correct attributes", () => {
    renderComponent();

    const image = screen.getByTestId("home-hero-image");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "alt",
      "Developer working on coding projects illustration"
    );
    expect(image).toHaveAttribute(
      "src",
      "/undraw_building-a-website_1wrp.svg"
    );
  });

  it("renders button arrow icon", () => {
    renderComponent();

    expect(screen.getByTestId("home-hero-button-arrow")).toBeInTheDocument();
  });
});