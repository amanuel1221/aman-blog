import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AdminAnalytics from "../../admin/pages/AdminAnalytics";
import * as adminApi from "../../api/adminApi";

// 1. Mock the API module layer
vi.mock("../../api/adminApi", () => ({
  getDashboardData: vi.fn(),
}));

// 2. Intercept chart components using both root-relative and component-relative strategies 
// to guarantee Vitest catches and replaces them with stubs.
vi.mock("/src/admin/components/BarChart", () => ({
  default: () => <div data-testid="mock-bar-chart">Mock Bar Chart</div>,
}));
vi.mock("../components/BarChart", () => ({
  default: () => <div data-testid="mock-bar-chart">Mock Bar Chart</div>,
}));

vi.mock("/src/admin/components/PieChart", () => ({
  default: () => <div data-testid="mock-pie-chart">Mock Pie Chart</div>,
}));
vi.mock("../components/PieChart", () => ({
  default: () => <div data-testid="mock-pie-chart">Mock Pie Chart</div>,
}));

vi.mock("/src/admin/components/LineChart", () => ({
  default: () => <div data-testid="mock-line-chart">Mock Line Chart</div>,
}));
vi.mock("../components/LineChart", () => ({
  default: () => <div data-testid="mock-line-chart">Mock Line Chart</div>,
}));

const mockAnalyticsPayload = {
  data: {
    topPosts: [{ id: 1, title: "Post 1", views: 100 }],
    engagementBreakdown: [{ label: "Likes", value: 50 }],
    monthlyActivity: [{ month: "July", interactions: 200 }],
  },
};

describe("AdminAnalytics Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially, then transitions to data graphs on success", async () => {
    adminApi.getDashboardData.mockResolvedValueOnce(mockAnalyticsPayload);

    render(<AdminAnalytics />);

    // Assert transient loader frame shows up first
    expect(screen.getByText("Loading analytics...")).toBeInTheDocument();

    // Wait explicitly for loading screen to clear and data content to render
    await waitFor(() => {
      expect(screen.queryByText("Loading analytics...")).not.toBeInTheDocument();
    });

    // Main layout assertions
    expect(screen.getByTestId("admin-analytics-page")).toBeInTheDocument();
    expect(screen.getByTestId("admin-analytics-heading")).toHaveTextContent("Analytics & Trends");
    
    // Check chart grid container panels
    expect(screen.getByTestId("admin-analytics-posts-chart")).toBeInTheDocument();
    expect(screen.getByTestId("admin-analytics-engagement-chart")).toBeInTheDocument();
    expect(screen.getByTestId("admin-analytics-monthly-chart")).toBeInTheDocument();

    // Verify mock stubs are caught and rendered instead of the heavy Recharts engine
    expect(screen.getByTestId("mock-bar-chart")).toBeInTheDocument();
    expect(screen.getByTestId("mock-pie-chart")).toBeInTheDocument();
    expect(screen.getByTestId("mock-line-chart")).toBeInTheDocument();
  });

  it("renders empty notice placeholder blocks when arrays are completely dry", async () => {
    adminApi.getDashboardData.mockResolvedValueOnce({
      data: { topPosts: [], engagementBreakdown: [], monthlyActivity: [] }
    });

    render(<AdminAnalytics />);
    
    // Acts as an implicit await-for-load wrapper
    await screen.findByText("Analytics & Trends"); 

    expect(screen.getByText("No post data yet.")).toBeInTheDocument();
    expect(screen.getByText("No engagement data yet.")).toBeInTheDocument();
    expect(screen.getByText("No activity data yet.")).toBeInTheDocument();
  });

  it("gracefully catches rejected responses and updates layout context to error modes", async () => {
    adminApi.getDashboardData.mockRejectedValueOnce({
      response: { data: { message: "Server breakdown cluster failure" } }
    });

    render(<AdminAnalytics />);

    // Wait until error layer evaluates
    const errorContainer = await screen.findByText("Server breakdown cluster failure");
    expect(errorContainer).toBeInTheDocument();
    expect(errorContainer).toHaveClass("text-red-500");
    
    // Graph panels should be completely absent
    expect(screen.queryByTestId("mock-bar-chart")).not.toBeInTheDocument();
  });
});