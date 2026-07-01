import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AdminAnalytics from "../../admin/pages/AdminAnalytics";

describe("AdminAnalytics Page", () => {
  it("renders analytics headings and chart panels", () => {
    render(<AdminAnalytics />);

    expect(screen.getByTestId("admin-analytics-page")).toBeInTheDocument();
    expect(screen.getByTestId("admin-analytics-heading")).toHaveTextContent("Analytics & Trends");
    expect(screen.getByTestId("admin-analytics-posts-chart")).toBeInTheDocument();
    expect(screen.getByTestId("admin-analytics-engagement-chart")).toBeInTheDocument();
    expect(screen.getByTestId("admin-analytics-monthly-chart")).toBeInTheDocument();
  });
});
