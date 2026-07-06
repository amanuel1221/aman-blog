import { useMemo, useState, useEffect } from "react";
import MessagesTable from "../components/MessagesTable";
import {
  getContactMessages,
  markMessageAsRead,
  markMessageAsUnread,
  deleteMessage as deleteMessageApi,
} from "../../api/adminApi";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actioningId, setActioningId] = useState(null); // UX tracking for async mutations

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await getContactMessages();
        const data = res.data.messages || res.data || [];

        setMessages(data);
        setSelectedMessage(data?.[0] || null);
      } catch (err) {
        console.error("Failed to load messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const stats = useMemo(
    () => ({
      totalMessages: messages.length,
      unreadMessages: messages.filter((m) => !m.isRead).length,
    }),
    [messages]
  );

  const toggleMessageStatus = async (message) => {
    if (!message?._id) return;
    const id = message._id;
    setActioningId(id);

    try {
      if (message.isRead) {
        await markMessageAsUnread(id);
      } else {
        await markMessageAsRead(id);
      }

      setMessages((prev) =>
        prev.map((m) =>
          m._id === id ? { ...m, isRead: !m.isRead } : m
        )
      );

      setSelectedMessage((prev) =>
        prev?._id === id ? { ...prev, isRead: !prev.isRead } : prev
      );
    } catch (err) {
      console.error("Status toggle failed:", err);
    } finally {
      setActioningId(null);
    }
  };

  const deleteMessage = async (message) => {
    if (!message?._id) return;
    if (!window.confirm(`Are you sure you want to permanently delete the message from ${message.from_name}?`)) return;
    
    const id = message._id;
    setActioningId(id);

    try {
      await deleteMessageApi(id);
      const remaining = messages.filter((m) => m._id !== id);
      setMessages(remaining);
      setSelectedMessage(remaining?.[0] || null);
    } catch (err) {
      console.error("Message deletion failed:", err);
    } finally {
      setActioningId(null);
    }
  };

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  if (loading) {
    return (
      <div data-testid="inbox-loading" className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse text-sm">Opening your connection logs...</p>
      </div>
    );
  }

  return (
    <main data-testid="admin-messages-page" className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-8">
      
      {/* Title Header */}
      <header className="flex flex-col gap-1 border-b border-slate-100 pb-5">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Communications Inbox</h1>
        <p className="text-slate-500 text-sm">
          Review, analyze, and manage inbound communications received from your digital storefront.
        </p>
      </header>

      {/* Balanced Metric Summary Panels */}
      <section aria-label="Inbox Metrics" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl bg-white border border-slate-200/80 p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Transmissions</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{stats.totalMessages}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg text-slate-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4a2 2 0 012-2m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
          </div>
        </div>

        <div className="rounded-xl bg-white border border-slate-200/80 p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Action Required</p>
            <p className={`text-3xl font-bold mt-1 ${stats.unreadMessages > 0 ? "text-indigo-600" : "text-slate-600"}`}>
              {stats.unreadMessages}
            </p>
          </div>
          <div className={`p-3 rounded-lg ${stats.unreadMessages > 0 ? "bg-indigo-50 text-indigo-600" : "bg-slate-50 text-slate-400"}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </div>
        </div>
      </section>

      {/* Primary Logs Log Grid */}
      <section aria-label="Inbound Message Logs" className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
        <MessagesTable
          messages={messages}
          onToggleStatus={toggleMessageStatus}
          onDelete={deleteMessage}
          onSelectMessage={handleSelectMessage}
          selectedMessageId={selectedMessage?._id}
        />
      </section>

      {/* Dynamic Detail Split View Layout */}
      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        
        {/* Active Inspection Core View */}
        <section aria-label="Selected Conversation Detail" className="rounded-2xl bg-white border border-slate-200/80 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Message Content Inspection</h2>
                <p className="text-xs text-slate-400 mt-0.5">Comprehensive diagnostic transmission manifest.</p>
              </div>

              {selectedMessage && (
                <span
                  data-testid="message-badge"
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full shadow-sm tracking-wide ${
                    selectedMessage?.isRead
                      ? "bg-slate-100 text-slate-700 border border-slate-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200 animate-pulse"
                  }`}
                >
                  {selectedMessage?.isRead ? "Archived Logs" : "Active / Unread"}
                </span>
              )}
            </div>

            {!selectedMessage ? (
              <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-medium text-sm">
                Select an entry path parameter above to display conversation files.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Sender</p>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">{selectedMessage.from_name}</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Electronic Mail</p>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5 break-all select-all">{selectedMessage.email}</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Affiliation / Entity</p>
                    <p className="text-sm text-slate-700 mt-0.5 font-medium">{selectedMessage.company || "Not specified"}</p>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Timestamp</p>
                    <p className="text-sm text-slate-700 mt-0.5 font-medium">
                      {new Date(selectedMessage.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-900 text-slate-100 p-5 shadow-inner border border-slate-950">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-800 pb-1.5">Transmission Data</p>
                  <p className="text-sm leading-relaxed font-sans whitespace-pre-line text-slate-200 select-text selection:bg-indigo-500/30">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
            )}
          </div>

          {selectedMessage && (
            <footer className="flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-slate-100">
              <button
                disabled={actioningId === selectedMessage._id}
                onClick={() => toggleMessageStatus(selectedMessage)}
                data-testid="inbox-toggle-status"
                className={`flex-1 min-w-[140px] text-center text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition duration-150 shadow-sm border ${
                  selectedMessage.isRead 
                    ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50" 
                    : "bg-indigo-600 border-indigo-700 text-white hover:bg-indigo-700"
                } disabled:opacity-50`}
              >
                {selectedMessage.isRead ? "Mark Unread" : "Mark Read"}
              </button>

              <button
                disabled={actioningId === selectedMessage._id}
                onClick={() => deleteMessage(selectedMessage)}
                data-testid="inbox-delete-msg"
                className="flex-1 min-w-[140px] text-center text-xs font-bold uppercase tracking-wider bg-red-50 border border-red-100 text-red-600 py-3 rounded-xl transition duration-150 hover:bg-red-100/70 disabled:opacity-50"
              >
                Purge Record
              </button>
            </footer>
          )}
        </section>

        {/* Informative Side Layout Dashboard Prompt */}
        <aside aria-label="Inbox Assistance Summary" className="rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 shadow-sm flex flex-col justify-between border border-slate-950">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/20">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0x" /></svg>
            </div>
            <h3 className="text-base font-bold tracking-tight text-white">System Operations Note</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              When purging records, note that changes are immediately synchronized across related CDN clusters. 
              Always cross-verify transaction credentials before selecting dynamic record purge states.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] text-slate-400 font-medium">
            Pro Tip: Keep the workflow clear by archiving reads to maintain a low latency tracking overview.
          </div>
        </aside>

      </div>
    </main>
  );
};

export default AdminMessages;