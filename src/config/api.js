// frontend/src/config/api.js

// 🔗 URL base de la API
// ✅ Vite usa import.meta.env (NO process.env)
export const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api"; // ← Fallback para desarrollo

// 🗺️ Endpoints organizados por módulo
export const ENDPOINTS = {
  // 🔐 AUTH
  AUTH: {
    LOGIN: `${API}/auth/login`, // POST
    PROFILE: `${API}/auth/profile`, // GET (con token)
    LOGOUT: `${API}/auth/logout`, // POST (con token)
  },

  // 🎨 HERO SLIDER
  HERO: {
    PUBLIC: `${API}/hero/public`, // GET (público)
    LIST: `${API}/hero`, // GET (admin)
    CREATE: `${API}/hero`, // POST (admin, multipart)
    UPDATE: (id) => `${API}/hero/${id}`, // PUT (admin)
    DELETE: (id) => `${API}/hero/${id}`, // DELETE (admin)
  },

  // 🛡️ ADMIN PANEL (ejemplo de endpoint adicional)
  ADMIN: {
    STATS: `${API}/admin/stats`, // ← Agrega esto
    DASHBOARD: `${API}/admin/dashboard`,
  },

  // 🏢 INSTALACIONES
  INSTALACIONES: {
    PUBLIC: `${API}/instalaciones/public`, // GET (público)
    LIST: `${API}/instalaciones`, // GET (admin)
    CREATE: `${API}/instalaciones`, // POST (admin)
    UPDATE: (id) => `${API}/instalaciones/${id}`,
    DELETE: (id) => `${API}/instalaciones/${id}`,
  },
};

// ✅ Función fetchApi reutilizable con manejo de errores
export const fetchApi = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  // Si es FormData (subida de archivos), quitar Content-Type JSON
  if (options.body instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  try {
    // Construir URL completa
    const url = endpoint.startsWith("http")
      ? endpoint
      : `${API}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

    const response = await fetch(url, config);

    // Manejar errores HTTP
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    // Respuesta vacía (204 No Content)
    if (response.status === 204) return null;

    return await response.json();
  } catch (error) {
    console.error("❌ Error en fetchApi:", error.message);

    // Si es error 401, cerrar sesión automáticamente
    if (error.message?.includes("401")) {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      window.location.href = "/admin/login";
    }

    throw error;
  }
};
export const API_COMPAT = {
  admin: {
    stats: ENDPOINTS.ADMIN.STATS,
    dashboard: ENDPOINTS.ADMIN.DASHBOARD,
  },
};

// 🎯 Exportación por defecto para compatibilidad
export default { API, ENDPOINTS, fetchApi };
