import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useDocuments, { formatDate } from "../admin/hooks/useDocument";
import {
  FileText,
  MessageSquare,
  User,
  ExternalLink,
  ChevronRight,
  Database,
  History,
} from "lucide-react";

// Inline scrollbar styles so we don't have to fiddle with index.css if it doesn't already have them
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Sidebar = () => {
  const { user } = useAuth();
  const { docs, loading } = useDocuments();
  const [chats, setChats] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  useEffect(() => {
    setHistoryLoading(true);
    const fetchChatHistory = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch("http://localhost:5000/api/chat/history", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        // Flatten user messages from history
        const allMessages =
          data.chatHistory?.flatMap((chat) =>
            chat.messages.filter((msg) => msg.role === "user"),
          ) || [];

        setChats(allMessages);
      } catch (error) {
        console.error("Failed to fetch chat history:", error);
      } finally {
        setHistoryLoading(false);
      }
    };
    fetchChatHistory();
  }, []);

  const viewDocs = (doc) => {
    window.open(`http://localhost:5000/uploads/${doc.filename}`, "_blank");
  };

  return (
    <>
      <style>{scrollbarStyles}</style>
      <aside className="w-80 border-r border-white/10 bg-[#05070f] flex flex-col h-screen sticky top-0 shadow-2xl relative overflow-hidden flex-shrink-0">
        {/* Background gradients aligned with Landing page aesthetic */}
        <div className="absolute top-[-100px] left-[-50px] w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-100px] right-[-50px] w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Header & Logo */}
        <div className="p-6 pb-4 border-b border-white/10 relative z-10 flex-shrink-0">
          <h1 className="font-display text-2xl font-bold tracking-wide text-white mb-6">
            OpsMind
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              AI
            </span>
          </h1>

          {/* User Profile Card */}
          <div className="group relative p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-[1px]">
              <div className="w-full h-full rounded-full bg-[#0a0f1d] flex items-center justify-center">
                <User size={18} className="text-indigo-300" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {user?.username || "Guest User"}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <div
                  className={`w-2 h-2 rounded-full ${
                    user?.role === "admin"
                      ? "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.7)]"
                      : "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.7)]"
                  }`}
                />
                <p className="text-xs text-white/50 capitalize truncate">
                  {user?.role || "user"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 space-y-8 relative z-10 custom-scrollbar">
          {/* Documents Section */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-white/60">
              <Database size={16} />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Knowledge Base
              </h3>
            </div>

            <div className="space-y-3">
              {loading ? (
                <div className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/5 animate-pulse">
                  <div className="w-8 h-8 rounded bg-white/10"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-white/10 rounded w-3/4"></div>
                    <div className="h-2 bg-white/10 rounded w-1/2"></div>
                  </div>
                </div>
              ) : docs?.length > 0 ? (
                docs.map((doc) => (
                  <div
                    key={doc._id}
                    className="group relative p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-300"
                  >
                    <div className="flex gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:scale-110 transition-all duration-300">
                        <FileText size={16} />
                      </div>
                      <div className="overflow-hidden flex-1">
                        <p className="text-sm text-white/90 truncate font-medium group-hover:text-indigo-300 transition-colors">
                          {doc.originalname}
                        </p>
                        <p className="text-[11px] text-white/40 mt-1">
                          {formatDate(doc.createdAt)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => viewDocs(doc)}
                      className="w-full mt-2 py-1.5 px-3 rounded-lg text-xs font-medium bg-black/20 text-white/60 hover:text-white border border-transparent hover:border-white/10 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      View Document <ExternalLink size={12} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-xs text-white/40 italic p-3 text-center border border-white/5 rounded-lg border-dashed">
                  No documents available.
                </div>
              )}
            </div>
          </section>

          {/* Chat History Section */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-white/60">
              <History size={16} />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Recent Queries
              </h3>
            </div>

            <div className="space-y-2">
              {historyLoading ? (
                <div className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/5 animate-pulse">
                  <div className="w-6 h-6 rounded-full bg-white/10"></div>
                  <div className="h-3 bg-white/10 rounded w-2/3"></div>
                </div>
              ) : chats?.length > 0 ? (
                // Show last 5 queries to save space
                chats
                  .slice(-5)
                  .reverse()
                  .map((chat, i) => (
                    <div
                      key={i}
                      className="group flex gap-3 p-3 rounded-xl border border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <MessageSquare
                        size={14}
                        className="text-white/40 mt-0.5 flex-shrink-0 group-hover:text-purple-400 transition-colors"
                      />
                      <p className="text-sm text-white/70 line-clamp-2 leading-relaxed group-hover:text-white/90 transition-colors">
                        {chat.content}
                      </p>
                    </div>
                  ))
              ) : (
                <div className="text-xs text-white/40 italic p-3 text-center border border-white/5 rounded-lg border-dashed">
                  No recent chat history.
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Footer Branding */}
        <div className="p-4 border-t border-white/5 text-center flex-shrink-0 relative z-10 bg-[#05070f]/80 backdrop-blur-md">
          <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
            <span className="w-2 h-[1px] bg-white/20"></span>
            Enterprise Access
            <span className="w-2 h-[1px] bg-white/20"></span>
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
