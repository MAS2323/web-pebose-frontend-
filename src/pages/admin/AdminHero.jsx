import React, { useState } from "react";
import { Plus, Pencil, Trash2, GripVertical, Eye, EyeOff } from "lucide-react";
import { AdminCard } from "../../components/admin/ui/AdminCard";
import { AdminButton } from "../../components/admin/ui/AdminButton";
import { AdminTable } from "../../components/admin/ui/AdminTable";
import { AdminModal } from "../../components/admin/ui/AdminModal";
import { SlideForm } from "../../components/admin/forms/SlideForm";
import { useHero } from "../../hook/admin/useHero";
import { AdminToast } from "../../components/admin/ui/AdminToast";

export const AdminHero = () => {
  const { slides, isLoading, createSlide, updateSlide, deleteSlide } =
    useHero();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [toast, setToast] = useState(null);

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
    if (!confirm(`¿Eliminar el slide "${slide.titulo}"?`)) return;

    try {
      await deleteSlide(slide.id);
      showToast("success", "Slide eliminado");
    } catch (error) {
      showToast("error", "Error al eliminar", error);
    }
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const columns = [
    { key: "orden", title: "Orden", sortable: true },
    {
      key: "imagen_url",
      title: "Imagen",
      render: (url) => (
        <img src={url} alt="" className="w-20 h-12 object-cover rounded-lg" />
      ),
    },
    { key: "titulo", title: "Título", sortable: true },
    {
      key: "activo",
      title: "Estado",
      render: (activo) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${activo ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
        >
          {activo ? "Activo" : "Inactivo"}
        </span>
      ),
    },
  ];

  const actions = (slide) => (
    <div className="flex items-center gap-2">
      <button
        onClick={() => {
          setEditingSlide(slide);
          setIsModalOpen(true);
        }}
        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
      >
        <Pencil className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleDelete(slide)}
        className="p-1 text-red-600 hover:bg-red-50 rounded"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Hero Slider</h1>
        <AdminButton
          onClick={() => {
            setEditingSlide(null);
            setIsModalOpen(true);
          }}
          icon={Plus}
        >
          Nuevo slide
        </AdminButton>
      </div>

      <AdminCard>
        <AdminTable
          columns={columns}
          data={slides}
          isLoading={isLoading}
          actions={actions}
          emptyMessage="No hay slides. Crea el primero."
        />
      </AdminCard>

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

      {toast && <AdminToast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};
