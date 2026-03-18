import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { authService } from "../services/admin/authService"; // Ajusta la ruta si es necesario

const AdminContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin debe usarse dentro de un AdminProvider");
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Inicializar auth al montar
  useEffect(() => {
    const initAuth = () => {
      const currentUser = authService.getCurrentUser();
      const token = localStorage.getItem("token"); // ← usa "token" como en authService

      if (currentUser && token) {
        setUser(currentUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Login
  const login = async (username, password) => {
    try {
      const response = await authService.login(username, password);

      if (response?.success && response?.data?.token) {
        setUser(response.data.admin || response.data.user);
        setIsAuthenticated(true);
      }

      return response;
    } catch (err) {
      console.error("Login falló en context:", err);
      throw err;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.warn("Logout backend falló:", err);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // ────────────────────────────────────────────────
  // authFetch: wrapper para peticiones autenticadas
  // ────────────────────────────────────────────────
  const authFetch = useCallback(async (url, options = {}) => {
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const fullUrl = `${import.meta.env.VITE_API_URL || "https://pebosebackend-production.up.railway.app"}${url.startsWith("/") ? "" : "/"}${url}`;

    const response = await fetch(fullUrl, {
      ...options,
      headers,
      credentials: "include", // si usas cookies/sesiones además de token
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Logout automático en 401
        await logout();
        throw new Error("Sesión expirada. Inicia sesión nuevamente.");
      }

      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: `Error ${response.status}` };
      }

      throw new Error(errorData.message || `Error ${response.status}`);
    }

    return response;
  }, []); // Dependencias vacías → estable

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    authFetch, // ← Ahora sí está disponible
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
