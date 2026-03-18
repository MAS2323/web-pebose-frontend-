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
