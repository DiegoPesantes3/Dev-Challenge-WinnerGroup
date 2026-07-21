import { useState } from "react";

const ImageUploader = ({ onImageDrop }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      const tiposValidos = ["image/jpeg", "image/png", "image/webp"];
      if (!tiposValidos.includes(file.type)) {
        alert("Formato no válido. Por favor sube solo imágenes.");
        return;
      }

      onImageDrop(file);
    }
  };

  return (
    <div
      className={`mt-8 w-full max-w-lg p-12 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
        isDragging
          ? "border-indigo-500 bg-indigo-500/20 scale-105"
          : "border-slate-500 bg-slate-800"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging ? (
        <p className="text-2xl font-bold text-indigo-400 animate-pulse">
          ¡Suelta la imagen aquí!
        </p>
      ) : (
        <div className="text-center pointer-events-none">
          <p className="text-slate-300 font-medium mb-2 text-lg">
            Arrastra y suelta tu Imagen aquí
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
