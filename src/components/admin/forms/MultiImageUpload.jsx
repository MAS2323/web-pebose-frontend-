import React, { useState } from "react";
import { Upload, X, ImagePlus, Loader2 } from "lucide-react";

export const MultiImageUpload = ({ onImagesUploaded, maxImages = 10 }) => {
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length + previews.length > maxImages) {
      alert(`Máximo ${maxImages} imágenes`);
      return;
    }

    // Validar
    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        alert(`${file.name} no es una imagen válida`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} supera los 5MB`);
        return false;
      }
      return true;
    });

    // Crear previews locales
    const newPreviews = await Promise.all(
      validFiles.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () =>
            resolve({
              file,
              preview: reader.result,
              uploading: true,
              url: null,
              error: null,
            });
          reader.readAsDataURL(file);
        });
      }),
    );

    setPreviews((prev) => [...prev, ...newPreviews]);

    // Subir todas
    await uploadImages(newPreviews);
  };

  const uploadImages = async (imagePreviews) => {
    setUploading(true);
    const formData = new FormData();

    imagePreviews.forEach((img) => {
      formData.append("files", img.file);
    });

    try {
      const response = await fetch(
        "http://localhost:8000/api/images/upload-multiple",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) throw new Error("Error al subir");

      const data = await response.json();

      // Actualizar previews con URLs reales
      setPreviews((prev) => {
        let uploadIndex = 0;
        return prev.map((p) => {
          if (p.uploading && !p.url) {
            const uploaded = data.images[uploadIndex];
            uploadIndex++;
            return {
              ...p,
              uploading: false,
              url: uploaded?.url || null,
              error: uploaded ? null : "Error",
              public_id: uploaded?.public_id,
            };
          }
          return p;
        });
      });

      // Notificar al padre
      onImagesUploaded(data.images);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error al subir imágenes");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Imágenes ({previews.length}/{maxImages})
      </label>

      {/* Grid de imágenes */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {previews.map((img, index) => (
          <div
            key={index}
            className="relative aspect-video rounded-lg overflow-hidden border-2 border-gray-200 group"
          >
            <img
              src={img.preview}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Overlay de carga */}
            {img.uploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              </div>
            )}

            {/* Botón eliminar */}
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Check de éxito */}
            {img.url && !img.uploading && (
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}

        {/* Botón añadir más */}
        {previews.length < maxImages && (
          <label className="aspect-video rounded-lg border-2 border-dashed border-gray-300 hover:border-[#6B7B5F] hover:bg-gray-50 flex flex-col items-center justify-center cursor-pointer transition-colors">
            <ImagePlus className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">Añadir</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
          </label>
        )}
      </div>

      {uploading && (
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Subiendo imágenes...
        </p>
      )}
    </div>
  );
};
