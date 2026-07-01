import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import HomePage from "../../pages/HomePage";

vi.mock("../../store/mockPosts", () => ({
  default: [
    { id: 1, title: "Post 1", date: "2025-01-01" },
    { id: 2, title: "Post 2", date: "2025-02-01" },
    { id: 3, title: "Post 3", date: "2025-03-01" },
    { id: 4, title: "Post 4", date: "2025-04-01" },
  ],
}));

vi.mock("../../components/PostCard", () => ({
  default: ({ post }) => <div data-testid="post-card">{post.title}</div>,
}));

vi.mock("../../components/HomeHero", () => ({
  default: () => <div data-testid="home-hero">Hero</div>,
}));

vi.mock("../../components/WhatAbout", () => ({
  default: () => <div data-testid="what-i-write">What I Write</div>,
}));

vi.mock("../../components/DevelopmentJourney", () => ({
  default: () => <div data-testid="dev-journey">Journey</div>,
}));

vi.mock("../../components/WhyReadMyBlog", () => ({
  default: () => <div data-testid="why-read">Why Read</div>,
}));

describe("HomePage Component", () => {
  const renderPage = () =>
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

  it("renders main sections correctly", async () => {
    renderPage();

    expect(await screen.findByText(/Recent Blog Posts/i)).toBeInTheDocument();

    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("home-page-latest-articles")).toBeInTheDocument();
  });

  it("renders child components", async () => {
    renderPage();

    expect(screen.getByTestId("home-hero")).toBeInTheDocument();
    expect(screen.getByTestId("what-i-write")).toBeInTheDocument();
    expect(screen.getByTestId("why-read")).toBeInTheDocument();
  });

  it("renders latest posts correctly", () => {
    renderPage();

    const posts = screen.getAllByTestId("post-card");
    expect(posts.length).toBe(3); 
  });

  it("renders view all link (desktop + mobile)", () => {
    renderPage();

    const desktopLink = screen.getByTestId("home-page-view-all-articles");
    const mobileLink = screen.getByTestId("home-page-view-all-articles-mobile");

    expect(desktopLink).toBeInTheDocument();
    expect(mobileLink).toBeInTheDocument();
  });

  it("view all link has correct navigation text", () => {
    renderPage();

    expect(screen.getByText(/View All Articles/i)).toBeInTheDocument();
  });

  it("validates layout structure", () => {
    renderPage();

    expect(screen.getByTestId("home-page-latest-posts")).toBeInTheDocument();
  });
});