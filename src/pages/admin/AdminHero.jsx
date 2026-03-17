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
import { AdminModal } from "../../components/admin/ui/AdminModal";
import { AdminToast } from "../../components/admin/ui/AdminToast";
import { SlideForm } from "../../components/admin/forms/SlideForm";

export const AdminHero = () => {
  const navigate = useNavigate();
  const {
    slides,
    isLoading,
    createSlide,
    updateSlide,
    deleteSlide,
    refreshSlides,
  } = useHero();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [toast, setToast] = useState(null);
  const [deletingId, setDeletingId] = useState(null); // ✅ Para mostrar loading al eliminar

  // ✅ Debug logs (puedes quitarlos en producción)
  useEffect(() => {
    console.log("📊 AdminHero - Slides:", slides);
    console.log("📊 AdminHero - isLoading:", isLoading);
  }, [slides, isLoading]);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  // ✅ Navegar a página de CREAR slide (nuevo)
  const handleCreate = () => {
    // Resetear estados del modal
    setEditingSlide(null);
    setIsModalOpen(false);
    // Navegar a la ruta de creación
    navigate("/admin/hero/nuevo");
  };

  // ✅ Navegar a página de EDITAR slide
  const handleEdit = (slide) => {
    const id = slide._id || slide.id;
    if (!id) {
      showToast("error", "ID del slide no válido");
      return;
    }
    setEditingSlide(null);
    setIsModalOpen(false);
    navigate(`/admin/hero/editar/${id}`);
  };

  // ✅ Eliminar slide - CORREGIDO con validación de ID
  const handleDelete = async (slide) => {
    // ✅ Obtener ID correcto: MongoDB usa _id, NO id
    const id = slide._id || slide.id;

    // ✅ Validar que el ID existe
    if (!id || id === "undefined" || id === "null") {
      showToast("error", "ID del slide no válido");
      console.error("❌ ID inválido:", { slide, id });
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
      setDeletingId(id); // Mostrar loading en este botón
      await deleteSlide(id); // ✅ Pasar el ID válido
      showToast("success", "✅ Slide e imagen eliminados correctamente");
      refreshSlides(); // Refrescar lista
    } catch (error) {
      console.error("❌ Error deleting slide:", error);
      showToast("error", "Error al eliminar: " + error.message);
    } finally {
      setDeletingId(null);
    }
  };

  // ✅ Submit del formulario (modal)
  const handleSubmit = async (formData, id) => {
    try {
      if (id) {
        await updateSlide(id, formData);
        showToast("success", "✅ Slide actualizado correctamente");
      } else {
        await createSlide(formData);
        showToast("success", "✅ Slide creado correctamente");
      }
      setIsModalOpen(false);
      setEditingSlide(null);
      refreshSlides();
    } catch (error) {
      showToast("error", error.message || "Error al guardar");
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
              // ✅ Usar _id de MongoDB para key y acciones
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
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center gap-2">
                    {/* Editar */}
                    <button
                      onClick={() => handleEdit(slide)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Editar"
                      disabled={deletingId === slideId}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>

                    {/* Eliminar - con loading */}
                    <button
                      onClick={() => handleDelete(slide)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Eliminar"
                      disabled={deletingId === slideId || isLoading}
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

      {/* Modal (solo para edición rápida si lo necesitas) */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSlide(null);
        }}
        title={editingSlide ? "Editar slide" : "Nuevo slide"}
        size="lg"
      >
        <SlideForm
          slide={editingSlide}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingSlide(null);
          }}
          isLoading={isLoading}
        />
      </AdminModal>

      {/* Toast */}
      {toast && <AdminToast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default AdminHero;
