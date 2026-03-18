// frontend/src/services/admin/documentoService.js
import axios from "axios";
import { API } from "../../config/api";

const documentoService = {
  // Subir documento (público)
  upload: async (formData) => {
    const { data } = await axios.post(
      `${API}/api/documentos/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return data;
  },

  // Obtener documentos por email (público)
  getByEmail: async (email) => {
    const { data } = await axios.get(
      `${API}/documentos/user/${encodeURIComponent(email)}`,
    );
    return data;
  },

  // Obtener todos (admin)
  getAll: async (params = {}) => {
    const token = localStorage.getItem("token");
    const qs = new URLSearchParams(params).toString();
    const { data } = await axios.get(`${API}/documentos${qs ? `?${qs}` : ""}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },

  // Obtener stats (admin)
  getStats: async () => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`${API}/documentos/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },

  // Actualizar estado/notas (admin)
  update: async (id, data) => {
    const token = localStorage.getItem("token");
    const { data: response } = await axios.patch(
      `${API}/documentos/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response;
  },

  // Eliminar documento (admin)
  delete: async (id) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.delete(`${API}/documentos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },
};

export default documentoService;
