import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Sidebar from "../../admin/components/Sidebar";

const mockLogoutAdmin = vi.fn();

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    admin: {
      name: "Jane Admin",
      email: "jane@amanblog.dev",
      role: "Super Admin",
    },
    logoutAdmin: mockLogoutAdmin,
  }),
}));

const renderSidebar = (initialEntries = ["/admin/dashboard"]) => {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="*" element={<Sidebar />} />
        <Route path="/signin" element={<div data-testid="signin-page">Sign In Page</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe("Admin Sidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the sidebar container and navigation layout elements", () => {
    renderSidebar();

    expect(screen.getByTestId("admin-sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("admin-sidebar-nav")).toBeInTheDocument();
  });

  it("renders the functional admin navigation routing links", () => {
    renderSidebar();

    expect(screen.getByRole("link", { name: /Go to Dashboard admin section/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Go to Posts admin section/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Go to Messages admin section/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Go to Analytics admin section/i })).toBeInTheDocument();
  });

  it("renders exact admin profile context details correctly", () => {
    renderSidebar();

    expect(screen.getByText("Jane Admin")).toBeInTheDocument();
    expect(screen.getByText("jane@amanblog.dev")).toBeInTheDocument();
    expect(screen.getByText("Super Admin")).toBeInTheDocument();
  });

  it("manages the layout states when opening and closing mobile menu controls", async () => {
    const user = userEvent.setup();
    renderSidebar();

    const openButton = screen.getByLabelText(/open admin menu/i);
    const closeButton = screen.getByLabelText(/close admin menu/i);

    expect(screen.getByTestId("admin-sidebar")).toHaveClass("-translate-x-full");

    await user.click(openButton);
    expect(screen.getByTestId("admin-sidebar")).toHaveClass("translate-x-0");

    await user.click(closeButton);
    expect(screen.getByTestId("admin-sidebar")).toHaveClass("-translate-x-full");
  });

  it("calls logoutAdmin and cleanly redirects client session routing straight to /signin", async () => {
    const user = userEvent.setup();
    renderSidebar();

    const logoutButton = screen.getByTestId("admin-logout-button");
    await user.click(logoutButton);

    expect(mockLogoutAdmin).toHaveBeenCalledTimes(1);

    expect(screen.getByTestId("signin-page")).toBeInTheDocument();
  });
});