import { useState } from "react";
import { Send } from "lucide-react";

export default function ChatInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about company policies..."
          className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm outline-none"
        />
        <button
          onClick={handleSend}
          className="px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
