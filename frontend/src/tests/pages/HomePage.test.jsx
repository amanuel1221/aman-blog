import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import HomePage from "../../pages/HomePage";
import * as postApi from "../../api/postApi";

vi.mock("../../api/postApi", () => ({
  getPosts: vi.fn(),
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

const mockPostsPayload = {
  data: {
    posts: [
      { _id: "1", title: "Post 1", createdAt: "2026-01-01T00:00:00.000Z" },
      { _id: "2", title: "Post 2", createdAt: "2026-02-01T00:00:00.000Z" },
      { _id: "3", title: "Post 3", createdAt: "2026-03-01T00:00:00.000Z" },
      { _id: "4", title: "Post 4", createdAt: "2026-04-01T00:00:00.000Z" },
    ],
  },
};

describe("HomePage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    postApi.getPosts.mockResolvedValue(mockPostsPayload);
  });

  const renderPage = () =>
    render(
      <HelmetProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </HelmetProvider>
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
    expect(screen.getByTestId("dev-journey")).toBeInTheDocument();
    
    expect(await screen.findByTestId("what-i-write")).toBeInTheDocument();
    expect(await screen.findByTestId("why-read")).toBeInTheDocument();
  });

  it("renders latest posts correctly", async () => {
    renderPage();

    const posts = await screen.findAllByTestId("post-card");
    
    expect(posts.length).toBe(3); 
  });

  it("renders view all link (desktop + mobile)", async () => {
    renderPage();
    await screen.findByText(/Recent Blog Posts/i);

    const desktopLink = screen.getByTestId("home-page-view-all-articles");
    const mobileLink = screen.getByTestId("home-page-view-all-articles-mobile");

    expect(desktopLink).toBeInTheDocument();
    expect(mobileLink).toBeInTheDocument();
  });

  it("view all link has correct navigation text", async () => {
    renderPage();
    expect(await screen.findByText(/View All Articles/i)).toBeInTheDocument();
  });

  it("validates layout structure", async () => {
    renderPage();

    const layoutContainer = await screen.findByTestId("home-page-latest-posts");
    expect(layoutContainer).toBeInTheDocument();
  });
});