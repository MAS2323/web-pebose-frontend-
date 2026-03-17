import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/admin/authService";

const AdminContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin debe usarse dentro de AdminProvider");
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initAuth = () => {
      const currentUser = authService.getCurrentUser();
      const token = localStorage.getItem("admin_token");

      if (currentUser && token) {
        setUser(currentUser);
        setIsAuthenticated(true);
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (username, password) => {
    const response = await authService.login(username, password);
    setUser(response.user);
    setIsAuthenticated(true);
    return response;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
