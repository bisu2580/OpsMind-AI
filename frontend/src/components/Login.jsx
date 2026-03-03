import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const params = useSearchParams();
  const role = params[0].get("role");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userName,
            email: email,
            password: password,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("refreshToken", data.data.refreshToken);
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("role", data.data.user.role);
        if (data.data.user.role === "admin") {
          navigate("/upload");
        } else {
          navigate("/chat");
        }
      } else throw new Error(data.message);
    } catch (err) {
      console.error(err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070f] text-white font-sans flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[140px] animate-pulse" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold tracking-wide mb-2">
            OpsMind
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              AI
            </span>
          </h1>
          <p className="text-white/60">Welcome back to your knowledge hub</p>
        </div>

        {/* Form Container */}
        <div className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-6 font-display">
            {role
              ? `${role.charAt(0).toUpperCase() + role.slice(1)} Login`
              : "Login"}
          </h2>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-indigo-400" />
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-white/10 text-white placeholder-white/50 pl-10 pr-4 py-2.5 rounded-lg border border-white/20 focus:border-indigo-400 focus:bg-white/15 outline-none transition duration-300"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-indigo-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/10 text-white placeholder-white/50 pl-10 pr-4 py-2.5 rounded-lg border border-white/20 focus:border-indigo-400 focus:bg-white/15 outline-none transition duration-300"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-indigo-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/10 text-white placeholder-white/50 pl-10 pr-10 py-2.5 rounded-lg border border-white/20 focus:border-indigo-400 focus:bg-white/15 outline-none transition duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-white/50 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <p className="text-white/60 text-sm mt-2 text-right hover:underline cursor-pointer">
              Forgot Password?
            </p>
            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 py-2.5 px-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold text-white shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/75 hover:-translate-y-0.5 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? "Logging in..." : "Login"}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="text-white/60 text-sm">New here?</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* Register Link */}
          <button
            onClick={() => navigate(`/register?role=${role}`)}
            className="w-full py-2.5 px-4 rounded-lg border border-white/30 text-white font-semibold hover:bg-white/10 transition duration-300"
          >
            Create{" "}
            {role ? `${role.charAt(0).toUpperCase() + role.slice(1)}` : "New"}{" "}
            Account
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-white/50 text-sm mt-6">
          By logging in, you agree to our{" "}
          <a
            href="#"
            className="text-indigo-400 hover:text-indigo-300 transition"
          >
            Terms of Service
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
