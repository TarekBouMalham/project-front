import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
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
          </div>

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
