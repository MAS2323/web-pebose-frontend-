// src/hooks/admin/useHero.js
import { useState, useEffect, useCallback } from "react";
import { useAdmin } from "../../context/AdminContext";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://pebosebackend-production.up.railway.app ";
const HERO_PREFIX = "/api/hero"; // Centraliza el prefijo

export const useHero = () => {
  const adminContext = useAdmin();
  const authFetch = adminContext?.authFetch; // ← acceso seguro
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchSlides = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (typeof authFetch !== "function") {
      const msg =
        "authFetch no disponible o no es función. Revisa AdminContext.";
      console.error(msg, adminContext);
      setError(msg);
      setLoading(false);
      return;
    }

    try {
      const response = await authFetch(`${HERO_PREFIX}/slides`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      console.log("[fetchSlides] Datos recibidos:", data);
      setSlides(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("[fetchSlides] Error completo:", err);
      setError(err.message || "Fallo al cargar slides");
      setSlides([]);
    } finally {
      setLoading(false);
    }
  }, [authFetch]);
  const createSlide = async (slideData) => {
    try {
      const response = await authFetch("/api/hero/slides", {
        method: "POST",
        body: JSON.stringify(slideData),
      });
      const newSlide = await response.json();
      console.log("[createSlide] Nuevo slide:", newSlide);
      setSlides((prev) => [...prev, newSlide]);
      return { success: true };
    } catch (err) {
      console.error("[createSlide] Error:", err);
      return { success: false, error: err.message };
    }
  };

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
    isLoading: loading,
    error,
    createSlide,
    updateSlide,
    deleteSlide,
    reorderSlides,
    refreshSlides: fetchSlides,
  };
};
