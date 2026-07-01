import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { AdminAuthProvider } from "../../context/AdminAuthContext";
import AdminSettings from "../../admin/pages/AdminSettings";

const adminUser = {
  id: "admin_001",
  name: "Amanuel Amare",
  email: "admin@amanblog.dev",
  role: "admin",
};

describe("AdminSettings Page", () => {
  beforeEach(() => {
    localStorage.setItem("admin_user", JSON.stringify(adminUser));
  });

  it("renders settings page with admin profile details", async () => {
    render(
      <AdminAuthProvider>
        <AdminSettings />
      </AdminAuthProvider>
    );

    expect(await screen.findByTestId("admin-settings-page")).toBeInTheDocument();
    expect(screen.getByTestId("admin-settings-heading")).toHaveTextContent("Settings");
    expect(screen.getByText(adminUser.name)).toBeInTheDocument();
    expect(screen.getByText(adminUser.email)).toBeInTheDocument();
  });
});
