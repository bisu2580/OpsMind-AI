export default function ChatMessage({ message }) {
  const isUser = message.role === "user";
  console.log(message);
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-2xl space-y-2`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? "bg-indigo-600 text-white"
              : "bg-white/10 border border-white/20 backdrop-blur-xl"
          }`}
        >
          {message.content}
        </div>

        {message.citations?.length > 0 && (
          <div className="bg-black/40 border border-white/10 rounded-lg p-3 text-xs text-white/60 space-y-1">
            <p className="text-indigo-400 font-semibold">Sources</p>
            {message.citations.map((c, i) => (
              <div key={i}>
                {c.originalname} — Page {c.pageNumbers?.length > 0 ? c.pageNumbers.join(", ") : 'N/A'}
              </div>
            ))}
          </div>
        )}

        {message.createdAt && (
          <div className="text-[10px] text-white/40">
            {new Date(message.createdAt).toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
}
