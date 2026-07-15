import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const navItems =
    role === "admin"
      ? [
          { to: "/admin/dashboard", label: "Dashboard" },
          { to: "/admin/shopping-list", label: "Shopping List" },
          { to: "/admin/users", label: "Users" },
        ]
      : role === "user"
        ? [
            { to: "/user/dashboard", label: "Dashboard" },
            { to: "/user/shopping-list", label: "Shopping List" },
          ]
        : [];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!role) return null;

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            {role === "admin" ? "Admin navigation" : "User navigation"}
          </p>
          <h1 className="mt-1 text-lg font-semibold text-white sm:text-xl">
            {role === "admin" ? "Admin portal" : "User portal"}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-2xl px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-100 text-slate-950"
                    : "border border-white/10 bg-slate-900/70 text-slate-200 hover:bg-slate-900/90"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-rose-500/20 transition hover:-translate-y-0.5"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
