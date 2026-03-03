import { useEffect, useState } from "react";
import useDocuments from "../hooks/useDocument";

const initialAnalyticsCards = [
  {
    label: "Total Documents",
    value: 0,
  },
  {
    label: "Total Queries",
    value: 1240,
  },
  {
    label: "Avg Response Time",
    value: "1.2s",
  },
];

export default function Analytics() {
  const { docs, loading } = useDocuments();
  const [analyticsCards, setAnalyticsCards] = useState(initialAnalyticsCards);

  useEffect(() => {
    if (loading) return;

    const updateCards = () => {
      setAnalyticsCards([
        { ...initialAnalyticsCards[0], value: docs?.length ?? 0 },
        { ...initialAnalyticsCards[1] },
        { ...initialAnalyticsCards[2] },
      ]);
    };

    updateCards();
  }, [loading, docs]);

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Knowledge Insights</h1>
        <p className="text-sm text-white/60">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Knowledge Insights</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {analyticsCards?.map((stat, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl p-6"
          >
            <p className="text-sm text-white/60">{stat.label}</p>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold">
              Knowledge Graph & Insights
            </h3>
            <p className="text-sm text-white/60 mt-1">
              Visual representation of document-topic relationships and usage
              patterns.
            </p>
          </div>

          <span className="px-3 py-1 text-xs rounded-md bg-indigo-500/20 text-indigo-400">
            Real-Time Analytics
          </span>
        </div>

        {/* Graph Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Knowledge Graph */}
          <div className="h-[250px] rounded-xl bg-black/30 border border-white/10 flex items-center justify-center">
            <p className="text-white/50 text-sm">
              🔗 Force-Directed Knowledge Graph (Topics ↔ Documents)
            </p>
          </div>

          {/* Top Topics */}
          <div className="h-[250px] rounded-xl bg-black/30 border border-white/10 flex items-center justify-center">
            <p className="text-white/50 text-sm">
              📊 Top Queried Topics (Bar Chart)
            </p>
          </div>

          {/* Document Usage */}
          <div className="h-[250px] rounded-xl bg-black/30 border border-white/10 flex items-center justify-center">
            <p className="text-white/50 text-sm">📄 Document Usage Frequency</p>
          </div>

          {/* Query Trends */}
          <div className="h-[250px] rounded-xl bg-black/30 border border-white/10 flex items-center justify-center">
            <p className="text-white/50 text-sm">📈 Query Volume Over Time</p>
          </div>
        </div>
      </div>
    </div>
  );
}
