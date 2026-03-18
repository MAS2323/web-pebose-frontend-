// frontend/src/components/ceep/UploadDocumentos.jsx
import React, { useState } from "react";
import {
  Upload,
  X,
  FileText,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { API } from "../../config/api";

const CATEGORIAS = [
  { value: "documentacion_personal", label: "Documentación Personal" },
  { value: "credenciales", label: "Credenciales/Certificados" },
  { value: "certificados", label: "Certificados Académicos" },
  { value: "solicitud_inscripcion", label: "Solicitud de Inscripción" },
  { value: "otros", label: "Otros Documentos" },
];

const TIPOS_PERMITIDOS = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "application/zip",
  "application/x-rar-compressed",
];

export const UploadDocumentos = () => {
  const [formData, setFormData] = useState({
    nombreUsuario: "",
    email: "",
    telefono: "",
    categoria: "",
    especialidad: "",
  });

  const [archivo, setArchivo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo
    if (!TIPOS_PERMITIDOS.includes(file.type)) {
      setError(
        "Tipo de archivo no permitido. Solo: PDF, DOC, DOCX, JPG, PNG, ZIP, RAR",
      );
      return;
    }

    // Validar tamaño (máx 25MB)
    if (file.size > 25 * 1024 * 1024) {
      setError("El archivo no puede superar 25MB");
      return;
    }

    setError(null);
    setArchivo(file);

    // Crear preview para imágenes
    if (file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (
      !formData.nombreUsuario.trim() ||
      !formData.email.trim() ||
      !formData.categoria
    ) {
      setError("Nombre, email y categoría son obligatorios");
      return;
    }

    if (!archivo) {
      setError("Debes seleccionar un archivo para subir");
      return;
    }

    try {
      setUploading(true);
      setError(null);
      setSuccess(false);

      // Crear FormData
      const data = new FormData();
      data.append("documento", archivo);
      data.append("nombreUsuario", formData.nombreUsuario);
      data.append("email", formData.email);
      data.append("telefono", formData.telefono);
      data.append("categoria", formData.categoria);
      if (formData.especialidad) {
        data.append("especialidad", formData.especialidad);
      }

      // Subir al backend
      const response = await fetch(`${API}/api/documentos/upload`, {
        method: "POST",
        body: data,
        // NO poner Content-Type, el navegador lo hace con FormData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error subiendo el documento");
      }

      setSuccess(true);

      // Resetear formulario
      setFormData({
        nombreUsuario: "",
        email: "",
        telefono: "",
        categoria: "",
        especialidad: "",
      });
      setArchivo(null);
      setPreview(null);

      // Limpiar input file
      const fileInput = document.getElementById("documentoInput");
      if (fileInput) fileInput.value = "";
    } catch (err) {
      console.error("❌ Error subiendo documento:", err);
      setError(
        err.message || "Error al subir el documento. Intenta nuevamente.",
      );
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    setArchivo(null);
    setPreview(null);
    setError(null);
    const fileInput = document.getElementById("documentoInput");
    if (fileInput) fileInput.value = "";
  };

  return (
    <section id="subir-documentos" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-[#1a365d]/10 text-[#1a365d] rounded-full text-sm font-semibold mb-4">
            Subida de Documentos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Envía tu Documentación
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sube tus documentos para completar tu proceso de inscripción.
            Archivos seguros y confidenciales.
          </p>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
        >
          {/* Datos del usuario */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre Completo *
              </label>
              <input
                type="text"
                name="nombreUsuario"
                value={formData.nombreUsuario}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a365d] focus:border-transparent outline-none transition"
                required
                disabled={uploading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a365d] focus:border-transparent outline-none transition"
                required
                disabled={uploading}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+240 XXX XXX XXX"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a365d] focus:border-transparent outline-none transition"
                disabled={uploading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Especialidad (opcional)
              </label>
              <input
                type="text"
                name="especialidad"
                value={formData.especialidad}
                onChange={handleChange}
                placeholder="Ej: Enfermería, Contabilidad..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a365d] focus:border-transparent outline-none transition"
                disabled={uploading}
              />
            </div>
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoría del Documento *
            </label>
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a365d] focus:border-transparent outline-none transition bg-white"
              required
              disabled={uploading}
            >
              <option value="">Seleccionar categoría</option>
              {CATEGORIAS.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Upload de archivo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Archivo *
            </label>

            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer
                ${
                  archivo
                    ? "border-[#1a365d]/50 bg-[#1a365d]/5"
                    : "border-gray-300 hover:border-[#1a365d] hover:bg-gray-50"
                }`}
              onClick={() =>
                !archivo && document.getElementById("documentoInput")?.click()
              }
            >
              <input
                id="documentoInput"
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip,.rar"
                onChange={handleFileSelect}
                className="hidden"
                disabled={uploading}
              />

              {archivo ? (
                <div className="relative">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-40 mx-auto rounded-lg object-cover shadow-sm"
                    />
                  ) : (
                    <div className="flex items-center justify-center gap-3 py-4">
                      <FileText className="w-10 h-10 text-[#1a365d]" />
                      <div className="text-left">
                        <p className="font-medium text-gray-900 truncate max-w-xs">
                          {archivo.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {(archivo.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile();
                    }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="py-4">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-sm text-gray-600 font-medium">
                    Click para seleccionar un archivo
                  </p>
                  <p className="text-xs text-gray-400 mt-1">PDF • Máx 25MB</p>
                </div>
              )}
            </div>

            {error && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {error}
              </p>
            )}
          </div>

          {/* Mensajes de estado */}
          {success && (
            <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span>
                ✅ Documento subido exitosamente. Te contactaremos pronto.
              </span>
            </div>
          )}

          {/* Botón de submit */}
          <button
            type="submit"
            disabled={uploading || !archivo || !formData.categoria}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#1a365d] text-white font-semibold rounded-xl hover:bg-[#152c4d] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Subiendo documento...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Subir Documento
              </>
            )}
          </button>

          {/* Notas de seguridad */}
          <p className="text-xs text-gray-500 text-center pt-4 border-t">
            🔒 Tus documentos están protegidos y solo serán visibles para el
            personal autorizado del CEEP.
          </p>
        </form>
      </div>
    </section>
  );
};

export default UploadDocumentos;
