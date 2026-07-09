import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70 sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 inline-flex rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
                User dashboard
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Welcome back, user.
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-slate-600">
                Your space is ready. Keep track of your work and stay on top of what matters.
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-2xl border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;