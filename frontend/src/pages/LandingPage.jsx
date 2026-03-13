import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Zap,
  Shield,
  Rocket,
  Brain,
  FileText,
  CheckCircle2,
  User,
  Lock,
} from "lucide-react";
import "../index.css";
import useAuth from "../hooks/useAuth";
const CTA_CONFIG = {
  guest: { label: "Get Started Now", path: "/login?role=user" },
  user: { label: "Ask Questions", path: "/chat" },
  admin: { label: "Go to Admin Dashboard", path: "/admin" },
};
export default function LandingPage() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const { user } = useAuth();
  const [loginPopup, setLoginPopup] = useState(false);
  const { label, path } = CTA_CONFIG[user?.role ?? "guest"];
  return (
    <div className="min-h-screen bg-[#05070f] text-white font-sans overflow-hidden">
      {/* Animated Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto backdrop-blur-sm">
        <h1 className="font-display text-2xl font-bold tracking-wide">
          OpsMind
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            AI
          </span>
        </h1>

        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition duration-300 flex items-center gap-2">
          {user?.role === "user" ? (
            <div
              onClick={() => navigate("/chat")}
              className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition duration-300 flex items-center gap-2"
            >
              Go to Chat <ArrowRight size={16} />
            </div>
          ) : user?.role === "admin" ? (
            <div
              onClick={() => navigate("/admin")}
              className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition duration-300 flex items-center gap-2"
            >
              Go to Admin Dashboard <ArrowRight size={16} />
            </div>
          ) : (
            <div
              onClick={() => setLoginPopup((prev) => !prev)}
              className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition duration-300 flex items-center gap-2"
            >
              Login <ArrowRight size={16} />
            </div>
          )}
        </button>
        {loginPopup && (
          <div className="absolute top-[80%] mt-3 right-0 w-56 bg-slate-900 border border-white/30 backdrop-blur-xl rounded-xl py-2 px-2 text-sm text-white/80 shadow-2xl shadow-indigo-500/20 z-50">
            {/* Header */}
            <div className="px-3 py-2 mb-2 rounded-lg bg-white/5 border border-white/10">
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                Choose Login Type
              </p>
            </div>

            {/* User Login */}
            <button
              onClick={() => navigate("/login?role=user")}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/40 hover:to-cyan-500/40 border border-blue-400/30 hover:border-blue-400/60 transition duration-300 group mb-2"
            >
              <div className="p-2 rounded-lg bg-blue-500/30 group-hover:bg-blue-500/50 transition">
                <User size={18} className="text-blue-300" />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-white text-sm">User Login</p>
                <p className="text-xs text-white/60">Access documents</p>
              </div>
              <ArrowRight
                size={16}
                className="text-blue-300 opacity-0 group-hover:opacity-100 transition"
              />
            </button>

            {/* Admin Login */}
            <button
              onClick={() => navigate("/login?role=admin")}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/40 hover:to-pink-500/40 border border-purple-400/30 hover:border-purple-400/60 transition duration-300 group"
            >
              <div className="p-2 rounded-lg bg-purple-500/30 group-hover:bg-purple-500/50 transition">
                <Lock size={18} className="text-purple-300" />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-white text-sm">Admin Login</p>
                <p className="text-xs text-white/60">Manage system</p>
              </div>
              <ArrowRight
                size={16}
                className="text-purple-300 opacity-0 group-hover:opacity-100 transition"
              />
            </button>

            {/* Divider */}
            <div className="my-2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            {/* Footer Info */}
            <div className="px-3 py-2 text-xs text-white/50 text-center">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register?role=user")}
                className="text-indigo-300 hover:text-indigo-200 transition"
              >
                Sign up
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Side by Side Layout */}
      <section
        className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-20"
        onClick={() => setLoginPopup(false)}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 mb-6">
              <Zap size={20} className="text-indigo-400" />
              <span className="text-sm text-indigo-300">
                A New Era of Knowledge Access
              </span>
            </div>

            <h2 className="font-display text-6xl font-bold leading-tight mb-6">
              Stop Searching,
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Start Knowing.
              </span>
            </h2>

            <p className="text-lg text-white/70 mb-8 leading-relaxed font-display tracking-wide">
              OpsMind AI is a context-aware corporate knowledge assistant that
              delivers instant, accurate answers from your internal documents --
              with citations and zero hallucinations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button className="px-8 py-4 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 font-semibold shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/75 hover:-translate-y-1 transition duration-300 flex items-center justify-center gap-2 font-display">
                <div
                  onClick={() => navigate(path)}
                  className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold hover:shadow-lg hover:shadow-indigo-500 flex gap-2 items-center"
                >
                  {label} <ArrowRight size={16} />
                </div>
              </button>
              {/* <button className="font-display px-8 py-4 rounded-xl bg-white/10 border border-white/30 font-semibold hover:bg-white/20 hover:border-white/50 transition duration-300 backdrop-blur-xl">
                View Demo
              </button> */}
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              <div>
                <p className="text-2xl font-bold text-indigo-400">99.9%</p>
                <p className="text-sm text-white/60">Accuracy Rate</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-400">10ms</p>
                <p className="text-sm text-white/60">Response Time</p>
              </div>
            </div>
          </div>

          {/* Right - Visual Element */}
          <div className="relative">
            <div className="relative h-[500px] rounded-2xl overflow-hidden border border-white/20 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 backdrop-blur-xl p-8 flex flex-col justify-between">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-transparent to-purple-600/30 animate-pulse" />

              {/* Content */}
              <div className="relative z-10">
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20 mb-4">
                  <p className="text-sm text-white/80"> Financial Report Q4</p>
                  <p className="text-xs text-white/50 mt-1">
                    Page 42 Last updated 2 days ago
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="text-green-400 flex-shrink-0 mt-1"
                    />
                    <p className="text-sm text-white/70">
                      Instant answers with citations
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="text-green-400 flex-shrink-0 mt-1"
                    />
                    <p className="text-sm text-white/70">
                      Zero hallucinations guaranteed
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="text-green-400 flex-shrink-0 mt-1"
                    />
                    <p className="text-sm text-white/70">
                      Enterprise security & compliance
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom floating element */}
              <div className="relative z-10 bg-white/5 rounded-lg p-3 border border-white/10">
                <p className="text-xs text-white/60">
                  {" "}
                  Powered by Advanced RAG Technology
                </p>
              </div>
            </div>

            {/* Decorative circles */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl" />
            <div className="absolute -top-10 -right-20 w-32 h-32 bg-indigo-600/20 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 max-w-7xl mx-auto px-8 py-24"
      >
        <div className="text-center mb-16">
          <h3 className="font-display text-4xl font-bold mb-4">
            Powerful Features
          </h3>
          <p className="text-white/60 text-lg">
            Everything you need for enterprise knowledge management
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Shield,
              title: "Hallucination Guardrail",
              desc: "If the answer is not in your documents, OpsMind AI says I don't know. No assumptions.",
              color: "from-green-500 to-emerald-500",
            },
            {
              icon: FileText,
              title: "Precision Citations",
              desc: "Every answer includes verifiable page numbers and document names for full transparency.",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: Brain,
              title: "Enterprise-Grade RAG",
              desc: "Robust ingestion, chunking, embeddings, vector search, and LLM synthesis built for scale.",
              color: "from-purple-500 to-pink-500",
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              desc: "Sub-second response times with intelligent caching and optimization.",
              color: "from-yellow-500 to-orange-500",
            },
            {
              icon: Rocket,
              title: "Seamless Integration",
              desc: "Connect to any document source and integrate with your existing workflows.",
              color: "from-red-500 to-pink-500",
            },
            {
              icon: CheckCircle2,
              title: "Compliance Ready",
              desc: "Enterprise security, audit logs, and compliance with SOC2, GDPR, and more.",
              color: "from-indigo-500 to-purple-500",
            },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`rounded-2xl p-6 border backdrop-blur-xl transition duration-300 transform ${
                  hovered === i
                    ? "bg-white/20 border-white/40 -translate-y-2 shadow-xl shadow-white/10"
                    : "bg-white/5 border-white/20 hover:bg-white/10"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${f.color} p-2.5 mb-4`}
                >
                  <Icon size={24} className="text-white" />
                </div>
                <h4 className="font-display text-xl font-semibold mb-2">
                  {f.title}
                </h4>
                <p className="text-sm text-white/70">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-8 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 blur-3xl" />
            <div className="relative rounded-3xl border border-white/30 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 backdrop-blur-xl p-12 text-center">
              <h3 className="font-display text-4xl font-bold mb-4">
                Ready to Transform Your Knowledge?
              </h3>
              <p className="text-white/70 text-lg mb-8">
                Join leading enterprises that rely on OpsMind AI for instant,
                accurate answers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/75 hover:-translate-y-1 transition duration-300 flex items-center justify-center gap-2">
                  Get Started Now <ArrowRight size={18} />
                </button>
                <button className="px-8 py-4 rounded-xl bg-white/10 border border-white/30 font-semibold hover:bg-white/20 transition duration-300">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-display font-bold mb-4">OpsMindAI</h4>
              <p className="text-sm text-white/60">
                Enterprise knowledge at your fingertips.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Product</h5>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/40">
            {new Date().getFullYear()} OpsMind AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
