// frontend/src/services/admin/especialidadService.js
import axios from "axios";
import { API } from "../../config/api";

// frontend/src/services/admin/especialidadService.js

// ✅ Named export (con 'export const'):
export const especialidadService = {
  // GET público (sin token)
  getAllPublic: async (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL || "https://pebosebackend-production.up.railway.app/api"}/especialidades/public${qs ? `?${qs}` : ""}`,
    );
    return data;
  },

  // GET por ID público
  getByIdPublic: async (id) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL || "https://pebosebackend-production.up.railway.app/api"}/especialidades/public/${id}`,
    );
    return data;
  },

  // GET admin (con token)
  getAll: async () => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL || "https://pebosebackend-production.up.railway.app/api"}/especialidades`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return data;
  },

  // GET por ID admin
  getById: async (id) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL || "https://pebosebackend-production.up.railway.app/api"}/especialidades/${id}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return data;
  },

  // CREATE (FormData para imagen)
  create: async (formData) => {
    const token = localStorage.getItem("token");
    const body = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        if (Array.isArray(formData[key])) {
          body.append(key, JSON.stringify(formData[key]));
        } else {
          body.append(key, formData[key]);
        }
      }
    });

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL || "https://pebosebackend-production.up.railway.app/api"}/especialidades`,
      body,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return data;
  },

  // UPDATE (FormData para imagen)
  update: async (id, formData) => {
    const token = localStorage.getItem("token");
    const body = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        if (Array.isArray(formData[key])) {
          body.append(key, JSON.stringify(formData[key]));
        } else {
          body.append(key, formData[key]);
        }
      }
    });

    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL || "https://pebosebackend-production.up.railway.app/api"}/especialidades/${id}`,
      body,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return data;
  },

  // DELETE
  delete: async (id) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_URL || "https://pebosebackend-production.up.railway.app/api"}/especialidades/${id}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return data;
  },
};
export default especialidadService;
