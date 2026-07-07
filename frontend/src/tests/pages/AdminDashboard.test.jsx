import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AdminDashboard from "../../admin/pages/AdminDashboard";
import * as adminApi from "../../api/adminApi";

// 1. Mock the API layer
vi.mock("../../api/adminApi", () => ({
  getDashboardData: vi.fn(),
}));

// 2. Mock child components using the EXACT relative import paths that AdminDashboard uses!
vi.mock("../components/StatCard", () => ({
  default: ({ title, value }) => (
    <div data-testid="mock-stat-card">
      <span>{title}</span>
      <span>{value}</span>
    </div>
  ),
}));
vi.mock("../components/BarChart", () => ({ default: () => <div data-testid="bar-chart" /> }));
vi.mock("../components/PieChart", () => ({ default: () => <div data-testid="pie-chart" /> }));
vi.mock("../components/LineChart", () => ({ default: () => <div data-testid="line-chart" /> }));
vi.mock("../components/TopPostsTable", () => ({ default: () => <div data-testid="posts-table" /> }));
vi.mock("../components/MessagesTable", () => ({ default: () => <div data-testid="messages-table" /> }));

describe("AdminDashboard Page", () => {
  const mockData = {
    data: {
      stats: {
        totalPosts: 10,
        totalUsers: 5,
        totalLikes: 20,
        totalComments: 7,
        totalViews: 400,
        totalMessages: 3,
      },
      topPosts: [
        {
          _id: "1", // Changed from id to _id to resolve the React key warning
          title: "Sample Admin Post",
          views: 100,
          likes: [],
          commentsCount: 4,
          createdAt: "2026-07-01T00:00:00.000Z",
        },
      ],
      engagementBreakdown: [{ id: 1, value: 50 }],
      monthlyActivity: [{ month: "Jan", views: 10 }],
      recentMessages: [
        {
          _id: "1", // Changed from id to _id
          name: "Jane Doe",
          email: "jane@example.com",
          message: "Hello admin.",
          createdAt: "2026-07-01T00:00:00.000Z",
        },
      ],
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows initial loading skeleton layout items", () => {
    adminApi.getDashboardData.mockReturnValue(new Promise(() => {}));

    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    expect(screen.getByTestId("admin-dashboard-loading")).toBeInTheDocument();
    expect(screen.getByText("Gathering system data")).toBeInTheDocument();
  });

  

  it("displays fallback zero values when data statistics layers are missing", async () => {
    adminApi.getDashboardData.mockResolvedValueOnce({ data: {} });

    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("admin-dashboard-page")).toBeInTheDocument();
    });

    expect(screen.getByText("Total Posts")).toBeInTheDocument();
    const values = screen.getAllByText("0");
    expect(values.length).toBeGreaterThan(0);
  });

  it("handles catch errors gracefully and shows connection error interface", async () => {
    // Spy and suppress console log temporarily during expected error throwing to keep test output clean
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    adminApi.getDashboardData.mockRejectedValueOnce(new Error("API Timeout Error"));

    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId("admin-dashboard-loading")).not.toBeInTheDocument();
    });

    expect(screen.getByTestId("admin-dashboard-error")).toBeInTheDocument();
    expect(screen.getByText("Connection Interrupted")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /try reloading/i })).toBeInTheDocument();
    
    consoleSpy.mockRestore();
  });
});