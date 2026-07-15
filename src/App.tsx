import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UserShoppingList from "./pages/UserShoppingList";
import AdminShoppingList from "./pages/AdminShoppingList";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import AdminUserList from "./pages/AdminUserList";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute allowedRole="user">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/shopping-list" element={<UserShoppingList />} />
      </Route>

      <Route
        element={
          <ProtectedRoute allowedRole="admin">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/shopping-list" element={<AdminShoppingList />} />
        <Route path="/admin/users" element={<AdminUserList />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
