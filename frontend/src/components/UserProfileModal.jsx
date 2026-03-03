import { X } from "lucide-react";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

export default function UserProfileModal({ onClose }) {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (user) {
      setName(user?.name);
      setUsername(user?.username);
      setEmail(user?.email);
    }
  }, [user, loading]);
  const handleSave = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="w-[400px] rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">User Profile</h2>
          <button onClick={onClose}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-white/60">Full Name</label>
            <input
              className="w-full mt-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs text-white/60">Username</label>
            <input
              className="w-full mt-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full mt-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
