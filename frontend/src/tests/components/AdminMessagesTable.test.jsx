import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import MessagesTable from "../../admin/components/MessagesTable";

const messages = [
  {
    id: "1",
    name: "Jane Doe",
    email: "jane@example.com",
    company: "Example Co",
    message: "This is a test message.",
    status: "Unread",
    createdAt: "2026-07-01T00:00:00.000Z",
  },
];

describe("Admin MessagesTable", () => {
  it("renders the messages table and mobile cards", () => {
    render(
      <MessagesTable
        messages={messages}
        onToggleStatus={vi.fn()}
        onDelete={vi.fn()}
        onSelectMessage={vi.fn()}
        selectedMessageId={null}
      />
    );

    expect(screen.getByTestId("messages-table")).toBeInTheDocument();
    expect(screen.getByTestId("messages-cards")).toBeInTheDocument();
    expect(screen.getByTestId("messages-table-desktop")).toBeInTheDocument();
  });

  it("calls the status toggle handler when toggle button is clicked", async () => {
    const onToggleStatus = vi.fn();
    const user = userEvent.setup();

    render(
      <MessagesTable
        messages={messages}
        onToggleStatus={onToggleStatus}
        onDelete={vi.fn()}
        onSelectMessage={vi.fn()}
        selectedMessageId={null}
      />
    );

    const toggleButtons = screen.getAllByTestId("message-toggle-1");
    await user.click(toggleButtons[0]);
    expect(onToggleStatus).toHaveBeenCalledWith("1");
  });
});
