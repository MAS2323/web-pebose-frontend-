import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, GraduationCap } from "lucide-react";
import { AdminCard } from "../../components/admin/ui/AdminCard";
import { AdminButton } from "../../components/admin/ui/AdminButton";
import { AdminTable } from "../../components/admin/ui/AdminTable";
import { AdminModal } from "../../components/admin/ui/AdminModal";
import { AdminToast } from "../../components/admin/ui/AdminToast";
import { especialidadService } from "../../services/admin/especialidadService";

export const AdminCEEP = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  const fetchEspecialidades = async () => {
    try {
      const response = await especialidadService.getAll();
      setEspecialidades(response.data);
    } catch (error) {
      showToast("error", "Error al cargar especialidades");
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar esta especialidad?")) return;

    try {
      await especialidadService.delete(id);
      setEspecialidades(especialidades.filter((e) => e.id !== id));
      showToast("success", "Especialidad eliminada");
    } catch (error) {
      showToast("error", "Error al eliminar");
    }
  };

  const columns = [
    { key: "orden", title: "Orden", sortable: true },
    {
      key: "imagen_principal",
      title: "Imagen",
      render: (url) =>
        url ? (
          <img src={url} alt="" className="w-16 h-12 object-cover rounded-lg" />
        ) : (
          <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-gray-400" />
          </div>
        ),
    },
    { key: "nombre", title: "Nombre", sortable: true },
    { key: "categoria", title: "Categoría" },
    { key: "duracion", title: "Duración" },
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

  const actions = (item) => (
    <div className="flex items-center gap-2">
      <button
        onClick={() => {
          setEditingId(item.id);
          setIsModalOpen(true);
        }}
        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
      >
        <Pencil className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleDelete(item.id)}
        className="p-1 text-red-600 hover:bg-red-50 rounded"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gestión CEEP</h1>
        <AdminButton
          onClick={() => {
            setEditingId(null);
            setIsModalOpen(true);
          }}
          icon={Plus}
        >
          Nueva especialidad
        </AdminButton>
      </div>

      <AdminCard>
        <AdminTable
          columns={columns}
          data={especialidades}
          isLoading={isLoading}
          actions={actions}
          emptyMessage="No hay especialidades registradas"
        />
      </AdminCard>

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingId(null);
        }}
        title={editingId ? "Editar especialidad" : "Nueva especialidad"}
        size="xl"
      >
        <div className="p-4">
          <p className="text-gray-500">
            Formulario de especialidades - Implementar según necesidades
          </p>
        </div>
      </AdminModal>

      {toast && <AdminToast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default AdminCEEP;
