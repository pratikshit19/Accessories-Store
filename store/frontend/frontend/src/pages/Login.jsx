import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
    } catch (error) {
      alert("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md glass-panel p-10 md:p-12"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-light tracking-widest text-white uppercase mb-4">Login</h2>
          <p className="text-text-muted text-sm font-light">Welcome back to VEARO</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium ml-1">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full bg-surface-light border border-border-subtle text-white px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors font-light placeholder:text-text-muted/30"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-surface-light border border-border-subtle text-white px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors font-light placeholder:text-text-muted/30"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-10 text-center space-y-4">
          <p className="text-xs text-text-muted font-light">
            Don't have an account?{" "}
            <Link to="/register" className="text-white hover:underline transition-all">
              Create one
            </Link>
          </p>
          <Link to="/" className="block text-[10px] uppercase tracking-widest text-text-muted hover:text-white transition-colors">
            Back to store
          </Link>
        </div>
      </motion.div>
    </div>
  );
}