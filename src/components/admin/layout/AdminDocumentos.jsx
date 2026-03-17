// frontend/src/pages/admin/AdminDocumentos.jsx
import React, { useState, useEffect } from "react";
import {
  Download,
  Trash2,
  Eye,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Mail,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { AdminCard } from "../ui/AdminCard";
import { AdminButton } from "../ui/AdminButton";
import { AdminTable } from "../ui/AdminTable";
import { AdminInput } from "../ui/AdminInput";
import { AdminToast } from "../ui/AdminToast";
import documentoService from "../../../services/admin/documentoService";

const CATEGORIAS = [
  { value: "", label: "Todas las categorías" },
  { value: "documentacion_personal", label: "Documentación Personal" },
  { value: "credenciales", label: "Credenciales" },
  { value: "certificados", label: "Certificados" },
  { value: "solicitud_inscripcion", label: "Solicitud Inscripción" },
  { value: "otros", label: "Otros" },
];

const ESTADOS = [
  { value: "", label: "Todos los estados" },
  { value: "pendiente", label: "Pendiente" },
  { value: "revisado", label: "Revisado" },
  { value: "aprobado", label: "Aprobado" },
  { value: "rechazado", label: "Rechazado" },
];

export const AdminDocumentos = () => {
  const [documentos, setDocumentos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    categoria: "",
    estado: "",
    page: 1,
  });
  const [toast, setToast] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [docsRes, statsRes] = await Promise.all([
        documentoService.getAll(filters),
        documentoService.getStats().catch((err) => {
          console.warn("⚠️ Stats endpoint falló:", err);
          return { data: null };
        }),
      ]);

      setDocumentos(docsRes.data || []);

      if (statsRes.data) {
        setStats(statsRes.data);
      } else {
        setStats({
          totalDocumentos: docsRes.data?.length || 0,
          totalSizeMB: "0",
          porEstado: {},
        });
      }
    } catch (error) {
      console.error("❌ Error cargando documentos:", error);
      setError(error.message || "Error al cargar documentos");
      showToast("error", "Error al cargar datos: " + error.message);
      setDocumentos([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.page]);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  // ✅ Funciones de Acción con Logs
  const handleDownload = (doc) => {
    console.log("⬇️ Descargando:", doc.nombreOriginal, "URL:", doc.url);
    if (!doc.url) {
      showToast("error", "Este documento no tiene URL válida");
      return;
    }
    window.open(doc.url, "_blank", "noopener,noreferrer");
  };

  const handleView = (doc) => {
    console.log("👁️ Viendo:", doc.nombreOriginal, "URL:", doc.url);
    if (!doc.url) {
      showToast("error", "No se puede visualizar el documento");
      return;
    }
    window.open(doc.url, "_blank", "noopener,noreferrer");
  };

  const handleUpdateStatus = async (id, nuevoEstado) => {
    console.log("🔄 Actualizando ID:", id, "Nuevo Estado:", nuevoEstado);
    try {
      await documentoService.update(id, { estado: nuevoEstado });
      showToast("success", `Estado actualizado a ${nuevoEstado}`);
      fetchData();
    } catch (error) {
      console.error("❌ Error actualizando estado:", error);
      showToast("error", "Error actualizando estado: " + error.message);
    }
  };

  const handleDelete = async (doc) => {
    console.log("🗑️ Eliminando ID:", doc._id);
    if (!confirm(`¿Eliminar permanentemente "${doc.nombreOriginal}"?`)) return;

    try {
      await documentoService.delete(doc._id);
      showToast("success", "Documento eliminado");
      fetchData();
    } catch (error) {
      console.error("❌ Error eliminando documento:", error);
      showToast("error", "Error eliminando documento: " + error.message);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getEstadoBadge = (estado) => {
    const config = {
      pendiente: { bg: "bg-yellow-100", text: "text-yellow-800", icon: Clock },
      revisado: { bg: "bg-blue-100", text: "text-blue-800", icon: Eye },
      aprobado: {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: CheckCircle,
      },
      rechazado: { bg: "bg-red-100", text: "text-red-800", icon: XCircle },
    };
    const { bg, text, icon: Icon } = config[estado] || {};
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${bg} ${text}`}
      >
        <Icon className="w-3 h-3" />
        {estado?.charAt(0).toUpperCase() + estado?.slice(1)}
      </span>
    );
  };

  const columns = [
    {
      key: "nombreOriginal",
      title: "Documento",
      render: (val, doc) => (
        <div className="flex items-center gap-3 min-w-[200px]">
          <FileText className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <div className="overflow-hidden">
            <p className="font-medium text-gray-900 truncate max-w-[180px] sm:max-w-xs">
              {val}
            </p>
            <p className="text-xs text-gray-500">
              {formatFileSize(doc.tamaño)}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "nombreUsuario",
      title: "Usuario",
      render: (val, doc) => (
        <div className="min-w-[150px]">
          <p className="font-medium text-gray-900 truncate max-w-[150px] sm:max-w-none">
            {val}
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1 truncate">
            <Mail className="w-3 h-3 flex-shrink-0" />
            {doc.email}
          </p>
        </div>
      ),
    },
    {
      key: "categoria",
      title: "Categoría",
      render: (val) => (
        <span className="truncate block max-w-[120px] sm:max-w-none">
          {val}
        </span>
      ),
    },
    {
      key: "especialidad",
      title: "Especialidad",
      render: (val) => (
        <span className="text-gray-600 truncate block max-w-[120px] sm:max-w-none">
          {val || "-"}
        </span>
      ),
    },
    {
      key: "estado",
      title: "Estado",
      render: (val) => getEstadoBadge(val),
      className: "text-center",
    },
    {
      key: "createdAt",
      title: "Fecha",
      render: (val) => (
        <span className="text-sm text-gray-600 whitespace-nowrap">
          {new Date(val).toLocaleDateString("es-ES")}
        </span>
      ),
    },
  ];

  // ✅ Columna de Acciones Corregida
  const actions = (doc) => (
    <div className="flex items-center gap-2 justify-end min-w-[160px]">
      {/* Botón Descargar */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDownload(doc);
        }}
        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
        title="Descargar"
        type="button"
      >
        <Download className="w-4 h-4" />
      </button>

      {/* Botón Ver */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleView(doc);
        }}
        className="p-1.5 text-gray-600 hover:bg-gray-50 rounded transition-colors"
        title="Ver"
        type="button"
      >
        <Eye className="w-4 h-4" />
      </button>

      {/* Selector de Estado */}
      <select
        value={doc.estado}
        onChange={(e) => {
          e.stopPropagation();
          handleUpdateStatus(doc._id, e.target.value);
        }}
        onClick={(e) => e.stopPropagation()} // Evitar que el click cierre filas expandibles si las hubiera
        className="px-2 py-1 text-xs border rounded bg-white hover:border-[#1a365d] focus:ring-1 focus:ring-[#1a365d] cursor-pointer outline-none"
        title="Cambiar estado"
      >
        {ESTADOS.filter((e) => e.value).map((est) => (
          <option key={est.value} value={est.value}>
            {est.label}
          </option>
        ))}
      </select>

      {/* Botón Eliminar */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(doc);
        }}
        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
        title="Eliminar"
        type="button"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documentos CEEP</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gestiona los documentos subidos por los usuarios
          </p>
        </div>
        <AdminButton
          onClick={fetchData}
          disabled={isLoading}
          className="w-full sm:w-auto flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          <span>Actualizar</span>
        </AdminButton>
      </div>

      {/* Error Message */}
      {error && (
        <AdminCard className="!p-4 bg-red-50 border-red-200">
          <div className="flex items-start gap-3 text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium">Error al cargar documentos</p>
              <p className="text-sm mt-1">{error}</p>
              <button
                onClick={fetchData}
                className="text-sm font-semibold underline mt-2 hover:text-red-900"
              >
                Reintentar carga
              </button>
            </div>
          </div>
        </AdminCard>
      )}

      {/* Stats */}
      {stats && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminCard className="!p-4 border-l-4 border-l-[#1a365d]">
            <p className="text-2xl font-bold text-gray-900">
              {stats.totalDocumentos || 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">Total Documentos</p>
          </AdminCard>
          <AdminCard className="!p-4 border-l-4 border-l-blue-500">
            <p className="text-2xl font-bold text-gray-900">
              {stats.totalSizeMB || "0"} MB
            </p>
            <p className="text-sm text-gray-500 mt-1">Espacio Usado</p>
          </AdminCard>
          <AdminCard className="!p-4 border-l-4 border-l-yellow-500">
            <p className="text-2xl font-bold text-yellow-600">
              {stats.porEstado?.pendiente || 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">Pendientes</p>
          </AdminCard>
          <AdminCard className="!p-4 border-l-4 border-l-green-500">
            <p className="text-2xl font-bold text-green-600">
              {stats.porEstado?.aprobado || 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">Aprobados</p>
          </AdminCard>
        </div>
      )}

      {/* Filtros */}
      <AdminCard className="!p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 w-full">
            <AdminInput
              placeholder="Buscar por nombre, email..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              icon={Search}
              className="w-full"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <select
              value={filters.categoria}
              onChange={(e) => handleFilterChange("categoria", e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a365d] bg-white text-sm w-full sm:w-auto"
            >
              {CATEGORIAS.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>

            <select
              value={filters.estado}
              onChange={(e) => handleFilterChange("estado", e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a365d] bg-white text-sm w-full sm:w-auto"
            >
              {ESTADOS.map((est) => (
                <option key={est.value} value={est.value}>
                  {est.label}
                </option>
              ))}
            </select>
          </div>

          <AdminButton
            variant="secondary"
            icon={Filter}
            onClick={() => fetchData()}
            className="w-full md:w-auto justify-center"
          >
            Filtrar
          </AdminButton>
        </div>
      </AdminCard>

      {/* Tabla */}
      <AdminCard className="overflow-hidden !p-0">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-10 h-10 animate-spin text-[#1a365d]" />
              <span className="mt-4 text-gray-600 font-medium">
                Cargando documentos...
              </span>
            </div>
          ) : (
            <div className="min-w-[800px]">
              <AdminTable
                columns={columns}
                data={documentos}
                isLoading={false}
                actions={actions}
                emptyMessage={
                  error
                    ? "Error al cargar los documentos"
                    : documentos.length === 0
                      ? "No se encontraron documentos. Sube documentos desde el formulario público."
                      : "No se encontraron documentos con esos filtros"
                }
                pagination={{
                  currentPage: filters.page,
                  totalPages: stats ? Math.ceil(stats.totalDocumentos / 20) : 1,
                  onPageChange: (page) => handleFilterChange("page", page),
                }}
              />
            </div>
          )}
        </div>
      </AdminCard>

      {toast && <AdminToast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default AdminDocumentos;
