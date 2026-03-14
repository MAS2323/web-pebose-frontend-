import React, { useState, useEffect } from "react";
import {
  Upload,
  X,
  ImageIcon,
  Loader2,
  Trash2,
  Eye,
  Check,
} from "lucide-react";

import { API } from "../../../config/api";
export const SlideForm = ({
  slide,
  onSubmit,
  onCancel,
  isLoading,
  uploadImage,
}) => {
  const [formData, setFormData] = useState({
    titulo: "",
    subtitulo: "",
    descripcion: "",
    imagen_url: "",
    imagen_public_id: "",
    orden: 0,
    activo: true,
    boton_texto: "Conoce más",
    boton_link: "#modalidades",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [deletingImage, setDeletingImage] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (slide) {
      setFormData({
        titulo: slide.titulo || "",
        subtitulo: slide.subtitulo || "",
        descripcion: slide.descripcion || "",
        imagen_url: slide.imagen_url || "",
        imagen_public_id: slide.imagen_public_id || "",
        orden: slide.orden || 0,
        activo: slide.activo ?? true,
        boton_texto: slide.boton_texto || "Conoce más",
        boton_link: slide.boton_link || "#modalidades",
      });
      setPreviewImage(slide.imagen_url);
    }
  }, [slide]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Drag & Drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  // Subir imagen a Cloudinary
  const handleImageUpload = async (file) => {
    if (!file) return;

    // Validaciones
    if (!file.type.startsWith("image/")) {
      alert("Por favor selecciona una imagen válida (JPG, PNG, WebP)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("La imagen no debe superar los 5MB");
      return;
    }

    // Preview local inmediato
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);

    setUploading(true);
    try {
      // Usar la función del hook para subir
      const result = await uploadImage(file);

      // Guardar URL y public_id
      setFormData((prev) => ({
        ...prev,
        imagen_url: result.url,
        imagen_public_id: result.public_id,
      }));

      console.log("✅ Imagen lista:", result);
    } catch (error) {
      console.error("❌ Error subiendo:", error);
      alert("Error al subir imagen: " + error.message);
      setPreviewImage(null);
    } finally {
      setUploading(false);
    }
  };

  // Eliminar imagen de Cloudinary
  const handleDeleteImage = async () => {
    if (!formData.imagen_public_id) {
      // Solo limpiar estado local si no hay public_id
      setPreviewImage(null);
      setFormData((prev) => ({
        ...prev,
        imagen_url: "",
        imagen_public_id: "",
      }));
      return;
    }

    if (
      !confirm(
        "¿Eliminar esta imagen de Cloudinary? Esta acción no se puede deshacer.",
      )
    ) {
      return;
    }

    setDeletingImage(true);
    try {
      // Llamar al endpoint de eliminación
      const encodedId = encodeURIComponent(formData.imagen_public_id);
      const response = await fetch(`${API}/api/hero/images/${encodedId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Error al eliminar");
      }

      const result = await response.json();
      console.log("🗑️ Imagen eliminada:", result);

      // Limpiar estado
      setPreviewImage(null);
      setFormData((prev) => ({
        ...prev,
        imagen_url: "",
        imagen_public_id: "",
      }));
    } catch (error) {
      console.error("❌ Error eliminando:", error);
      alert("Error al eliminar imagen: " + error.message);
    } finally {
      setDeletingImage(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.imagen_url || !formData.imagen_public_id) {
      alert("Debes subir una imagen primero");
      return;
    }

    if (!formData.titulo.trim()) {
      alert("El título es obligatorio");
      return;
    }

    console.log("📤 Enviando:", formData);
    onSubmit(formData, slide?.id);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* SECCIÓN DE IMAGEN */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Imagen del Slide *
        </label>

        {previewImage ? (
          <div className="relative w-full rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm group">
            {/* Imagen Preview */}
            <div className="relative aspect-video bg-gray-100">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />

              {/* Overlay con acciones */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-3">
                  {/* Ver imagen */}
                  <a
                    href={formData.imagen_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                    title="Ver imagen en tamaño completo"
                  >
                    <Eye className="w-5 h-5" />
                  </a>

                  {/* Eliminar imagen */}
                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    disabled={deletingImage}
                    className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg disabled:opacity-50"
                    title="Eliminar de Cloudinary"
                  >
                    {deletingImage ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Badge de éxito */}
              <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-lg">
                <Check className="w-3.5 h-3.5" />
                <span>En Cloudinary</span>
              </div>

              {/* Loading overlay */}
              {uploading && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
                  <Loader2 className="w-10 h-10 text-white animate-spin mb-3" />
                  <span className="text-white text-sm font-medium">
                    Subiendo a Cloudinary...
                  </span>
                </div>
              )}
            </div>

            {/* Info técnica */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 space-y-1">
              <p
                className="text-xs text-gray-600 truncate font-mono"
                title={formData.imagen_url}
              >
                URL: {formData.imagen_url}
              </p>
              <p
                className="text-xs text-gray-500 truncate font-mono"
                title={formData.imagen_public_id}
              >
                ID: {formData.imagen_public_id}
              </p>
            </div>
          </div>
        ) : (
          /* Área de Upload */
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-xl p-10 transition-all duration-200 ${
              dragActive
                ? "border-[#6B7B5F] bg-[#6B7B5F]/5 scale-[1.02]"
                : "border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => handleImageUpload(e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={uploading}
            />
            <div className="text-center">
              <div
                className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-colors ${
                  dragActive ? "bg-[#6B7B5F]/10" : "bg-white"
                } shadow-sm`}
              >
                {uploading ? (
                  <Loader2 className="w-10 h-10 text-[#6B7B5F] animate-spin" />
                ) : (
                  <ImageIcon
                    className={`w-10 h-10 ${dragActive ? "text-[#6B7B5F]" : "text-gray-400"}`}
                  />
                )}
              </div>
              <p className="text-base font-medium text-gray-700 mb-1">
                {uploading
                  ? "Subiendo..."
                  : dragActive
                    ? "Suelta la imagen aquí"
                    : "Arrastra una imagen o haz clic para seleccionar"}
              </p>
              <p className="text-sm text-gray-500">JPG, PNG o WebP • Máx 5MB</p>
            </div>
          </div>
        )}
      </div>

      {/* CAMPOS DEL FORMULARIO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Título *
          </label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B7B5F] focus:border-transparent outline-none transition-all"
            placeholder="Ej: Educación de Excelencia"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Subtítulo
          </label>
          <input
            type="text"
            name="subtitulo"
            value={formData.subtitulo}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B7B5F] focus:border-transparent outline-none transition-all"
            placeholder="Ej: para el Futuro"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Descripción
          </label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B7B5F] focus:border-transparent outline-none transition-all resize-none"
            placeholder="Descripción breve del slide..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Orden
          </label>
          <input
            type="number"
            name="orden"
            value={formData.orden}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B7B5F] focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="flex items-center pt-7">
          <input
            type="checkbox"
            name="activo"
            checked={formData.activo}
            onChange={handleChange}
            className="w-5 h-5 text-[#6B7B5F] border-gray-300 rounded focus:ring-[#6B7B5F] cursor-pointer"
          />
          <label className="ml-2.5 text-sm font-medium text-gray-700 cursor-pointer select-none">
            Slide activo (visible en el sitio)
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Texto del botón
          </label>
          <input
            type="text"
            name="boton_texto"
            value={formData.boton_texto}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B7B5F] focus:border-transparent outline-none transition-all"
            placeholder="Conoce más"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Link del botón
          </label>
          <input
            type="text"
            name="boton_link"
            value={formData.boton_link}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B7B5F] focus:border-transparent outline-none transition-all"
            placeholder="#modalidades"
          />
        </div>
      </div>

      {/* BOTONES */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
          disabled={isLoading || uploading || deletingImage}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={
            isLoading || !formData.imagen_url || uploading || deletingImage
          }
          className="px-6 py-2.5 bg-[#6B7B5F] text-white rounded-lg hover:bg-[#5a6a4f] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Guardando...
            </>
          ) : slide ? (
            "Actualizar Slide"
          ) : (
            "Crear Slide"
          )}
        </button>
      </div>
    </form>
  );
};
