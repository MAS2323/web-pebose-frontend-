import React, { useState, useEffect } from "react";
import { Mail, CheckCircle, XCircle, Clock } from "lucide-react";
import { AdminCard } from "../../components/admin/ui/AdminCard";
import { AdminButton } from "../../components/admin/ui/AdminButton";
import { AdminTable } from "../../components/admin/ui/AdminTable";
import { AdminToast } from "../../components/admin/ui/AdminToast";
import api from "../../services/admin/api";

export const AdminContactos = () => {
  const [contactos, setContactos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchContactos();
  }, []);

  const fetchContactos = async () => {
    try {
      const response = await api.get("/contacto/");
      setContactos(response.data);
    } catch (error) {
      showToast("error", "Error al cargar contactos");
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case "nuevo":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "contactado":
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case "convertido":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <XCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const columns = [
    {
      key: "created_at",
      title: "Fecha",
      render: (date) => new Date(date).toLocaleDateString("es-ES"),
    },
    { key: "nombre", title: "Nombre" },
    { key: "email", title: "Email" },
    { key: "telefono", title: "Teléfono" },
    { key: "modalidad", title: "Modalidad" },
    {
      key: "estado",
      title: "Estado",
      render: (estado) => (
        <div className="flex items-center gap-2">
          {getEstadoIcon(estado)}
          <span className="capitalize">{estado}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Contactos</h1>
        <div className="flex gap-2">
          <AdminButton variant="secondary">Exportar</AdminButton>
          <AdminButton icon={Mail}>Nuevo mensaje</AdminButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {["nuevo", "contactado", "convertido", "descartado"].map((estado) => (
          <AdminCard key={estado} className="!p-4">
            <div className="flex items-center gap-3">
              {getEstadoIcon(estado)}
              <div>
                <p className="text-2xl font-bold">
                  {contactos.filter((c) => c.estado === estado).length}
                </p>
                <p className="text-sm text-gray-500 capitalize">{estado}</p>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>

      <AdminCard>
        <AdminTable
          columns={columns}
          data={contactos}
          isLoading={isLoading}
          emptyMessage="No hay contactos registrados"
        />
      </AdminCard>

      {toast && <AdminToast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default AdminContactos;
