import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Image,
  GraduationCap,
  MessageSquare,
  Settings,
  LogOut,
  School,
} from "lucide-react";
import { useAdmin } from "../../../context/AdminContext";

const menuItems = [
  { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/admin/hero", icon: Image, label: "Hero Slider" },
  {
    path: "/admin/especialidades",
    icon: GraduationCap,
    label: "Especialidades",
  },
  { path: "/admin/ceep", icon: School, label: "CEEP" },
  { path: "/admin/contactos", icon: MessageSquare, label: "Contactos" },
  { path: "/admin/config", icon: Settings, label: "Configuración" },
];

export const AdminSidebar = () => {
  const { logout } = useAdmin();
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#5D1A1A] text-white flex flex-col">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold">PEBOSE Admin</h1>
        <p className="text-xs text-white/60 mt-1">Panel de administración</p>
      </div>

      <nav className="flex-1 py-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-6 py-3 transition-colors
              ${isActive ? "bg-white/10 border-r-4 border-[#6B7B5F]" : "hover:bg-white/5"}
            `}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-6 py-3 w-full hover:bg-white/5 rounded-lg transition-colors text-white/80 hover:text-white"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};
