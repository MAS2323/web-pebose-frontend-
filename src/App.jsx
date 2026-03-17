import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AdminProvider, useAdmin } from "./context/AdminContext";

// Páginas públicas existentes
import Home from "./pages/Home";
import CEEP from "./pages/CEEP";
import EspecialidadDetalle from "./components/ceep/EspecialidadDetalle";

// Admin
import { AdminLayout } from "./components/admin/layout/AdminLayout";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminHero } from "./pages/admin/AdminHero";
import { AdminEspecialidades } from "./pages/admin/AdminEspecialidades";
import { AdminCEEP } from "./pages/admin/AdminCEEP";
import { AdminContactos } from "./pages/admin/AdminContactos";
import { AdminConfig } from "./pages/admin/AdminConfig";
import CreateSlide from "./pages/admin/CreateSlide";
import { EditSlide } from "./pages/admin/EditSlide";
import { EspecialidadForm } from "./components/admin/forms/EspecialidadForm";
import AdminDocumentos from "./components/admin/layout/AdminDocumentos";

// Componente para proteger rutas de admin
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAdmin();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5D1A1A]" />
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

// Componente para redirigir si ya está autenticado
const PublicAdminRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAdmin();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5D1A1A]" />
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/admin/dashboard" /> : children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas del sitio web (existentes) */}
      <Route path="/" element={<Home />} />
      <Route path="/ceep" element={<CEEP />} />
      <Route path="/ceep/especialidad/:id" element={<EspecialidadDetalle />} />
      {/* Rutas del Admin */}
      <Route
        path="/admin/login"
        element={
          <PublicAdminRoute>
            <AdminLogin />
          </PublicAdminRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="hero" element={<AdminHero />} />
        <Route path="ceep" element={<AdminCEEP />} />
        <Route path="contactos" element={<AdminContactos />} />
        <Route path="config" element={<AdminConfig />} />
        <Route path="hero/nuevo" element={<CreateSlide />} />{" "}
        {/* ← NUEVA RUTA */}
        <Route path="hero/editar/:id" element={<EditSlide />} />
      </Route>
      {/* ✅ Especialidades - NUEVAS RUTAS */}
      <Route path="especialidades" element={<AdminEspecialidades />} />
      <Route path="especialidades/nuevo" element={<EspecialidadForm />} />{" "}
      {/* ← CREAR */}
      <Route
        path="especialidades/editar/:id"
        element={<EspecialidadForm />}
      />{" "}
      {/* ← EDITAR */}
      {/* Redirección 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
      {/* Documentos CEEP */}
      <Route path="documentos" element={<AdminDocumentos />} />
    </Routes>
  );
}

function App() {
  return (
    <AdminProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AdminProvider>
  );
}

export default App;
