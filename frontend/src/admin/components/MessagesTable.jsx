import { FiTrash2 } from "react-icons/fi";

const MessagesTable = ({
  messages,
  onToggleStatus,
  onDelete,
  onSelectMessage,
  selectedMessageId,
}) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">

      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">
          Inbox Messages
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Every message from your contact form appears here. Unread messages are highlighted for priority.
        </p>
      </div>

      {/* MOBILE CARDS */}
      <div className="lg:hidden p-4 space-y-4">
        {messages.map((msg) => {
          const id = msg._id || msg.id;

          return (
            <div
              key={id}
              onClick={() => onSelectMessage(msg)}
              className={`p-4 rounded-2xl border cursor-pointer transition
                ${
                  selectedMessageId === id
                    ? "border-indigo-400 bg-indigo-50"
                    : msg.isRead
                    ? "bg-white border-slate-200"
                    : "bg-white border-indigo-200 shadow-sm"
                }`}
            >
              {/* Top */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-slate-900">
                    {msg.from_name}
                  </p>
                  <p className="text-xs text-slate-500">{msg.email}</p>
                </div>

                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    msg.isRead
                      ? "bg-slate-100 text-slate-600"
                      : "bg-indigo-100 text-indigo-700"
                  }`}
                >
                  {msg.isRead ? "Read" : "New"}
                </span>
              </div>

              {/* Preview */}
              <p className="text-sm text-slate-600 mt-3 line-clamp-2">
                {msg.message}
              </p>

              {/* Footer */}
              <div className="flex justify-between items-center mt-4 text-xs text-slate-500">
                <span>{msg.company || "Personal"}</span>
                <span>
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleStatus(msg);
                  }}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition cursor-pointer ${
                    msg.isRead
                      ? "bg-slate-100 text-slate-700"
                      : "bg-indigo-600 text-white"
                  }`}
                >
                  {msg.isRead ? "Mark unread" : "Mark read"}
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(msg);
                  }}
                  className="px-3 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4 text-left">Sender</th>
              <th className="p-4 text-left">Message</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {messages.map((msg) => {
              const id = msg._id || msg.id;

              return (
                <tr
                  key={id}
                  onClick={() => onSelectMessage(msg)}
                  className={`border-t cursor-pointer transition
                    ${
                      selectedMessageId === id
                        ? "bg-indigo-50"
                        : msg.isRead
                        ? "hover:bg-slate-50"
                        : "bg-white hover:bg-indigo-50"
                    }`}
                >
                  {/* Sender */}
                  <td className="p-4">
                    <p className="font-medium text-slate-900">
                      {msg.from_name}
                    </p>
                    <p className="text-xs text-slate-500">{msg.email}</p>
                  </td>

                  {/* Message */}
                  <td className="p-4 text-slate-600 max-w-md truncate">
                    {msg.message}
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        msg.isRead
                          ? "bg-slate-100 text-slate-600"
                          : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      {msg.isRead ? "Read" : "New"}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="p-4 text-slate-500">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleStatus(msg);
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                          msg.isRead
                            ? "bg-slate-100 text-slate-700"
                            : "bg-indigo-600 text-white"
                        }`}
                      >
                        {msg.isRead ? "Unread" : "Read"}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(msg);
                        }}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* EMPTY STATE */}
      {messages.length === 0 && (
        <div className="p-10 text-center">
          <div className="text-slate-400 text-sm">
            No messages yet — your inbox is quiet ✨
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesTable;