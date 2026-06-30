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
    <div>
      <h1>Welcome, Admin!</h1>
      <button onClick={() => navigate("/admin/shopping-list")}>
        Manage Shopping List 
      </button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;