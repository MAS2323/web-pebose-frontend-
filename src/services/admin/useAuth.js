import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/admin/api";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await api.post("/auth/login", { username, password });

      if (data.success) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("admin", JSON.stringify(data.data.admin));
        navigate("/admin");
        return true;
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error de conexión");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      navigate("/admin/login");
    }
  };

  return { handleLogin, logout, isLoading, error };
};
