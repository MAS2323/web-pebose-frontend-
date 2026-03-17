// frontend/src/services/cloudinary.js
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export const uploadImage = async (file, folder = "pebose") => {
  if (!file) throw new Error("No file provided");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error uploading image");
  }

  const data = await response.json();
  return {
    url: data.secure_url,
    public_id: data.public_id,
  };
};

export default uploadImage;
