import { Book, Trash, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useDocuments from "../hooks/useDocument";

export default function Documents() {
  const ref = useRef();
  const [files, setFiles] = useState([]);
  const [alldocs, setDocs] = useState([]);
  // const [loading, setLoading] = useState(false);
  const { docs, loading } = useDocuments();

  const handleSelect = (e) => setFiles([...e.target.files]);
  const formatDate = (timestamp) => {
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
  useEffect(() => {
    if (loading) return;
    try {
      setDocs(docs);
    } catch (err) {
      console.error(err);
    }
  }, [loading, docs]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!files.length) return;
    console.log(files);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    console.log(formData.getAll("files"));
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        "http://localhost:5000/api/upload/upload-to-server",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        },
      );
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      const data = await response.json();
      if (data.success) {
        setDocs((prev) => [...data.files, ...prev]);
      }
    } catch (err) {
      console.error(err);
    }
    setFiles([]);
  };

  const handleDelete = async (docId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://localhost:5000/api/text/delete-document/${docId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (!response.ok) throw new Error("Failed to delete document");
      const data= await response.json();
      if(!data.success) throw new Error(data.message || "Failed to delete document");
      setDocs((prev) => prev.filter((doc) => doc._id !== docId));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Knowledge Base</h1>

      {/* Upload Card */}
      <div className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl p-6 mb-8">
        <input
          type="file"
          ref={ref}
          multiple
          accept="application/pdf"
          className="hidden"
          onChange={handleSelect}
        />

        <div
          onClick={() => ref.current.click()}
          className="h-[180px] border-2 border-dashed border-white/30 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/10"
        >
          <Upload className="w-8 h-8 text-indigo-400 mb-2" />
          <p className="text-sm text-white/70">
            Upload corporate PDFs (HR, Finance, SOPs)
          </p>
          <span className="text-xs text-indigo-400 mt-1">Click to browse</span>
        </div>

        {files.length > 0 && (
          <button
            className="mt-4 px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700"
            onClick={handleUpload}
          >
            Ingest & Index Documents
          </button>
        )}
      </div>

      {/* Document List */}
      {alldocs.length > 0 ? (
        <div className="space-y-3">
          {alldocs.map((doc, i) => (
            <div
              key={doc._id || i}
              className="flex justify-between items-center p-4 rounded-xl bg-black/30 border border-white/10 relative"
            >
              <div>
                <p className="font-medium">{doc.originalname}</p>
                <p className="text-xs text-white/50">
                  Indexed • {doc.chunks?.length || 0} chunks • Updated{" "}
                  {formatDate(doc.createdAt)}
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <span className="text-green-400 text-sm">Active</span>
                <span
                  className="bg-red-500/20 border border-red-500/40 text-red-400 px-2 py-1 rounded-md text-xs cursor-pointer hover:bg-red-500/30 transition"
                  onClick={() => handleDelete(doc._id)}
                >
                  <Trash className="w-3 h-5 cursor-pointer hover:text-red-600" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <h1 className="mb-6 text-2xl font-bold">Documents Uploaded</h1>
          <div className="bg-white/10 rounded-lg border border-white/20 backdrop-blur-xl h-40 flex items-center justify-center">
            <p className="text-white/60 text-center">
              <Book className="inline mr-2" /> No documents uploaded yet.
            </p>
          </div>
        </>
      )}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <p className="text-white text-lg">Loading documents...</p>
        </div>
      )}
    </div>
  );
}
