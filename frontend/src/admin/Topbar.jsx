import { LogOut } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/logout-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken: localStorage.getItem("refreshToken"),
          }),
        },
      );
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
  return (
    <header className="flex flex-shrink-0 items-center justify-between px-8 py-4 border-b border-white/10 bg-[#05070f]/50 backdrop-blur-xl z-20 sticky top-0">
      <div className="flex items-center gap-3">
        <h2 className="font-display font-semibold text-lg text-white">
          Dashboard Overview
        </h2>
      </div>

      <button
        onClick={handleLogout}
        className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-300 transition-all duration-300 font-medium text-sm shadow-lg shadow-red-500/5 hover:shadow-red-500/10"
      >
        <LogOut
          size={16}
          className="group-hover:-translate-x-0.5 transition-transform"
        />
        Logout
      </button>
    </header>
  );
}
