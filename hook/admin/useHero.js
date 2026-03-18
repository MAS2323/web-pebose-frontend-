// src/hooks/admin/useHero.js
import { useState, useEffect, useCallback } from "react";
import { useAdmin } from "../../context/AdminContext";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://pebosebackend-production.up.railway.app";
const HERO_PREFIX = "/api/hero"; // Centraliza el prefijo

export const useHero = () => {
  const { authFetch } = useAdmin();
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSlides = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}${HERO_PREFIX}/slides`, {
        credentials: "include", // si usas cookies/auth
      });
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(
          `Error al cargar slides: ${response.status} - ${errText}`,
        );
      }
      const data = await response.json();
      setSlides(data || []);
    } catch (err) {
      console.error("fetchSlides error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createSlide = async (slideData) => {
    try {
      const response = await authFetch(`${HERO_PREFIX}/slides`, {
        method: "POST",
        body: JSON.stringify(slideData),
      });
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Error al crear: ${response.status} - ${errText}`);
      }
      const newSlide = await response.json();
      setSlides((prev) => [...prev, newSlide]);
      return { success: true, data: newSlide };
    } catch (err) {
      console.error("createSlide error:", err);
      return { success: false, error: err.message };
    }
  };

  // updateSlide, deleteSlide, reorderSlides → similar, usa `${HERO_PREFIX}/slides/...`

  const updateSlide = async (id, slideData) => {
    try {
      const response = await authFetch(`${HERO_PREFIX}/slides/${id}`, {
        method: "PUT",
        body: JSON.stringify(slideData),
      });
      if (!response.ok) throw new Error("Error al actualizar slide");
      const updated = await response.json();
      setSlides((prev) =>
        prev.map((s) => (s._id === id || s.id === id ? updated : s)),
      );
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteSlide = async (id) => {
    try {
      const response = await authFetch(`${HERO_PREFIX}/slides/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar slide");
      setSlides((prev) => prev.filter((s) => (s._id || s.id) !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const reorderSlides = async (orderedIds) => {
    try {
      const response = await authFetch(`${HERO_PREFIX}/slides/reorder`, {
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
