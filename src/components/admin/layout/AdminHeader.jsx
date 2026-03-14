import React from "react";
import { Bell, User } from "lucide-react";
import { useAdmin } from "../../../context/AdminContext";

export const AdminHeader = () => {
  const { user } = useAdmin();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          {new Date().toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-400 hover:text-gray-600">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="w-10 h-10 rounded-full bg-[#5D1A1A] flex items-center justify-center text-white font-medium">
            {user?.username?.[0]?.toUpperCase() || <User className="w-5 h-5" />}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">
              {user?.username || "Admin"}
            </p>
            <p className="text-xs text-gray-500">
              {user?.role || "Administrador"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
