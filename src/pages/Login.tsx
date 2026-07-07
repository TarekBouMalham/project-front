import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/auth/login", { email, password });
      login(res.data.token, res.data.role);

      if (res.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-800 to-slate-700 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-4xl items-center justify-center">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-white">Login</h2>
          <p className="mt-2 text-sm text-slate-300">Enter your details to continue.</p>

          <form className="mt-6 space-y-4" onSubmit={handleLogin}>
            {error && (
              <div className="rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                {error}
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm text-slate-200" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-200" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-violet-500 px-4 py-3 font-medium text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-300">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className="font-medium text-sky-300 transition hover:text-sky-200"
              onClick={() => navigate("/register")}
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;