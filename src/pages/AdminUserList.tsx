import { useEffect, useState } from "react";
import axios from "axios";
import type { IUser } from "../types/User";
import { useAuth } from "../context/AuthContext";

const AdminUserList = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState("");
  const auth = useAuth();

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/auth", {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setUsers(res.data);
    } catch {
      setError("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-800 to-slate-700 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {error && (
          <div className="mt-6 rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        )}

        <div className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:p-10">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-white">All users</h2>
            <span className="rounded-full border border-white/15 bg-slate-900/40 px-3 py-1 text-sm text-slate-300">
              {users.length} total
            </span>
          </div>

          {users.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-white/20 bg-slate-900/40 p-8 text-center">
              <p className="text-lg font-medium text-white">No users yet.</p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 shadow-lg shadow-slate-950/20 sm:flex-row"
                >
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {user.username}
                        </h3>
                        <p className="mt-1 text-sm text-slate-400">
                          {user.email}
                        </p>
                      </div>
                      <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200">
                        {user.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUserList;
