import axios from "axios";

// URL base correcta (Railway o Render)
const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://pebosebackend-production.up.railway.app";

// Instancia de axios con configuración global
const api = axios.create({
  baseURL: `${API_BASE}/api`, // ← Asegura que todas las rutas empiecen con /api
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Mantiene cookies/sesiones si tu auth las usa
  // Si solo usas Bearer token y NO cookies → puedes poner false para evitar preflights extras
  // withCredentials: false,
});

// Interceptor: agregar token Bearer si existe
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor: manejar 401 (logout automático)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      window.location.href = "/admin/login"; // O usa navigate si estás en React Router
    }
    return Promise.reject(error);
  },
);

export const authService = {
  /**
   * Login de administrador
   * @param {string} username
   * @param {string} password
   * @returns {Promise<{success: boolean, data: {admin: object, token: string}}>}
   */
  login: async (username, password) => {
    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      const { success, data } = response.data;

      if (success && data?.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("admin", JSON.stringify(data.admin || {}));
      }

      return response.data;
    } catch (error) {
      // Manejo mejorado de errores
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error al iniciar sesión. Verifica conexión o credenciales.";
      console.error("[authService.login] Error:", error);
      throw new Error(message);
    }
  },

  /**
   * Logout - Limpia local y opcionalmente notifica backend
   */
  logout: async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await api.post("/auth/logout"); // Si existe el endpoint
      }
    } catch (error) {
      console.warn("[authService.logout] Error en backend:", error.message);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
    }
  },

  /**
   * Usuario actual desde localStorage
   */
  getCurrentUser: () => {
    try {
      const adminStr = localStorage.getItem("admin");
      return adminStr ? JSON.parse(adminStr) : null;
    } catch {
      return null;
    }
  },

  /**
   * ¿Está autenticado?
   */
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  /**
   * Token actual
   */
  getToken: () => {
    return localStorage.getItem("token");
  },

  /**
   * Refresh perfil (si necesitas actualizar datos del admin)
   */
  refreshProfile: async () => {
    try {
      const response = await api.get("/auth/profile");
      const { success, data } = response.data;

      if (success && data?.admin) {
        localStorage.setItem("admin", JSON.stringify(data.admin));
      }

      return response.data;
    } catch (error) {
      console.error("[authService.refreshProfile] Error:", error);
      throw error;
    }
  },
};

export default authService;
