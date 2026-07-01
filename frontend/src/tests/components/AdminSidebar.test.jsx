import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Sidebar from "../../admin/components/Sidebar";
import { AdminAuthProvider } from "../../context/AdminAuthContext";

describe("Admin Sidebar", () => {
  const renderSidebar = () => {
    render(
      <MemoryRouter>
        <AdminAuthProvider>
          <Sidebar />
        </AdminAuthProvider>
      </MemoryRouter>
    );
  };

  it("renders the sidebar container and navigation", () => {
    renderSidebar();

    expect(screen.getByTestId("admin-sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("admin-sidebar-nav")).toBeInTheDocument();
  });

  it("renders the admin navigation links", () => {
    renderSidebar();

    expect(screen.getByRole("link", { name: /Dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Posts/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Messages/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Analytics/i })).toBeInTheDocument();
  });

  it("includes accessible menu controls", async () => {
    const user = userEvent.setup();

    renderSidebar();

    const openButton = screen.getByLabelText(/open admin menu/i);
    expect(openButton).toBeInTheDocument();

    await user.click(openButton);
    expect(screen.getByLabelText(/close admin menu/i)).toBeInTheDocument();
    expect(screen.getByTestId("admin-logout-button")).toBeInTheDocument();
  });
});
