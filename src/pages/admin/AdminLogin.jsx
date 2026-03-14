import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { School, Lock, User } from "lucide-react";
import { AdminInput } from "../../components/admin/ui/AdminInput";
import { AdminButton } from "../../components/admin/ui/AdminButton";
import { useAuth } from "../../hook/admin/useAuth";

export const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { handleLogin, isLoading, error } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(credentials.username, credentials.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5D1A1A] to-[#3d1212] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#5D1A1A] rounded-xl flex items-center justify-center mx-auto mb-4">
            <School className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">PEBOSE Admin</h1>
          <p className="text-gray-500 mt-1">Inicia sesión para continuar</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <AdminInput
            label="Usuario"
            icon={User}
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            required
            autoFocus
          />

          <AdminInput
            label="Contraseña"
            icon={Lock}
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            required
          />

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <AdminButton type="submit" isLoading={isLoading} className="w-full">
            Iniciar sesión
          </AdminButton>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          ¿Olvidaste tu contraseña? Contacta al administrador
        </p>
      </div>
    </div>
  );
};
