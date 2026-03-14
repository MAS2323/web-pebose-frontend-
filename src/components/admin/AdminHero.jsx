import React, { useState } from "react";
import { Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import { useHero } from "../../hook/admin/useHero";
import { SlideForm } from "./forms/SlideForm";
import { AdminModal } from "./ui/AdminModal";
import { AdminToast } from "./ui/AdminToast";

export const AdminHero = () => {
  const {
    slides,
    isLoading,
    uploadImage,
    createSlide,
    updateSlide,
    deleteSlide,
    refreshSlides,
  } = useHero();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const handleSubmit = async (formData, id) => {
    try {
      if (id) {
        await updateSlide(id, formData);
        showToast("success", "Slide actualizado correctamente");
      } else {
        await createSlide(formData);
        showToast("success", "Slide creado correctamente");
      }
      setIsModalOpen(false);
      setEditingSlide(null);
    } catch (error) {
      showToast("error", error.message || "Error al guardar");
    }
  };

  const handleDelete = async (slide) => {
    if (
      !confirm(
        `¿Eliminar el slide "${slide.titulo}"?\n\nEsto también eliminará la imagen de Cloudinary.`,
      )
    ) {
      return;
    }

    try {
      await deleteSlide(slide.id);
      showToast("success", "Slide e imagen eliminados correctamente");
    } catch (error) {
      showToast("error", "Error al eliminar: " + error.message);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hero Slider</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gestiona las imágenes del carrusel principal
          </p>
        </div>
        <button
          onClick={() => {
            setEditingSlide(null);
            setIsModalOpen(true);
          }}
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
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
              >
                {/* Thumbnail */}
                <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={slide.imagen_url}
                    alt={slide.titulo}
                    className="w-full h-full object-cover"
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
                    Orden: {slide.orden} • {slide.subtitulo || "Sin subtítulo"}
                  </p>
                  <p className="text-xs text-gray-400 truncate font-mono mt-0.5">
                    {slide.imagen_public_id}
                  </p>
                </div>

                {/* Acciones */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingSlide(slide);
                      setIsModalOpen(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(slide)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
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
          uploadImage={uploadImage}
        />
      </AdminModal>

      {/* Toast */}
      {toast && <AdminToast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};
