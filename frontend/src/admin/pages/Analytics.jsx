import { useEffect, useState } from "react";
import useDocuments from "../hooks/useDocument";
import { Loader2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Analytics() {
  const { docs, loading: docsLoading } = useDocuments();
  const [topTopics, setTopTopics] = useState([]);
  const [totalQueries, setTotalQueries] = useState(0);
  const [historyLoading, setHistoryLoading] = useState(true);
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`${url}/api/chat/history/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log(data);
        const allMessages =
          data.chatHistory?.flatMap((chat) => chat.messages) || [];
        const userMessages = allMessages.filter((m) => m.role === "user");

        setTotalQueries(userMessages.length);

        // Group by first 4 words as topic key
        const topicMap = {};
        userMessages.forEach((m) => {
          const topic = m.content.split(" ").slice(0, 4).join(" ");
          topicMap[topic] = (topicMap[topic] || 0) + 1;
        });

        const sorted = Object.entries(topicMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([topic, count]) => ({ topic, count }));

        setTopTopics(sorted);
      } catch (err) {
        console.error(err);
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const isLoading = docsLoading || historyLoading;

  const statCards = [
    { label: "Total Documents", value: docs?.length ?? 0 },
    { label: "Total Queries", value: totalQueries },
    { label: "Avg Response Time", value: "1.2s" },
  ];

  const tooltipStyle = {
    contentStyle: {
      background: "#18181b",
      border: "1px solid #ffffff20",
      borderRadius: 8,
    },
    labelStyle: { color: "#a5b4fc" },
    itemStyle: { color: "#fff" },
  };

  if (isLoading) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Knowledge Insights</h1>
        <div className="flex items-center gap-2 text-white/60 text-sm">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading analytics...
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Knowledge Insights</h1>

      {/* Stat Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {statCards.map((stat, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl p-6"
          >
            <p className="text-sm text-white/60">{stat.label}</p>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="mt-8 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold">Top Queried Topics</h3>
            <p className="text-sm text-white/60 mt-1">
              Most frequently asked questions by users.
            </p>
          </div>
          <span className="px-3 py-1 text-xs rounded-md bg-indigo-500/20 text-indigo-400">
            Live Data
          </span>
        </div>

        {topTopics.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topTopics} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis type="number" tick={{ fill: "#ffffff60", fontSize: 11 }} />
              <YAxis
                dataKey="topic"
                type="category"
                tick={{ fill: "#ffffff60", fontSize: 10 }}
                width={160}
              />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-white/30 text-sm">
            No queries found yet.
          </div>
        )}
      </div>
    </div>
  );
}
