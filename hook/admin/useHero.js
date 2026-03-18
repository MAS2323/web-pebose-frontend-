// src/hook/admin/useHero.js
import { useState, useEffect, useCallback } from "react";
import { useAdmin } from "../../context/AdminContext";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://pebosebackend-production.up.railway.app";

export const useHero = () => {
  const { authFetch } = useAdmin();
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener slides
  const fetchSlides = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/hero/slides`);
      if (!response.ok) throw new Error("Error al cargar slides");
      const data = await response.json();
      setSlides(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear slide
  const createSlide = async (slideData) => {
    try {
      const response = await authFetch("/api/hero/slides", {
        method: "POST",
        body: JSON.stringify(slideData),
      });
      if (!response.ok) throw new Error("Error al crear slide");
      const newSlide = await response.json();
      setSlides((prev) => [...prev, newSlide]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Actualizar slide
  const updateSlide = async (id, slideData) => {
    try {
      const response = await authFetch(`/api/hero/slides/${id}`, {
        method: "PUT",
        body: JSON.stringify(slideData),
      });
      if (!response.ok) throw new Error("Error al actualizar slide");
      const updated = await response.json();
      setSlides((prev) => prev.map((s) => (s.id === id ? updated : s)));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Eliminar slide
  const deleteSlide = async (id) => {
    try {
      const response = await authFetch(`/api/hero/slides/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar slide");
      setSlides((prev) => prev.filter((s) => s.id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Reordenar slides
  const reorderSlides = async (orderedIds) => {
    try {
      const response = await authFetch("/api/hero/slides/reorder", {
        method: "PUT",
        body: JSON.stringify({ order: orderedIds }),
      });
      if (!response.ok) throw new Error("Error al reordenar");
      await fetchSlides();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
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
    reorderSlides,
    refresh: fetchSlides,
  };
};
