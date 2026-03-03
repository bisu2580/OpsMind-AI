import { useState, useEffect, useRef } from "react";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import UserProfileModal from "../components/UserProfileModal";
import { Loader2, User, LogOut, Trash2 } from "lucide-react";
import useAuth from "../hooks/useAuth";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const [chats, setChats] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [openProfile, setOpenProfile] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const bottomRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, chatLoading]);

  useEffect(() => {
    if (loading) return;

    const fetchChatHistory = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch("http://localhost:5000/api/chat/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        const allMessages =
          data.chatHistory?.flatMap((chat) => chat.messages) || [];

        setChats(allMessages);
      } catch (err) {
        console.error(err);
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchChatHistory();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  const clearChat = () => {
    setChats([]);
  };

  const sendMessage = async (query) => {
    const userMsg = {
      role: "user",
      content: query,
      createdAt: new Date(),
    };

    setChats((prev) => [...prev, userMsg]);
    setChatLoading(true);

    try {
      const token = localStorage.getItem("accessToken");

      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      const assistantMsg = {
        role: "assistant",
        content: data.answer,
        citations: data.citations || [],
        createdAt: new Date(),
      };

      setChats((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setChatLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gradient-to-br from-black via-zinc-900 to-black text-white">
      <Sidebar />

      <div className="flex flex-col flex-1 relative">
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 backdrop-blur-xl bg-black/40">
          <h1
            className="font-semibold text-lg cursor-pointer"
            onClick={() => navigate("/")}
          >
            OpsMind<span className="text-indigo-400">AI</span>
          </h1>

          <div className="flex items-center gap-4">
            <button
              onClick={clearChat}
              className="text-white/60 hover:text-red-400 transition"
              title="Clear Chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setOpenProfile(true)}
              className="text-white/70 hover:text-white flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              {user?.name || "Profile"}
            </button>

            <button
              onClick={handleLogout}
              className="text-white/60 hover:text-red-400 transition"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat Area */}
        {historyLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="animate-spin w-6 h-6 text-indigo-400" />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {chats.length === 0 && (
              <div className="text-center text-white/50 mt-20">
                Ask anything about your company policies...
              </div>
            )}

            {chats.map((chat, i) => (
              <ChatMessage key={i} message={chat} />
            ))}

            {chatLoading && (
              <div className="text-indigo-400 text-sm animate-pulse">
                OpsMind AI is thinking...
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}

        <ChatInput onSend={sendMessage} />
      </div>

      {openProfile && (
        <UserProfileModal onClose={() => setOpenProfile(false)} />
      )}
    </div>
  );
}
