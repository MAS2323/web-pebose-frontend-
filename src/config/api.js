// ============================================
// CONFIGURACIÓN CENTRALIZADA DE API - PEBOSE
// ============================================

const BASE_URL = "http://localhost:8000/api";

// Endpoints organizados por módulo
export const API = {
  // Hero Slider
  hero: {
    public: `${BASE_URL}/hero/public`,
    slides: `${BASE_URL}/hero/slides`,
    uploadImage: `${BASE_URL}/hero/upload-image`,
    deleteImage: (publicId) =>
      `${BASE_URL}/hero/images/${encodeURIComponent(publicId)}`,
    slideById: (id) => `${BASE_URL}/hero/slides/${id}`,
  },

  // Admin
  admin: {
    stats: `${BASE_URL}/admin/stats`,
    login: `${BASE_URL}/admin/login`,
    me: `${BASE_URL}/admin/me`,
    users: `${BASE_URL}/admin/users`,
    setup: `${BASE_URL}/admin/setup`,
  },

  // Imágenes (genérico)
  images: {
    upload: `${BASE_URL}/images/upload`,
    deleteByUrl: `${BASE_URL}/images/delete-by-url`,
    deleteById: (publicId) =>
      `${BASE_URL}/images/${encodeURIComponent(publicId)}`,
  },

  // Especialidades CEEP
  especialidades: {
    list: `${BASE_URL}/especialidades`,
    byId: (id) => `${BASE_URL}/especialidades/${id}`,
    bySlug: (slug) => `${BASE_URL}/especialidades/slug/${slug}`,
  },

  // Contacto
  contacto: {
    create: `${BASE_URL}/contacto`,
    list: `${BASE_URL}/contacto`,
  },

  // Inscripciones
  inscripciones: {
    create: `${BASE_URL}/inscripciones`,
    list: `${BASE_URL}/inscripciones`,
  },
};

// Helper para hacer fetch con manejo de errores
export const fetchApi = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  // Si es FormData, no agregar Content-Type (el navegador lo pone automáticamente)
  if (options.body instanceof FormData) {
    delete defaultOptions.headers["Content-Type"];
  }

  const response = await fetch(url, { ...defaultOptions, ...options });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ detail: "Error desconocido" }));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }

  return response.json();
};

// Exportar base URL por si se necesita
export { BASE_URL };
