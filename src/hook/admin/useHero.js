import { useState, useEffect, useCallback } from "react";
import { API, fetchApi } from "../../config/api";

export const useHero = () => {
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todos los slides (admin)
  const fetchSlides = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchApi(API.hero.slides);
      setSlides(data);
      return data;
    } catch (err) {
      setError(err.message);
      console.error("❌ Error fetching slides:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Obtener slides públicos
  const fetchPublicSlides = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchApi(API.hero.public);
      return data;
    } catch (err) {
      setError(err.message);
      console.error("❌ Error fetching public slides:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSlides();
  }, [fetchSlides]);

  // Subir imagen a Cloudinary
  const uploadImage = async (file) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      // No usar fetchApi porque es FormData
      const response = await fetch(API.hero.uploadImage, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Error al subir imagen");
      }

      const data = await response.json();
      console.log("✅ Imagen subida:", data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Crear slide
  const createSlide = async (slideData) => {
    setIsLoading(true);
    try {
      const data = await fetchApi(API.hero.slides, {
        method: "POST",
        body: JSON.stringify(slideData),
      });
      setSlides((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Actualizar slide
  const updateSlide = async (id, slideData) => {
    setIsLoading(true);
    try {
      const data = await fetchApi(API.hero.slideById(id), {
        method: "PUT",
        body: JSON.stringify(slideData),
      });
      setSlides((prev) => prev.map((s) => (s.id === id ? data : s)));
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Eliminar slide
  const deleteSlide = async (id) => {
    setIsLoading(true);
    try {
      const data = await fetchApi(API.hero.slideById(id), {
        method: "DELETE",
      });
      setSlides((prev) => prev.filter((s) => s.id !== id));
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Eliminar imagen de Cloudinary por public_id
  const deleteImage = async (publicId) => {
    try {
      const data = await fetchApi(API.hero.deleteImage(publicId), {
        method: "DELETE",
      });
      return data;
    } catch (err) {
      console.error("❌ Error eliminando imagen:", err);
      throw err;
    }
  };

  return {
    slides,
    isLoading,
    error,
    fetchSlides,
    fetchPublicSlides,
    uploadImage,
    createSlide,
    updateSlide,
    deleteSlide,
    deleteImage,
  };
};
