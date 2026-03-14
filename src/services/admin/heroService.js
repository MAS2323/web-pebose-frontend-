import api from "./api";

export const heroService = {
  // Público
  getPublic: () => api.get("/hero/public"),

  // Admin
  getSlides: () => api.get("/hero/slides"),
  getSlide: (id) => api.get(`/hero/slides/${id}`),
  createSlide: (formData) =>
    api.post("/hero/slides", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  updateSlide: (id, data) => api.patch(`/hero/slides/${id}`, data),
  updateSlideImage: (id, formData) =>
    api.post(`/hero/slides/${id}/update-image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deleteSlide: (id) => api.delete(`/hero/slides/${id}`),
  reorderSlides: (orders) => api.post("/hero/slides/reorder", orders),

  // Config
  getConfig: () => api.get("/hero/config"),
  updateConfig: (data) => api.patch("/hero/config", data),
};
