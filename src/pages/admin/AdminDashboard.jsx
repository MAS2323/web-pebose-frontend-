// frontend/src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Users,
  GraduationCap,
  MessageSquare,
  TrendingUp,
  Eye,
  Download,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Trash2,
} from "lucide-react";
import { AdminCard } from "../../components/admin/ui/AdminCard";
import { AdminButton } from "../../components/admin/ui/AdminButton";
import { API } from "../../config/api";
import axios from "axios";

// ... (Mismas constantes statsCards, CATEGORIAS_DOC, ESTADOS_DOC de antes) ...
const statsCards = [
  /* ... mantén tus constantes ... */
  {
    key: "contactos_pendientes",
    label: "Contactos Pendientes",
    icon: MessageSquare,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
  },
  {
    key: "inscripciones_mes",
    label: "Inscripciones este mes",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    key: "visitas_web",
    label: "Visitas web",
    icon: Eye,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    key: "especialidades_activas",
    label: "Especialidades activas",
    icon: GraduationCap,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
];
const CATEGORIAS_DOC = [
  { value: "", label: "Todas" },
  { value: "documentacion_personal", label: "Documentación Personal" },
  { value: "credenciales", label: "Credenciales" },
  { value: "certificados", label: "Certificados" },
  { value: "solicitud_inscripcion", label: "Solicitud Inscripción" },
  { value: "otros", label: "Otros" },
];
const ESTADOS_DOC = [
  { value: "", label: "Todos" },
  { value: "pendiente", label: "Pendiente" },
  { value: "revisado", label: "Revisado" },
  { value: "aprobado", label: "Aprobado" },
  { value: "rechazado", label: "Rechazado" },
];

export const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [documentos, setDocumentos] = useState([]);
  const [docLoading, setDocLoading] = useState(false);
  const [docFilters, setDocFilters] = useState({
    search: "",
    categoria: "",
    estado: "",
  });

  useEffect(() => {
    fetchStats();
    fetchDocumentos();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(response.data?.data?.stats || {});
    } catch (error) {
      console.error("❌ Error stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDocumentos = async () => {
    setDocLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API}/api/documentos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Error al obtener documentos");
      const data = await response.json();
      setDocumentos(data.documentos || []);
    } catch (error) {
      console.error("💥 Error docs:", error);
    } finally {
      setDocLoading(false);
    }
  };

  // ✅ FUNCIÓN MAESTRA DE URL: Prioriza la URL guardada, fallback a construcción manual
  const getCloudinaryUrl = (doc) => {
    // 1. Si la BD tiene la URL completa de Cloudinary (gracias a la corrección del backend), ÚSALA.
    if (doc.url && doc.url.includes("cloudinary.com")) {
      return doc.url;
    }

    // 2. Fallback: Construir URL si falta (para archivos antiguos o si falla lo anterior)
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    if (!cloudName) return "#";

    const extension = doc.nombreOriginal
      ? doc.nombreOriginal.split(".").pop().toLowerCase()
      : "";
    const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(extension);
    const resourceType = isImage ? "image" : "raw";

    // Intentar usar publicId. Si es un hash raro de multer, probablemente falle, pero es lo que hay.
    let publicId = doc.publicId || doc.nombreServidor;

    // Limpieza básica: si el publicId tiene extensión, quítala para añadirla luego uniforme
    if (publicId && publicId.includes(".")) {
      publicId = publicId.substring(0, publicId.lastIndexOf("."));
    }

    // Construcción final AÑADIENDO la extensión explícita (CRUCIAL para raw)
    return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${publicId}${extension ? "." + extension : ""}`;
  };

  const handleView = (doc) => {
    const url = getCloudinaryUrl(doc);
    console.log("👁️ Abriendo:", url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleDownload = async (doc) => {
    const url = getCloudinaryUrl(doc);
    console.log("⬇️ Descargando:", url);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Fallo red");
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = doc.nombreOriginal;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("❌ Error blob, abriendo directa:", error);
      window.open(url, "_blank");
    }
  };

  const handleUpdateStatus = async (id, nuevoEstado) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${API}/api/documentos/${id}`,
        { estado: nuevoEstado },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchDocumentos();
      alert("Estado actualizado");
    } catch (error) {
      alert("Error al actualizar");
    }
  };

  const handleDeleteDoc = async (id) => {
    if (!confirm("¿Eliminar permanentemente?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API}/api/documentos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDocumentos();
      alert("Eliminado");
    } catch (error) {
      alert("Error al eliminar");
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getStatusBadge = (estado) => {
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
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${bg} ${text}`}
      >
        <Icon className="w-3 h-3" />{" "}
        {estado?.charAt(0).toUpperCase() + estado?.slice(1)}
      </span>
    );
  };

  const filteredDocs = documentos.filter((doc) => {
    const search = docFilters.search.toLowerCase();
    return (
      (doc.nombreOriginal?.toLowerCase().includes(search) ||
        doc.nombreUsuario?.toLowerCase().includes(search) ||
        doc.email?.toLowerCase().includes(search)) &&
      (docFilters.categoria ? doc.categoria === docFilters.categoria : true) &&
      (docFilters.estado ? doc.estado === docFilters.estado : true)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <AdminButton variant="secondary" icon={TrendingUp}>
          Ver reportes
        </AdminButton>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card) => (
          <AdminCard key={card.key} className="!p-6">
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center`}
              >
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {isLoading ? "-" : stats[card.key] || 0}
                </p>
                <p className="text-sm text-gray-500">{card.label}</p>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>

      {/* Tabla Documentos */}
      <AdminCard title="📁 Gestión de Documentos" icon={FileText}>
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Buscar..."
            value={docFilters.search}
            onChange={(e) =>
              setDocFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            className="flex-1 min-w-[200px] px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1a365d]"
          />
          <select
            value={docFilters.categoria}
            onChange={(e) =>
              setDocFilters((prev) => ({ ...prev, categoria: e.target.value }))
            }
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="">Todas</option>
            {CATEGORIAS_DOC.filter((c) => c.value).map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <select
            value={docFilters.estado}
            onChange={(e) =>
              setDocFilters((prev) => ({ ...prev, estado: e.target.value }))
            }
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="">Todos</option>
            {ESTADOS_DOC.filter((e) => e.value).map((e) => (
              <option key={e.value} value={e.value}>
                {e.label}
              </option>
            ))}
          </select>
          <AdminButton variant="secondary" onClick={fetchDocumentos}>
            🔄 Actualizar
          </AdminButton>
        </div>

        {docLoading ? (
          <div className="py-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-[#1a365d] border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : filteredDocs.length === 0 ? (
          <p className="text-center py-12 text-gray-500">No hay documentos</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left">Documento</th>
                  <th className="px-4 py-3 text-left">Usuario</th>
                  <th className="px-4 py-3 text-left">Categoría</th>
                  <th className="px-4 py-3 text-left">Estado</th>
                  <th className="px-4 py-3 text-left">Fecha</th>
                  <th className="px-4 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDocs.map((doc) => (
                  <tr key={doc._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium truncate max-w-[200px]">
                            {doc.nombreOriginal}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(doc.tamaño)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{doc.nombreUsuario}</p>
                      <p className="text-xs text-gray-500">{doc.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                        {doc.categoria}
                      </span>
                    </td>
                    <td className="px-4 py-3">{getStatusBadge(doc.estado)}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleView(doc)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownload(doc)}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <select
                          value={doc.estado}
                          onChange={(e) =>
                            handleUpdateStatus(doc._id, e.target.value)
                          }
                          className="text-xs border rounded px-2 py-1 bg-white"
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="revisado">Revisado</option>
                          <option value="aprobado">Aprobado</option>
                          <option value="rechazado">Rechazado</option>
                        </select>
                        <button
                          onClick={() => handleDeleteDoc(doc._id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>

      {/* Resto de cards... */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminCard title="Actividad reciente" icon={TrendingUp}>
          <p className="text-gray-500 text-sm">Próximamente...</p>
        </AdminCard>
        <AdminCard title="Accesos rápidos" icon={Eye}>
          <div className="grid grid-cols-2 gap-3">
            <AdminButton
              variant="secondary"
              onClick={() => window.open("/", "_blank")}
            >
              Web
            </AdminButton>
            <AdminButton
              variant="secondary"
              onClick={() => (window.location.href = "/admin/hero")}
            >
              Editar Hero
            </AdminButton>
          </div>
        </AdminCard>
      </div>
    </div>
  );
};
