import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AdminMessages from "../../admin/pages/AdminMessages";
import * as adminApi from "../../api/adminApi";

// Mock the API layer completely
vi.mock("../../api/adminApi", () => ({
  getContactMessages: vi.fn(),
  markMessageAsRead: vi.fn(),
  markMessageAsUnread: vi.fn(),
  deleteMessage: vi.fn(),
}));

// Mock child component to focus unit testing entirely on AdminMessages logic
vi.mock("../components/MessagesTable", () => ({
  default: ({ messages, onToggleStatus, onDelete, onSelectMessage }) => (
    <div data-testid="mock-messages-table">
      {messages.map((msg) => (
        <div key={msg._id} data-testid={`msg-row-${msg._id}`}>
          <span>{msg.from_name}</span>
          <button 
            data-testid={`toggle-btn-${msg._id}`} 
            onClick={() => onToggleStatus(msg)}
          >
            Toggle
          </button>
          <button 
            data-testid={`delete-btn-${msg._id}`} 
            onClick={() => onDelete(msg)}
          >
            Delete
          </button>
          <button 
            data-testid={`select-btn-${msg._id}`} 
            onClick={() => onSelectMessage(msg)}
          >
            Select
          </button>
        </div>
      ))}
    </div>
  ),
}));

const mockMessages = [
  {
    _id: "msg-1",
    from_name: "Jane Doe",
    email: "jane@example.com",
    company: "Example Co",
    message: "This is a test message.",
    isRead: false,
    createdAt: "2026-07-01T00:00:00.000Z",
  },
  {
    _id: "msg-2",
    from_name: "John Smith",
    email: "john@example.com",
    company: "",
    message: "Another message layout.",
    isRead: true,
    createdAt: "2026-07-02T00:00:00.000Z",
  },
];

describe("AdminMessages Page Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    adminApi.getContactMessages.mockResolvedValue({ data: { messages: mockMessages } });
  });

  it("renders loader initially and switches to main UI upon API resolution", async () => {
    render(<AdminMessages />);
    
    expect(screen.getByTestId("inbox-loading")).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.queryByTestId("inbox-loading")).not.toBeInTheDocument();
    });

    expect(screen.getByTestId("admin-messages-page")).toBeInTheDocument();
    expect(screen.getByText("Total Transmissions")).toBeInTheDocument();
  });

  it("calculates metrics properly and defaults selection to the first index payload", async () => {
    render(<AdminMessages />);
    await screen.findByTestId("admin-messages-page");

    // Scope text matching inside specific structural region layouts
    const metricsSection = screen.getByLabelText("Inbox Metrics");
    expect(within(metricsSection).getByText("2")).toBeInTheDocument(); 
    expect(within(metricsSection).getByText("1")).toBeInTheDocument(); 

    // Detail Panel defaults to index [0] (Jane Doe)
    const inspectionSection = screen.getByLabelText("Selected Conversation Detail");
    expect(within(inspectionSection).getByText("Jane Doe")).toBeInTheDocument();
    expect(within(inspectionSection).getByText("jane@example.com")).toBeInTheDocument();
    expect(within(inspectionSection).getByText("This is a test message.")).toBeInTheDocument();
  });


  it("toggles unread message to read status sequentially updates context state", async () => {
    const user = userEvent.setup();
    adminApi.markMessageAsRead.mockResolvedValueOnce({ success: true });
    
    render(<AdminMessages />);
    await screen.findByTestId("admin-messages-page");

    const toggleActionBtn = screen.getByTestId("inbox-toggle-status");
    expect(toggleActionBtn).toHaveTextContent("Mark Read");

    await user.click(toggleActionBtn);

    expect(adminApi.markMessageAsRead).toHaveBeenCalledWith("msg-1");
    
    await waitFor(() => {
      expect(toggleActionBtn).toHaveTextContent("Mark Unread");
    });
  });

  
  
});