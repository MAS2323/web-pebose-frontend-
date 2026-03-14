import React, { useEffect, useState } from "react";
import {
  Users,
  GraduationCap,
  MessageSquare,
  TrendingUp,
  Eye,
} from "lucide-react";
import { AdminCard } from "../../components/admin/ui/AdminCard";
import { AdminButton } from "../../components/admin/ui/AdminButton";
import { API } from "../../config/api";
import axios from "axios";
const statsCards = [
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

export const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(API.admin.stats);
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <AdminButton variant="secondary" icon={TrendingUp}>
          Ver reportes
        </AdminButton>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminCard title="Actividad reciente" icon={TrendingUp}>
          <div className="space-y-4">
            <p className="text-gray-500 text-sm">Próximamente...</p>
          </div>
        </AdminCard>

        <AdminCard title="Accesos rápidos" icon={Eye}>
          <div className="grid grid-cols-2 gap-3">
            <AdminButton
              variant="secondary"
              onClick={() => window.open("/", "_blank")}
            >
              Ver sitio web
            </AdminButton>
            <AdminButton
              variant="secondary"
              onClick={() => window.open("/admin/hero", "_self")}
            >
              Editar Hero
            </AdminButton>
          </div>
        </AdminCard>
      </div>
    </div>
  );
};
