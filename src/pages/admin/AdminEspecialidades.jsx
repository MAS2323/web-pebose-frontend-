import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search, Filter } from "lucide-react";
import { AdminCard } from "../../components/admin/ui/AdminCard";
import { AdminButton } from "../../components/admin/ui/AdminButton";
import { AdminTable } from "../../components/admin/ui/AdminTable";
import { AdminModal } from "../../components/admin/ui/AdminModal";
import { AdminInput } from "../../components/admin/ui/AdminInput";
import { AdminToast } from "../../components/admin/ui/AdminToast";
import { especialidadService } from "../../services/admin/especialidadService";

export const AdminEspecialidades = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  const fetchEspecialidades = async () => {
    try {
      const response = await especialidadService.getAll();
      setEspecialidades(response.data);
    } catch (error) {
      showToast("error", "Error al cargar datos");
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const filteredData = especialidades.filter(
    (e) =>
      e.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.categoria.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const columns = [
    { key: "nombre", title: "Nombre", sortable: true },
    { key: "categoria", title: "Categoría" },
    { key: "duracion", title: "Duración" },
    { key: "precio", title: "Precio" },
    {
      key: "destacado",
      title: "Destacado",
      render: (destacado) =>
        destacado ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Destacado
          </span>
        ) : (
          <span className="text-gray-400">-</span>
        ),
    },
    {
      key: "activo",
      title: "Estado",
      render: (activo) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${activo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {activo ? "Activo" : "Inactivo"}
        </span>
      ),
    },
  ];

  const actions = (item) => (
    <div className="flex items-center gap-2">
      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
        <Pencil className="w-4 h-4" />
      </button>
      <button className="p-1 text-red-600 hover:bg-red-50 rounded">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Especialidades</h1>
        <AdminButton icon={Plus}>Nueva especialidad</AdminButton>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <AdminInput
            placeholder="Buscar especialidad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />
        </div>
        <AdminButton variant="secondary" icon={Filter}>
          Filtrar
        </AdminButton>
      </div>

      <AdminCard>
        <AdminTable
          columns={columns}
          data={filteredData}
          isLoading={isLoading}
          actions={actions}
          emptyMessage="No se encontraron especialidades"
        />
      </AdminCard>

      {toast && <AdminToast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default AdminEspecialidades;
