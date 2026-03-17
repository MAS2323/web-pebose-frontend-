// frontend/src/pages/admin/AdminHero.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Pencil,
  Trash2,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { useHero } from "../../hook/admin/useHero";
import { AdminToast } from "../../components/admin/ui/AdminToast";

export const AdminHero = () => {
  const navigate = useNavigate();
  const { slides, isLoading, deleteSlide, refreshSlides } = useHero();
  const [toast, setToast] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Debug logs
  useEffect(() => {
    console.log("📊 AdminHero - Slides:", slides);
    console.log("📊 AdminHero - isLoading:", isLoading);
  }, [slides, isLoading]);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  // ✅ Navegar a página de creación
  const handleCreate = () => {
    navigate("hero/nuevo");
  };

  // ✅ Navegar a página de edición
  const handleEdit = (slide) => {
    // Usar slide._id (MongoDB) o slide.id (si tu frontend lo transforma)
    const id = slide._id || slide.id;
    if (!id) {
      showToast("error", "ID del slide no válido");
      return;
    }
    navigate(`/admin/hero/editar/${id}`);
  };

  // ✅ Eliminar slide
  const handleDelete = async (slide) => {
    const id = slide._id || slide.id;
    if (!id) {
      showToast("error", "ID del slide no válido");
      return;
    }

    if (
      !confirm(
        `¿Eliminar el slide "${slide.titulo}"?\n\nEsto también eliminará la imagen de Cloudinary.`,
      )
    ) {
      return;
    }

    try {
      setDeletingId(id);
      await deleteSlide(id);
      showToast("success", "Slide e imagen eliminados correctamente");
      refreshSlides(); // Refrescar lista
    } catch (error) {
      console.error("❌ Error deleting slide:", error);
      showToast("error", "Error al eliminar: " + error.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hero Slider</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gestiona las imágenes del carrusel principal
          </p>
        </div>

        {/* ✅ Botón que navega a página de creación (NO abre modal) */}
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-[#6B7B5F] text-white rounded-lg hover:bg-[#5a6a4f] transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Nuevo slide
        </button>
      </div>

      {/* Lista de Slides */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading && slides.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <div className="animate-spin w-8 h-8 border-2 border-[#6B7B5F] border-t-transparent rounded-full mx-auto mb-4"></div>
            Cargando slides...
          </div>
        ) : slides.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No hay slides. Crea el primero para mostrar en el Hero.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {slides.map((slide) => {
              // ✅ Usar _id de MongoDB o id si está transformado
              const slideId = slide._id || slide.id;

              return (
                <div
                  key={slideId}
                  className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={slide.imagen_url}
                      alt={slide.titulo}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/1920x1080/5D1A1A/FFFFFF?text=Error&font=roboto";
                      }}
                    />
                    {!slide.activo && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-xs font-medium">
                          Inactivo
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                      {slide.titulo}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Orden: {slide.orden} •{" "}
                      {slide.subtitulo || "Sin subtítulo"}
                    </p>
                    <p className="text-xs text-gray-400 truncate font-mono mt-0.5">
                      {slide.imagen_public_id}
                    </p>
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(slide)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Editar"
                      disabled={deletingId === slideId}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(slide)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Eliminar"
                      disabled={deletingId === slideId}
                    >
                      {deletingId === slideId ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Toast notifications */}
      {toast && <AdminToast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default AdminHero;
