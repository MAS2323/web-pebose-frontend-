import axios from "axios";

// ✅ URL correcta con /api
const API =
  import.meta.env.VITE_API_URL ||
  "https://pebosebackend-production.up.railway.app/api";

// const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Importante para cookies/sesiones
});

// Interceptor para agregar token
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

// Interceptor para errores 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      window.location.href = "/admin/login";
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
    // ✅ Ruta correcta: /api/auth/login (NO /api/admin/login)
    // ✅ Formato: JSON (NO form-urlencoded)
    const response = await axios.post(
      `${API}/auth/login`,
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json", // ← Importante: JSON
        },
      },
    );

    // Guardar token y usuario en localStorage
    if (response.data?.success && response.data?.data?.token) {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("admin", JSON.stringify(response.data.data.admin));
    }

    return response.data;
  },

  /**
   * Logout - Cierra sesión y limpia storage
   */
  logout: async () => {
    try {
      // Opcional: Notificar al backend (si tienes el endpoint)
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
          `${API}/auth/logout`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
      }
    } catch (error) {
      console.warn("⚠️ Error en logout backend:", error.message);
      // Continuar con el logout local aunque falle el backend
    } finally {
      // Limpiar storage local
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
    }
  },

  /**
   * Obtener usuario actual desde localStorage
   * @returns {object|null}
   */
  getCurrentUser: () => {
    try {
      const admin = localStorage.getItem("admin");
      return admin ? JSON.parse(admin) : null;
    } catch {
      return null;
    }
  },

  /**
   * Verificar si hay sesión activa
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  /**
   * Obtener token actual
   * @returns {string|null}
   */
  getToken: () => {
    return localStorage.getItem("token");
  },

  /**
   * Refresh del perfil del usuario (opcional)
   * @returns {Promise<object>}
   */
  refreshProfile: async () => {
    const token = authService.getToken();
    if (!token) throw new Error("No hay token");

    const response = await axios.get(`${API}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data?.success && response.data?.data?.admin) {
      localStorage.setItem("admin", JSON.stringify(response.data.data.admin));
    }

    return response.data;
  },
};

export default authService;
