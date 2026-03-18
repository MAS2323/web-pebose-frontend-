// frontend/src/config/api.js

// 🔗 URL base de la API - SIN ESPACIOS AL FINAL
export const API =
  import.meta.env.VITE_API_URL ||
  "https://pebosebackend-production.up.railway.app/api"; // ← Sin espacio

// export const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// 🗺️ Endpoints organizados por módulo
export const ENDPOINTS = {
  // 🔐 AUTH
  AUTH: {
    LOGIN: `/auth/login`, // ← Solo la ruta, sin API
    PROFILE: `/auth/profile`,
    LOGOUT: `/auth/logout`,
  },

  // 🎨 HERO SLIDER
  HERO: {
    PUBLIC: `/hero/public`,
    LIST: `/hero`,
    CREATE: `/hero`,
    UPDATE: (id) => `/hero/${id}`,
    DELETE: (id) => `/hero/${id}`,
  },

  // 🛡️ ADMIN PANEL
  ADMIN: {
    STATS: `/admin/stats`,
    DASHBOARD: `/admin/dashboard`,
  },

  // 🏢 INSTALACIONES
  INSTALACIONES: {
    PUBLIC: `/instalaciones/public`,
    LIST: `/instalaciones`,
    CREATE: `/instalaciones`,
    UPDATE: (id) => `/instalaciones/${id}`,
    DELETE: (id) => `/instalaciones/${id}`,
  },

  // 📄 DOCUMENTOS - AGREGAR ESTO
  DOCUMENTOS: {
    UPLOAD: `/documentos/upload`,
    LIST: `/documentos`,
    BY_USER: (email) => `/documentos/user/${email}`,
  },
};

// ✅ Función fetchApi corregida
export const fetchApi = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  // Construir URL correctamente
  const url = endpoint.startsWith("http") ? endpoint : `${API}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  // Si es FormData, quitar Content-Type
  if (options.body instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    if (response.status === 204) return null;

    return await response.json();
  } catch (error) {
    console.error("❌ Error en fetchApi:", error.message);

    if (error.message?.includes("401")) {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      window.location.href = "/admin/login";
    }

    throw error;
  }
};

// Helper para uploads
export const uploadDocumento = async (formData) => {
  return fetchApi(ENDPOINTS.DOCUMENTOS.UPLOAD, {
    method: "POST",
    body: formData,
  });
};

// Compatibilidad
export const API_COMPAT = {
  admin: {
    stats: ENDPOINTS.ADMIN.STATS,
    dashboard: ENDPOINTS.ADMIN.DASHBOARD,
  },
};

export default { API, ENDPOINTS, fetchApi, uploadDocumento };
