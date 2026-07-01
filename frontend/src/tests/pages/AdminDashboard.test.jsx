import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AdminDashboard from "../../admin/pages/AdminDashboard";
import { getDashboardData } from "../../admin/services/dashboardService";

vi.mock("../../admin/services/dashboardService", () => ({
  getDashboardData: vi.fn(),
}));

describe("AdminDashboard Page", () => {
  const mockData = {
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
        id: "1",
        title: "Sample Admin Post",
        excerpt: "A sample admin post excerpt.",
        views: 100,
        likes: 28,
        comments: 4,
        createdAt: "2026-07-01T00:00:00.000Z",
      },
    ],
    engagementBreakdown: [],
    monthlyActivity: [],
    recentMessages: [
      {
        id: "1",
        name: "Jane Doe",
        email: "jane@example.com",
        company: "Example Co",
        message: "Hello admin.",
        status: "Unread",
        createdAt: "2026-07-01T00:00:00.000Z",
      },
    ],
  };

  beforeEach(() => {
    getDashboardData.mockClear();
  });

  it("renders dashboard content after data loads", async () => {
    getDashboardData.mockResolvedValueOnce(mockData);

    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading dashboard/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("admin-dashboard-page")).toBeInTheDocument();
    });

    expect(screen.getByText(/dashboard overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Posts/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Top Performing Posts/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Contact Messages/i).length).toBeGreaterThan(0);
  });
});
