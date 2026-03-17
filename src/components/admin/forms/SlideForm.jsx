// frontend/src/components/admin/forms/SlideForm.jsx
import React, { useState, useRef, useEffect } from "react";
import { Upload, X, Loader2, Image as ImageIcon, Trash2 } from "lucide-react";

export const SlideForm = ({
  slide = null,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    titulo: "",
    subtitulo: "",
    orden: 0,
    activo: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  // Cargar datos si es edición
  useEffect(() => {
    if (slide) {
      setFormData({
        titulo: slide.titulo || "",
        subtitulo: slide.subtitulo || "",
        orden: slide.orden || 0,
        activo: slide.activo ?? true,
      });
      setPreview(slide.imagen_url || null);
    }
  }, [slide]);

  // Limpiar preview blob al desmontar
  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Manejar cambios en inputs de texto
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Manejar selección de archivo
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo
    if (!file.type.match("image.*")) {
      setUploadError("Solo se permiten imágenes: JPG, PNG, WebP");
      return;
    }

    // Validar tamaño (máx 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("La imagen no puede superar 5MB");
      return;
    }

    setUploadError(null);
    setImageFile(file);

    // Crear preview local
    if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
  };

  // 🔥 Función integrada para subir a Cloudinary (sin dependencias externas)
  const uploadToCloudinary = async (file, folder = "pebose/hero") => {
    const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const CLOUDINARY_UPLOAD_PRESET = import.meta.env
      .VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      throw new Error(
        "Configuración de Cloudinary incompleta.\n" +
          "Agrega en frontend/.env.local:\n" +
          "VITE_CLOUDINARY_CLOUD_NAME=tu_cloud\n" +
          "VITE_CLOUDINARY_UPLOAD_PRESET=tu_preset",
      );
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", folder);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData },
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `Error HTTP ${response.status}`);
    }

    const data = await response.json();
    return {
      url: data.secure_url,
      public_id: data.public_id,
    };
  };

  // Manejar submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadError(null);

    // Validaciones básicas
    if (!formData.titulo.trim()) {
      setUploadError("El título es obligatorio");
      return;
    }

    try {
      let imagen_url = preview;
      let imagen_public_id = slide?.imagen_public_id || "";

      // Si hay imagen nueva, subirla a Cloudinary primero
      if (imageFile) {
        setUploading(true);
        const result = await uploadToCloudinary(imageFile, "pebose/hero");
        imagen_url = result.url;
        imagen_public_id = result.public_id;
        setUploading(false);
      }
      // Si es edición y no se cambió la imagen, mantener la existente
      else if (!preview && !slide?.imagen_url) {
        throw new Error("La imagen es obligatoria para nuevos slides");
      }

      // Preparar datos finales (sin el objeto File)
      const dataToSend = {
        ...formData,
        imagen_url,
        imagen_public_id,
      };

      await onSubmit(dataToSend, slide?.id);

      // Limpiar preview blob si existe
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    } catch (error) {
      console.error("❌ Error en submit:", error);
      setUploadError(error.message || "Error al guardar el slide");
      setUploading(false);
      throw error; // Para que el componente padre lo maneje también
    }
  };

  // Remover imagen seleccionada
  const removeImage = () => {
    setImageFile(null);
    setPreview(slide?.imagen_url || null);
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Trigger del input file desde el botón
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* === SECCIÓN DE IMAGEN (INLINE) === */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Imagen del slide *
        </label>

        <div
          className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer
            ${
              preview
                ? "border-[#6B7B5F]/50 bg-[#6B7B5F]/5"
                : "border-gray-300 hover:border-[#6B7B5F] hover:bg-gray-50"
            }`}
          onClick={triggerFileInput}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />

          {preview ? (
            /* Preview de imagen seleccionada */
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="max-h-48 mx-auto rounded-lg object-cover shadow-sm"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                title="Remover imagen"
                disabled={uploading}
              >
                <X className="w-4 h-4" />
              </button>
              {imageFile && (
                <p className="text-xs text-gray-500 mt-2 truncate px-2">
                  📁 {imageFile.name}
                </p>
              )}
            </div>
          ) : (
            /* Estado vacío - Placeholder para subir */
            <div className="py-4">
              <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Click para seleccionar una imagen
              </p>
              <p className="text-xs text-gray-400 mt-1">
                JPG, PNG o WebP • Máx 5MB
              </p>
            </div>
          )}
        </div>

        {/* Mensajes de estado */}
        {uploadError && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <X className="w-4 h-4" />
            {uploadError}
          </p>
        )}

        {uploading && (
          <div className="flex items-center gap-2 text-sm text-[#6B7B5F]">
            <Loader2 className="w-4 h-4 animate-spin" />
            Subiendo imagen a Cloudinary...
          </div>
        )}
      </div>

      {/* === TÍTULO === */}
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
          disabled={isLoading || uploading}
        />
        <p className="text-xs text-gray-400 mt-1">
          {formData.titulo.length}/100 caracteres
        </p>
      </div>

      {/* === SUBTÍTULO === */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Subtítulo
        </label>
        <textarea
          name="subtitulo"
          value={formData.subtitulo}
          onChange={handleChange}
          placeholder="Ej: Formando líderes con valores desde 2014"
          rows={2}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B7B5F] focus:border-transparent outline-none transition resize-none"
          maxLength={200}
          disabled={isLoading || uploading}
        />
        <p className="text-xs text-gray-400 mt-1">
          {formData.subtitulo.length}/200 caracteres
        </p>
      </div>

      {/* === ORDEN Y ACTIVO (GRID) === */}
      <div className="grid grid-cols-2 gap-4">
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
            disabled={isLoading || uploading}
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
              disabled={isLoading || uploading}
            />
            <span className="text-sm text-gray-700">Slide activo</span>
          </label>
        </div>
      </div>

      {/* === BOTONES DE ACCIÓN === */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading || uploading}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium disabled:opacity-50"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={
            isLoading ||
            uploading ||
            !formData.titulo.trim() ||
            (!preview && !slide?.imagen_url)
          }
          className="flex items-center gap-2 px-6 py-2 bg-[#6B7B5F] text-white rounded-lg hover:bg-[#5a6a4f] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading || uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {uploading ? "Subiendo..." : "Guardando..."}
            </>
          ) : slide ? (
            "Actualizar slide"
          ) : (
            "Crear slide"
          )}
        </button>
      </div>
    </form>
  );
};

export default SlideForm;
