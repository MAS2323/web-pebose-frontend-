const { authFetch } = useAdmin();
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSlides = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authFetch("/api/hero/slides");
      const data = await response.json();
      console.log("[fetchSlides] Datos recibidos:", data);
      setSlides(Array.isArray(data) ? data : data?.slides || data?.data || []);
    } catch (err) {
      console.error("[fetchSlides] Error:", err);
      setError(err.message || "No se pudieron cargar los slides");
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
  // ✅ Actualizar slide
  const updateSlide = async (id, slideData) => {
    try {
      const response = await fetch(`${API}/api/hero/${id}`, {
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

  // ✅ Eliminar slide
  const deleteSlide = async (id) => {
    // ✅ Validar ID antes de hacer fetch
    if (!id || id === "undefined" || id === "null") {
      throw new Error("ID inválido para eliminar");
    }

    try {
      const response = await fetch(`${API}/api/hero/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Error eliminando slide");
      }

      // ✅ Backend devuelve: { success: true, message: "..." }
      // No hay data.data aquí, solo confirmación
      await fetchSlides(); // Refrescar lista
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
