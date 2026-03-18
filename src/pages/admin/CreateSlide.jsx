// frontend/src/pages/admin/CreateSlide.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react";
import { API } from "../../config/api";

export const CreateSlide = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
    subtitulo: "",
    orden: 0,
    activo: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

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

    // Validar tipo
    if (!file.type.match("image.*")) {
      setError("Solo se permiten imágenes: JPG, PNG, WebP");
      return;
    }

    // Validar tamaño (máx 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("La imagen no puede superar 5MB");
      return;
    }

    setError(null);
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.titulo.trim()) {
      setError("El título es obligatorio");
      return;
    }

    if (!imageFile) {
      setError("La imagen es obligatoria");
      return;
    }

    try {
      setUploading(true);
      setError(null);

      // ✅ Crear FormData para enviar al backend
      const slideData = new FormData();
      slideData.append("titulo", formData.titulo);
      slideData.append("subtitulo", formData.subtitulo);
      slideData.append("orden", formData.orden);
      slideData.append("activo", formData.activo);
      slideData.append("imagen", imageFile); // ← Campo 'imagen' (como espera multer)

      // ✅ Obtener token
      const token = localStorage.getItem("token");

      // ✅ Enviar al backend
      const response = await fetch(`${API}/api/hero/slides`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // ⚠️ NO poner Content-Type, el navegador lo hace automático con FormData
        },
        body: slideData,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Error creando slide");
      }

      const result = await response.json();
      console.log("✅ Slide creado:", result);

      // Limpiar preview
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }

      navigate("/admin/hero");
    } catch (err) {
      console.error("❌ Error en submit:", err);
      setError(err.message || "Error al crear el slide");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setPreview(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin/hero")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al Hero Slider
          </button>

          <h1 className="text-3xl font-bold text-gray-900">
            Crear Nuevo Slide
          </h1>
          <p className="text-gray-600 mt-2">
            Agrega una nueva imagen al carrusel principal del sitio web
          </p>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6"
        >
          {/* Preview de Imagen */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Imagen del slide *
            </label>

            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer
                ${
                  preview
                    ? "border-[#6B7B5F]/50 bg-[#6B7B5F]/5"
                    : "border-gray-300 hover:border-[#6B7B5F] hover:bg-gray-50"
                }`}
              onClick={() =>
                !preview && document.getElementById("imageInput").click()
              }
            >
              <input
                id="imageInput"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileSelect}
                className="hidden"
                disabled={uploading}
              />

              {preview ? (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-64 mx-auto rounded-lg object-cover shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage();
                    }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    {imageFile?.name}
                  </p>
                </div>
              ) : (
                <div>
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-sm text-gray-600 font-medium">
                    Click para seleccionar una imagen
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    JPG, PNG o WebP • Máx 5MB
                  </p>
                </div>
              )}
            </div>

            {error && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <X className="w-4 h-4" />
                {error}
              </p>
            )}
          </div>

          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título *
            </label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Ej: Educación de Excelencia"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B7B5F] focus:border-transparent outline-none transition"
              required
              maxLength={100}
              disabled={uploading}
            />
            <p className="text-xs text-gray-400 mt-1">
              {formData.titulo.length}/100 caracteres
            </p>
          </div>

          {/* Subtítulo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subtítulo
            </label>
            <textarea
              name="subtitulo"
              value={formData.subtitulo}
              onChange={handleChange}
              placeholder="Ej: Formando líderes con valores desde 2014"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B7B5F] focus:border-transparent outline-none transition resize-none"
              maxLength={200}
              disabled={uploading}
            />
            <p className="text-xs text-gray-400 mt-1">
              {formData.subtitulo.length}/200 caracteres
            </p>
          </div>

          {/* Orden y Activo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Orden de visualización
              </label>
              <input
                type="number"
                name="orden"
                value={formData.orden}
                onChange={handleChange}
                min={0}
                max={99}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B7B5F] focus:border-transparent outline-none transition"
                disabled={uploading}
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="activo"
                  checked={formData.activo}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#6B7B5F] border-gray-300 rounded focus:ring-[#6B7B5F]"
                  disabled={uploading}
                />
                <span className="text-sm text-gray-700">Slide activo</span>
              </label>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate("/admin/hero")}
              disabled={uploading}
              className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={uploading || !formData.titulo.trim() || !imageFile}
              className="flex items-center gap-2 px-6 py-2 bg-[#6B7B5F] text-white rounded-lg hover:bg-[#5a6a4f] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Subiendo y creando...
                </>
              ) : (
                "Crear Slide"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSlide;
