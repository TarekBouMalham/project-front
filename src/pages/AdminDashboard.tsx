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
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold mb-4">Welcome, Admin!</h1>
        <div className="flex gap-3">
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            onClick={() => navigate('/admin/shopping-list')}
          >
            Manage Shopping List
          </button>
          <button
            className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;