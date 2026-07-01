import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TopNavbar from "../../admin/components/TopNavbar";

describe("Admin TopNavbar", () => {
  it("renders the top navbar with the current page title", () => {
    render(<TopNavbar pageTitle="Analytics" />);

    expect(screen.getByTestId("admin-top-navbar")).toBeInTheDocument();
    expect(screen.getByTestId("admin-current-page")).toHaveTextContent("Analytics");
  });

  it("includes the administrator label", () => {
    render(<TopNavbar pageTitle="Dashboard" />);

    expect(screen.getByText(/Administrator/i)).toBeInTheDocument();
  });
});
