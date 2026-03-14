import { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const { login, logout, isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      await login(username, password);
      navigate("/admin/dashboard");
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || "Error al iniciar sesión");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return {
    handleLogin,
    handleLogout,
    isLoading,
    error,
    isAuthenticated,
  };
};
