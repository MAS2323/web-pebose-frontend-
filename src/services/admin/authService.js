// frontend/src/services/authService.js
import axios from "axios";
import { API } from "../../config/api";

export const authService = {
  // ← Named export (con 'export' antes de 'const')
  login: async (username, password) => {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const response = await axios.post(API.admin.login, formData.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },

  // O si usas fetch:
  loginFetch: async (username, password) => {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const response = await fetch(API.admin.login, {
      // ← Usar API config
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return await response.json();
  },
};

export default authService;
