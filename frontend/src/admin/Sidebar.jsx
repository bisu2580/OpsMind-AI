import { NavLink } from "react-router-dom";
import {
  FileText,
  BarChart3,
  ShieldCheck,
  Settings,
  Database,
  User,
} from "lucide-react";
import useAuth from "../hooks/useAuth";

const links = [
  {
    name: "Documents",
    path: "/admin/documents",
    icon: FileText,
  },
  {
    name: "Analytics",
    path: "/admin/analytics",
    icon: BarChart3,
  },
  {
    name: "Audit Logs",
    path: "/admin/audit",
    icon: ShieldCheck,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const { user } = useAuth(); // Re-use the auth hook so we can display admin profile

  return (
    <aside className="relative w-80 min-h-screen bg-[#05070f] border-r border-white/10 flex flex-col flex-shrink-0 overflow-hidden shadow-2xl">
      {/* Background gradients */}
      <div className="absolute top-[-100px] left-[-50px] w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-50px] w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header & Logo */}
      <div className="p-6 pb-4 border-b border-white/10 relative z-10 flex-shrink-0">
        <h1 className="font-display text-2xl font-bold tracking-wide text-white mb-6">
          OpsMind
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            AI
          </span>
        </h1>

        {/* User Profile Card */}
        <div className="group relative p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-[1px]">
            <div className="w-full h-full rounded-full bg-[#0a0f1d] flex items-center justify-center">
              <User size={18} className="text-purple-300" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {user?.username || "Admin User"}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.7)]" />
              <p className="text-xs text-white/50 capitalize truncate">
                {user?.role || "admin"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 relative z-10 space-y-8">
        <section>
          <div className="flex items-center gap-2 mb-4 text-white/60">
            <Database size={16} />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Admin Console
            </h3>
          </div>

          <nav className="space-y-2">
            {links.map((l) => {
              const Icon = l.icon;
              return (
                <NavLink
                  key={l.path}
                  to={l.path}
                  className={({ isActive }) =>
                    `
                    group flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 border
                    ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                        : "bg-transparent text-white/70 border-transparent hover:bg-white/5 hover:border-white/10 hover:text-white"
                    }
                  `
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div
                        className={`p-1.5 rounded-lg transition-all duration-300 ${
                          isActive
                            ? "bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/30"
                            : "bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white/80"
                        }`}
                      >
                        <Icon size={16} />
                      </div>
                      <span className="truncate">{l.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </section>
      </div>

      {/* Footer Branding */}
      <div className="p-4 border-t border-white/5 text-center flex-shrink-0 relative z-10 bg-[#05070f]/80 backdrop-blur-md">
        <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
          <span className="w-2 h-[1px] bg-white/20"></span>
          OpsMind Enterprise
          <span className="w-2 h-[1px] bg-white/20"></span>
        </p>
        <p className="text-[10px] text-white/20 mt-1">
          © {new Date().getFullYear()} All Rights Reserved
        </p>
      </div>
    </aside>
  );
}
