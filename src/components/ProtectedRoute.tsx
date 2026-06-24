import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: React.ReactElement;
  allowedRole: string;
}

const ProtectedRoute = ({ children, allowedRole }: Props) => {
  const { token, role } = useAuth();

  if (!token) return <Navigate to="/login" />;
  if (role !== allowedRole) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;