// frontend/src/hooks/admin/useAuth.js
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async (username, password) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await authService.login(username, password);

        if (result?.success) {
          // Redirigir al dashboard admin
          navigate("/admin", { replace: true });
          return true;
        } else {
          setError(result?.message || "Credenciales inválidas");
          return false;
        }
      } catch (err) {
        const message =
          err.response?.data?.message || err.message || "Error de conexión";
        setError(message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [navigate],
  );

  const handleLogout = useCallback(async () => {
    await authService.logout();
    navigate("/admin/login", { replace: true });
  }, [navigate]);

  return {
    user: authService.getCurrentUser(),
    isAuthenticated: authService.isAuthenticated(),
    isLoading,
    error,
    login: handleLogin,
    logout: handleLogout,
  };
};
