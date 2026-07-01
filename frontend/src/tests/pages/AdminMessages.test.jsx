import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AdminMessages from "../../admin/pages/AdminMessages";

describe("AdminMessages Page", () => {
  it("renders the admin messages page and stats section", () => {
    render(<AdminMessages />);

    expect(screen.getByTestId("admin-messages-page")).toBeInTheDocument();
    expect(screen.getByTestId("admin-messages-heading")).toHaveTextContent("Inbox");
    expect(screen.getByTestId("admin-messages-stats")).toBeInTheDocument();
  });
});
