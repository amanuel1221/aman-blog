import { FiTrash2 } from "react-icons/fi";

const MessagesTable = ({
  messages,
  onToggleStatus,
  onDelete,
  onSelectMessage,
  selectedMessageId,
}) => {
  return (
    <div data-testid="messages-table" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Contact Messages
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Messages received from the contact form. Click a row to read the full note.
        </p>
      </div>

      {/* Mobile cards */}
      <div data-testid="messages-cards" className="space-y-4 lg:hidden">
        {messages.map((msg) => (
          <div
            key={msg.id}
            onClick={() => onSelectMessage(msg)}
            data-testid={`message-card-${msg.id}`}
            className={`rounded-3xl border border-gray-200 bg-slate-50 p-4 cursor-pointer transition hover:shadow-lg ${
              selectedMessageId === msg.id ? "ring-2 ring-blue-400" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-gray-800">{msg.name}</p>
                <p className="text-sm text-gray-500">{msg.email}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  msg.status === "Unread"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {msg.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-600">
              <div className="rounded-2xl bg-white p-3 shadow-sm">
                <p className="text-slate-400">Company</p>
                <p className="mt-1 font-medium text-slate-800">{msg.company}</p>
              </div>
              <div className="rounded-2xl bg-white p-3 shadow-sm">
                <p className="text-slate-400">Received</p>
                <p className="mt-1 font-medium text-slate-800">{new Date(msg.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mt-4 rounded-3xl bg-white p-4 shadow-sm text-sm text-gray-700">
              {msg.message}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                data-testid={`message-toggle-${msg.id}`}
                onClick={(event) => {
                  event.stopPropagation();
                  onToggleStatus(msg.id);
                }}
                aria-label={`Toggle read status for message from ${msg.name}`}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  msg.status === "Unread"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {msg.status === "Unread" ? "Mark read" : "Mark unread"}
              </button>
              <button
                data-testid={`message-delete-${msg.id}`}
                onClick={(event) => {
                  event.stopPropagation();
                  onDelete(msg.id);
                }}
                aria-label={`Delete message from ${msg.name}`}
                className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 hover:bg-red-100 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div data-testid="messages-table-desktop" className="overflow-x-auto hidden lg:block">
        <table className="w-full min-w-full text-sm text-left">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Company</th>
              <th className="py-3 px-4">Message</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {messages.map((msg) => (
              <tr
                key={msg.id}
                onClick={() => onSelectMessage(msg)}
                className={`border-b cursor-pointer transition hover:bg-slate-50 ${
                  selectedMessageId === msg.id ? "bg-slate-100" : ""
                }`}
              >
                {/* Name */}
                <td className="py-3 px-4 font-medium text-gray-800">
                  {msg.name}
                </td>

                {/* Email */}
                <td className="py-3 px-4 text-gray-600">
                  {msg.email}
                </td>

                {/* Company */}
                <td className="py-3 px-4 text-gray-600">
                  {msg.company}
                </td>

                {/* Message preview */}
                <td className="py-3 px-4 text-gray-600 max-w-xs overflow-hidden truncate">
                  {msg.message}
                </td>

                {/* Status */}
                <td className="py-3 px-4">
                  {msg.status === "Unread" ? (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600">
                      Unread
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-600">
                      Read
                    </span>
                  )}
                </td>

                {/* Date */}
                <td className="py-3 px-4 text-gray-500">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      data-testid={`message-toggle-${msg.id}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        onToggleStatus(msg.id);
                      }}
                      aria-label={`Toggle read status for message from ${msg.name}`}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                        msg.status === "Unread"
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {msg.status === "Unread" ? "Mark read" : "Mark unread"}
                    </button>

                    <button
                      data-testid={`message-delete-${msg.id}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        onDelete(msg.id);
                      }}
                      className="rounded-full p-2 text-red-600 hover:bg-red-50 transition"
                      title={`Delete message from ${msg.name}`}
                      aria-label={`Delete message from ${msg.name}`}
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {messages.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No messages received yet
        </div>
      )}
    </div>
  );
};

export default MessagesTable;