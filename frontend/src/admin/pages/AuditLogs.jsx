export default function AuditLogs() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Query Audit Logs</h1>

      <div className="space-y-3">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-black/30 border border-white/10"
          >
            <p className="text-sm">
              “What is the extended sick leave policy?”
            </p>
            <p className="text-xs text-white/50 mt-1">
              Source: HR_Policy_2024.pdf • Page 3
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
