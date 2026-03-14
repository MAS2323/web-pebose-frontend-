import React, { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { AdminButton } from "./AdminButton";

export const AdminImageUpload = ({
  value,
  onChange,
  preview = null,
  className = "",
  aspectRatio = "16/9",
  maxSize = "10MB",
  accept = "image/*",
}) => {
  const [previewUrl, setPreviewUrl] = useState(preview);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFileChange = (file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onChange(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileChange(file);
    }
  };

  const clearImage = () => {
    setPreviewUrl(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={className}>
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        className={`
          relative border-2 border-dashed rounded-xl overflow-hidden cursor-pointer
          transition-all duration-200
          ${isDragging ? "border-[#5D1A1A] bg-[#5D1A1A]/5" : "border-gray-300 hover:border-gray-400"}
          ${previewUrl ? "aspect-auto" : ""}
        `}
        style={previewUrl ? {} : { aspectRatio }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={(e) => handleFileChange(e.target.files[0])}
          className="hidden"
        />

        {previewUrl ? (
          <div className="relative group">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <AdminButton
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  clearImage();
                }}
              >
                <X className="w-5 h-5" />
              </AdminButton>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <Upload className="w-8 h-8" />
            </div>
            <p className="text-sm font-medium">
              Arrastra una imagen o haz clic
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PNG, JPG, WebP hasta {maxSize}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
