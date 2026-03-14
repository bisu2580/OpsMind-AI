import { useEffect, useState } from "react";
import { Loader2, FileText, User, Calendar } from "lucide-react";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`${url}/api/chat/audit`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message);
        console.log(data.auditLogs);
        setLogs(data.auditLogs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <Loader2 className="animate-spin text-indigo-400 w-6 h-6" />
      </div>
    );

  if (error) return <p className="text-red-400 text-sm mt-4">Error: {error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Query Audit Logs</h1>

      {logs.length === 0 ? (
        <p className="text-white/50 text-sm">No queries found.</p>
      ) : (
        <div className="space-y-3">
          {logs.map((log, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-2"
            >
              {/* Query */}
              <p className="text-sm font-medium">"{log.query}"</p>

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-white/50">
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" /> {log.user}
                </span>
                {/* <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(log.createdAt).toLocaleString()}
                </span> */}
              </div>

              {/* Citations */}
              {log.citations.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {log.citations.map((c, j) => (
                    <span
                      key={j}
                      className="flex items-center gap-1 text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-full px-2 py-0.5"
                    >
                      <FileText className="w-3 h-3" />
                      {c.originalname}
                      {c.pageNumbers?.length > 0 &&
                        ` • p.${c.pageNumbers.join(", ")}`}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
