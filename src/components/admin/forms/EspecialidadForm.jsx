// frontend/src/pages/admin/EspecialidadForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react";
import { especialidadService } from "../../../services/admin/especialidadService";

const CATEGORIAS = [
  "Salud",
  "Administración",
  "Comercio",
  "Tecnología",
  "Servicios",
  "Idiomas",
  "Técnica",
  "Diseño",
  "Otros",
];

const AVAILABLE_ICONS = [
  "Stethoscope",
  "FlaskConical",
  "Calculator",
  "Landmark",
  "Users2",
  "FileText",
  "BookOpen",
  "Briefcase",
  "Monitor",
  "Sparkles",
  "GraduationCap",
  "Wrench",
  "Hammer",
  "Zap",
  "Flame",
  "Scissors",
  "Paintbrush",
  "ChefHat",
  "Pill",
  "Globe",
];

export const EspecialidadForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    duracion: "",
    icono: "GraduationCap",
    descripcion: "",
    imagen: null,
    imagen_url: "",
    modulos: [""],
    salidaLaboral: [""],
    requisitos: [""],
    horarios: [""],
    precio: "Consultar en administración",
    proximoInicio: "",
    orden: 0,
    activo: true,
    destacado: false,
  });

  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(isEditing);

  // Cargar datos si es edición
  useEffect(() => {
    if (isEditing) {
      fetchEspecialidad();
    }
  }, [id]);

  const fetchEspecialidad = async () => {
    try {
      setLoading(true);
      const response = await especialidadService.getById(id);
      const esp = response.data;

      setFormData({
        nombre: esp.nombre || "",
        categoria: esp.categoria || "",
        duracion: esp.duracion || "",
        icono: esp.icono || "GraduationCap",
        descripcion: esp.descripcion || "",
        imagen: null,
        imagen_url: esp.imagen_url || "",
        modulos: esp.modulos?.length ? esp.modulos : [""],
        salidaLaboral: esp.salidaLaboral?.length ? esp.salidaLaboral : [""],
        requisitos: esp.requisitos?.length ? esp.requisitos : [""],
        horarios: esp.horarios?.length ? esp.horarios : [""],
        precio: esp.precio || "Consultar en administración",
        proximoInicio: esp.proximoInicio || "",
        orden: esp.orden || 0,
        activo: esp.activo ?? true,
        destacado: esp.destacado ?? false,
      });
      setPreview(esp.imagen_url || null);
    } catch (err) {
      console.error("❌ Error cargando especialidad:", err);
      setError("No se pudo cargar la especialidad");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.match("image.*")) {
      setError("Solo imágenes: JPG, PNG, WebP");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Máximo 5MB");
      return;
    }
    setError(null);
    setFormData((prev) => ({ ...prev, imagen: file }));
    setPreview(URL.createObjectURL(file));
  };

  const uploadToCloudinary = async (file) => {
    const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!CLOUD_NAME || !PRESET) {
      throw new Error("Configura Cloudinary en .env.local");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", PRESET);
    formData.append("folder", "pebose/especialidades");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData },
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Error subiendo imagen");
    }

    return await response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.nombre.trim() ||
      !formData.categoria ||
      !formData.descripcion.trim()
    ) {
      setError("Nombre, categoría y descripción son obligatorios");
      return;
    }

    try {
      setUploading(true);
      setError(null);

      let imagen_url = formData.imagen_url;

      if (formData.imagen) {
        const result = await uploadToCloudinary(formData.imagen);
        imagen_url = result.secure_url;
      } else if (!imagen_url && !isEditing) {
        throw new Error("La imagen es obligatoria");
      }

      const cleanArray = (arr) => arr.map((v) => v?.trim()).filter((v) => v);

      const dataToSend = {
        ...formData,
        imagen_url,
        modulos: cleanArray(formData.modulos),
        salidaLaboral: cleanArray(formData.salidaLaboral),
        requisitos: cleanArray(formData.requisitos),
        horarios: cleanArray(formData.horarios),
      };

      // Eliminar undefined
      Object.keys(dataToSend).forEach((key) => {
        if (dataToSend[key] === undefined || dataToSend[key] === null) {
          delete dataToSend[key];
        }
      });

      if (isEditing) {
        await especialidadService.update(id, dataToSend);
      } else {
        await especialidadService.create(dataToSend);
      }

      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
      navigate("/admin/especialidades");
    } catch (err) {
      console.error("❌ Error:", err);
      setError(err.message || "Error al guardar");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#6B7B5F] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate("/admin/especialidades")}
          className="flex items-center gap-2 text-gray-600 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>

        <h1 className="text-2xl font-bold mb-6">
          {isEditing ? "Editar" : "Nueva"} Especialidad
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl p-6 space-y-4"
        >
          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium mb-1">Imagen *</label>
            <div
              className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer ${preview ? "border-[#6B7B5F]" : "border-gray-300"}`}
              onClick={() =>
                !preview && document.getElementById("imgInput")?.click()
              }
            >
              <input
                id="imgInput"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              {preview ? (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-40 mx-auto rounded"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreview(null);
                      setFormData((p) => ({ ...p, imagen: null }));
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="py-4">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Click para subir imagen
                  </p>
                </div>
              )}
            </div>
            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
          </div>

          {/* Nombre y Categoría */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre *</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Categoría *
              </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded bg-white"
                required
              >
                <option value="">Seleccionar</option>
                {CATEGORIAS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Duración e Icono */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Duración *
              </label>
              <input
                type="text"
                name="duracion"
                value={formData.duracion}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Icono</label>
              <select
                name="icono"
                value={formData.icono}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded bg-white"
              >
                {AVAILABLE_ICONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Descripción *
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate("/admin/especialidades")}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2 bg-[#6B7B5F] text-white rounded hover:bg-[#5a6a4f] disabled:opacity-50"
            >
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {uploading ? "Guardando..." : isEditing ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EspecialidadForm;
