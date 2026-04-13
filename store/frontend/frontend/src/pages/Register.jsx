import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import { motion } from "framer-motion";

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await API.post("/auth/register", { name, email, password });
      login(res.data);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
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
          <h2 className="text-3xl font-light tracking-widest text-white uppercase mb-4">Register</h2>
          <p className="text-text-muted text-sm font-light">Join the VEARO community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium ml-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full bg-surface-light border border-border-subtle text-white px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors font-light placeholder:text-text-muted/30"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-10 text-center space-y-4">
          <p className="text-xs text-text-muted font-light">
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:underline transition-all">
              Sign In
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