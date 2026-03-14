import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Uploader = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    setLoading(true);
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFileUpload = () => {
    ref.current.click();
  };
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };
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
      const response = await fetch(`${url}/api/upload/upload-to-server`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      const data = await response.json();
      if (data.success) {
        navigate("/details");
      }
    } catch (err) {
      console.error(err);
    }
    setFiles([]);
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/api/auth/logout-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: localStorage.getItem("refreshToken"),
        }),
      });
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return loading ? (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      Authenticating...
    </div>
  ) : (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f0f1a] via-[#111827] to-[#020617] text-white">
      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-100 h-100 bg-purple-500/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-75 h-75 bg-blue-500/30 rounded-full blur-[120px]" />

      <input
        type="file"
        ref={ref}
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Logout */}
      <button
        className="absolute top-6 right-6 px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30 transition"
        onClick={handleLogout}
      >
        Logout
      </button>

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-md min-h-[55vh] rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-6">
        <h2 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Upload Files
        </h2>
        <p className="text-sm text-white/60 mt-1">
          Securely upload multiple PDFs
        </p>

        {/* Upload Box */}
        <div
          onClick={handleFileUpload}
          className="mt-6 h-50 rounded-xl border-2 border-dashed border-white/30 flex flex-col items-center justify-center cursor-pointer transition hover:border-blue-400 hover:bg-white/10"
        >
          <img
            src="/upload.png"
            alt="upload"
            className="w-16 h-16 opacity-80"
          />
          <p className="mt-3 text-sm text-white/70">Drag & drop files here</p>
          <span className="text-xs text-blue-400 mt-1">or click to browse</span>
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="mt-5 w-full py-2.5 rounded-xl bg-linear-to-r from-blue-500 to-purple-600 font-semibold tracking-wide hover:opacity-90 transition shadow-lg"
        >
          Upload Files
        </button>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-6 space-y-3 max-h-50 overflow-y-auto pr-1">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/10"
              >
                <div>
                  <p className="text-sm font-medium truncate max-w-45">
                    {file.name}
                  </p>
                  <p className="text-xs text-white/50">
                    {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
                  </p>
                </div>

                <span className="text-xs px-2 py-1 rounded-md bg-green-500/20 text-green-400">
                  Ready
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Uploader;
