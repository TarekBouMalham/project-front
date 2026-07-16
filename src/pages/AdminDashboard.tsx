import { useState, type FormEvent } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { logout, role, token } = useAuth();
  const navigate = useNavigate();
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCreateAdmin = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("You need to be signed in to create an admin.");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(
        "/api/auth/admins",
        { username, email, password },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setSuccess("New admin created successfully.");
      setUsername("");
      setEmail("");
      setPassword("");
      setShowAdminForm(false);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? "Unable to create admin.");
      } else {
        setError("Unable to create admin.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-800 to-slate-700 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col justify-center">
        <div className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-violet-300">
                Admin panel
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white">
                Manage the catalog with ease
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
                Keep your shopping list updated, add new items, and manage
                inventory from one polished workspace.
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
            >
              Logout
            </button>
          </div>

          {role === "admin" && (
            <div className="mt-8 rounded-2xl border border-violet-400/20 bg-slate-900/40 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-violet-200">
                    Admin management
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Create another administrator account for your team.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAdminForm((prev) => !prev)}
                  className="rounded-2xl bg-gradient-to-r from-violet-500 to-sky-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5"
                >
                  {showAdminForm ? "Cancel" : "Create new admin"}
                </button>
              </div>

              {showAdminForm && (
                <form className="mt-5 space-y-4" onSubmit={handleCreateAdmin}>
                  {error && (
                    <div className="rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                      {success}
                    </div>
                  )}

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label
                        className="mb-2 block text-sm text-slate-200"
                        htmlFor="admin-username"
                      >
                        Username
                      </label>
                      <input
                        id="admin-username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400"
                        placeholder="Admin name"
                        required
                      />
                    </div>
                    <div>
                      <label
                        className="mb-2 block text-sm text-slate-200"
                        htmlFor="admin-email"
                      >
                        Email
                      </label>
                      <input
                        id="admin-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400"
                        placeholder="admin@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="mb-2 block text-sm text-slate-200"
                      htmlFor="admin-password"
                    >
                      Password
                    </label>
                    <input
                      id="admin-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-2xl bg-gradient-to-r from-violet-500 to-sky-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Creating..." : "Create admin"}
                  </button>
                </form>
              )}
            </div>
          )}

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
              <p className="text-sm text-slate-300">Inventory control</p>
              <p className="mt-2 text-xl font-semibold text-white">
                Add, edit, and remove items
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Use the admin workspace to keep your list fresh and accurate at
                all times.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
              <p className="text-sm text-slate-300">Role overview</p>
              <p className="mt-2 text-xl font-semibold text-white">
                Protected and polished
              </p>
              <p className="mt-2 text-sm text-slate-400">
                The same streamlined design now extends to all management views.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
