// frontend/src/hooks/admin/useHero.js
import { useState, useEffect, useCallback } from "react";
import { API } from "../../config/api";

export const useHero = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  // ✅ Obtener slides
  const fetchSlides = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API}/hero`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const result = await response.json();

      // Backend devuelve: { success: true, count: N, data: [...] }
      setSlides(result.data || []);
    } catch (err) {
      console.error("❌ Error fetching slides:", err.message);
      setError(err.message);
      setSlides([]);
    } finally {
      setLoading(false);
    }
  }, [API, token]);

  // ✅ Crear slide
  const createSlide = async (slideData) => {
    try {
      const response = await fetch(`${API}/hero`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(slideData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Error creando slide");
      }

      const result = await response.json();
      await fetchSlides();
      return result.data;
    } catch (err) {
      console.error("❌ Error creating slide:", err.message);
      throw err;
    }
  };

  // ✅ Actualizar slide
  const updateSlide = async (id, slideData) => {
    try {
      const response = await fetch(`${API}/hero/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(slideData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Error actualizando slide");
      }

      const result = await response.json();
      await fetchSlides();
      return result.data;
    } catch (err) {
      console.error("❌ Error updating slide:", err.message);
      throw err;
    }
  };

  // ✅ Eliminar slide - CORREGIDO (sin mongoose)
  const deleteSlide = async (id) => {
    // ✅ Validación simple de ID (sin mongoose)
    if (!id || id === "undefined" || id === "null" || id.trim() === "") {
      throw new Error("ID inválido para eliminar");
    }

    try {
      const response = await fetch(`${API}/hero/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Error eliminando slide");
      }

      await fetchSlides();
      return true;
    } catch (err) {
      console.error("❌ Error deleting slide:", err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchSlides();
  }, [fetchSlides]);

  return {
    slides,
    loading,
    error,
    createSlide,
    updateSlide,
    deleteSlide,
    refreshSlides: fetchSlides,
  };
};
