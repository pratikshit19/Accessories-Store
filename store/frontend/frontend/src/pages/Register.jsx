import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { name, email, password });
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-full py-24 bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 md:p-10 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded px-4 py-2 mb-6 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-black text-white w-full py-3 rounded hover:bg-gray-800 transition mb-4"
        >
          Register
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}