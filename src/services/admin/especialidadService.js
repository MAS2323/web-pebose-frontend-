import api from "./api";

export const especialidadService = {
  // Público
  getAllPublic: (params) => api.get("/ceep/especialidades/public", { params }),
  getBySlug: (slug) => api.get(`/ceep/especialidades/public/${slug}`),
  createInscripcion: (data) =>
    api.post("/ceep/especialidades/inscripcion", data),

  // Admin
  getAll: (params) => api.get("/ceep/especialidades/", { params }),
  getById: (id) => api.get(`/ceep/especialidades/${id}`),
  create: (data) => api.post("/ceep/especialidades/", data),
  createWithImage: (formData) =>
    api.post("/ceep/especialidades/with-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, data) => api.patch(`/ceep/especialidades/${id}`, data),
  updateImage: (id, formData) =>
    api.post(`/ceep/especialidades/${id}/update-image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => api.delete(`/ceep/especialidades/${id}`),

  // Inscripciones
  getInscripciones: (params) =>
    api.get("/ceep/especialidades/inscripciones/list", { params }),
  updateInscripcion: (id, data) =>
    api.patch(`/ceep/especialidades/inscripciones/${id}`, data),
};
