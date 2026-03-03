import { useEffect, useState } from "react";

export default function useDocuments(enabled = true) {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!enabled) {
      setDocs([]);
      setLoading(false);
      return;
    }

    const fetchDocs = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:5000/api/text/get-documents",
        );
        if (!response.ok) throw new Error("Failed to fetch documents");
        const data = await response.json();
        setDocs(data.files || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, [enabled]);
  return { docs, loading };
}
export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const currDate = Date.now();
  const diff = currDate - date.getTime();
  const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays >= 2 && diffInDays <= 7) return `${diffInDays} days ago`;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
