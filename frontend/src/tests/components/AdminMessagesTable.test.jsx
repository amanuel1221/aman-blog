import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import MessagesTable from "../../admin/components/MessagesTable";

const mockMessages = [
  {
    id: "1", 
    from_name: "Jane Doe",
    email: "jane@example.com",
    company: "Example Co",
    message: "This is a test message.",
    isRead: false,
    createdAt: "2026-07-01T00:00:00.000Z",
  },
];

describe("Admin MessagesTable", () => {
  it("renders headers and individual message content correctly", () => {
    render(
      <MessagesTable
        messages={mockMessages}
        onToggleStatus={vi.fn()}
        onDelete={vi.fn()}
        onSelectMessage={vi.fn()}
        selectedMessageId={null}
      />
    );

    expect(screen.getByText("Inbox Messages")).toBeInTheDocument();
    
    const senderNames = screen.getAllByText("Jane Doe");
    expect(senderNames.length).toBeGreaterThanOrEqual(1);
    
    const messageContents = screen.getAllByText("This is a test message.");
    expect(messageContents.length).toBeGreaterThanOrEqual(1);
  });

  it("calls the selection handler when a row or card is clicked", async () => {
    const onSelectMessage = vi.fn();
    const user = userEvent.setup();

    render(
      <MessagesTable
        messages={mockMessages}
        onToggleStatus={vi.fn()}
        onDelete={vi.fn()}
        onSelectMessage={onSelectMessage}
        selectedMessageId={null}
      />
    );

    const messageRowText = screen.getAllByText("Jane Doe")[0];
    await user.click(messageRowText);

    expect(onSelectMessage).toHaveBeenCalledWith(mockMessages[0]);
  });

  it("calls the status toggle handler with the full message payload object", async () => {
    const onToggleStatus = vi.fn();
    const user = userEvent.setup();

    render(
      <MessagesTable
        messages={mockMessages}
        onToggleStatus={onToggleStatus}
        onDelete={vi.fn()}
        onSelectMessage={vi.fn()}
        selectedMessageId={null}
      />
    );

    const toggleButtons = screen.getAllByRole("button", { name: /read/i });
    await user.click(toggleButtons[0]);

    expect(onToggleStatus).toHaveBeenCalledWith(mockMessages[0]);
  });

  it("calls the delete handler with the full object and stops event propagation", async () => {
    const onDelete = vi.fn();
    const onSelectMessage = vi.fn();
    const user = userEvent.setup();

    render(
      <MessagesTable
        messages={mockMessages}
        onToggleStatus={vi.fn()}
        onDelete={onDelete}
        onSelectMessage={onSelectMessage}
        selectedMessageId={null}
      />
    );

    const deleteButtons = screen.getAllByRole("button").filter(btn => 
      btn.className.includes("text-red") || btn.className.includes("bg-red")
    );
    
    await user.click(deleteButtons[0]);

    expect(onDelete).toHaveBeenCalledWith(mockMessages[0]);
    expect(onSelectMessage).not.toHaveBeenCalled();
  });

  it("shows clean fallback placeholder empty states when array payload is blank", () => {
    render(
      <MessagesTable
        messages={[]}
        onToggleStatus={vi.fn()}
        onDelete={vi.fn()}
        onSelectMessage={vi.fn()}
        selectedMessageId={null}
      />
    );

    expect(screen.getByText(/No messages yet/i)).toBeInTheDocument();
  });
});