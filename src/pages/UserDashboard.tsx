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
    <div>
      <h1>Welcome, User!</h1>
      <button onClick={() => navigate("/user/shopping-list")}>
        View Shopping List 
      </button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserDashboard;