import { useMemo, useState } from "react";
import MessagesTable from "../components/MessagesTable";
import { dashboardData } from "../data/mockDashboardData";

const AdminMessages = () => {
  const { recentMessages } = dashboardData;
  const [messages, setMessages] = useState(recentMessages);
  const [selectedMessage, setSelectedMessage] = useState(recentMessages[0] || null);

  const stats = useMemo(
    () => ({
      totalMessages: messages.length,
      unreadMessages: messages.filter((message) => message.status === "Unread").length,
    }),
    [messages]
  );

  const toggleMessageStatus = (messageId) => {
    setMessages((current) =>
      current.map((message) =>
        message.id === messageId
          ? {
              ...message,
              status: message.status === "Unread" ? "Read" : "Unread",
            }
          : message
      )
    );

    setSelectedMessage((current) =>
      current?.id === messageId
        ? { ...current, status: current.status === "Unread" ? "Read" : "Unread" }
        : current
    );
  };

  const deleteMessage = (messageId) => {
    setMessages((current) => current.filter((message) => message.id !== messageId));
    setSelectedMessage((current) => (current?.id === messageId ? null : current));
  };

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  return (
    <div data-testid="admin-messages-page" className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 data-testid="admin-messages-heading" className="text-3xl font-bold text-slate-800">Inbox</h1>
          <p className="text-slate-500 mt-2">
            Track incoming messages, mark unread conversations, and keep communication organized.
          </p>
        </div>

        <div data-testid="admin-messages-stats" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div data-testid="admin-messages-total" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Messages</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{stats.totalMessages}</p>
            <p className="mt-2 text-sm text-slate-500">Total received messages</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Unread</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{stats.unreadMessages}</p>
            <p className="mt-2 text-sm text-slate-500">Unread messages waiting for review</p>
          </div>
        </div>
      </div>

      <MessagesTable
        messages={messages}
        onToggleStatus={toggleMessageStatus}
        onDelete={deleteMessage}
        onSelectMessage={handleSelectMessage}
        selectedMessageId={selectedMessage?.id}
      />

      <div data-testid="admin-messages-details-layout" className="grid gap-6 lg:grid-cols-[1fr_minmax(280px,360px)]">
        <div data-testid="admin-message-details-panel" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">Message details</h2>
              <p className="text-sm text-slate-500 mt-1">
                Click a row to see the full message and sender details.
              </p>
            </div>
            {selectedMessage ? (
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  selectedMessage.status === "Unread"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {selectedMessage.status}
              </span>
            ) : null}
          </div>

          {!selectedMessage ? (
            <div className="rounded-3xl border border-dashed border-slate-200 p-10 text-center text-slate-500">
              Select a message from the table above to read full details.
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">From</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{selectedMessage.name}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Email</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{selectedMessage.email}</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Company</p>
                  <p className="mt-2 text-slate-700">{selectedMessage.company}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Received</p>
                  <p className="mt-2 text-slate-700 break-words">{new Date(selectedMessage.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm text-slate-500">Message</p>
                <p className="mt-4 text-slate-800 leading-7">{selectedMessage.message}</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={() => toggleMessageStatus(selectedMessage.id)}
                  className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  {selectedMessage.status === "Unread" ? "Mark as read" : "Mark as unread"}
                </button>
                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                >
                  Delete message
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-blue-600 p-6 text-white shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-200">Message tips</p>
          <h3 className="mt-4 text-2xl font-semibold">Handle replies faster</h3>
          <p className="mt-3 text-sm leading-7 text-blue-100">
            Review the message details here and mark items as read once you’ve responded. Use the inbox counts to stay on top of new queries.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
